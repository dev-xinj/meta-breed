"use client";
import { FanpageColumns } from "@/app/common/columns/fanpage.columns";
import ProfileForm, {
  ProfileFormValues,
} from "@/app/components/form/AccountForm";
import readExcel from "@/components/lib/excel";
import { ContentComments } from "@/domain/model/interact.types";
import { dialogPropsFromAccount } from "@/domain/props/dialog.data";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DialogModal } from "../../components/modal/DialogModal";
import { DataTableApp } from "../../components/table/DataTableApp";
import TabFromAccount from "../../components/tabs/TabFromAccount";
import { FanpageColumnData } from "../mock/fanpage.data";
import {
  deleteFanpage,
  findAllFanpage,
  saveFanpage,
  updateFanpage,
} from "../services/fanpage.service";
import { FanpageCreate } from "../types/fanpage-create.type";
import { Fanpage } from "../types/fanpage.type";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectApp } from "@/app/components/select/Select";

export default function FanpageDataTable() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  console.log(page);
  const configSelect = {
    defaultValue: "1",
    placeholder: "Select",
    options: [
      {
        label: "select 1",
        value: "1",
      },
      {
        label: "select 2",
        value: "2",
      },
    ],
    onChange: (val: string) =>
      router.push(`/fanpages?user=nguyentt&page=${val}`),
  };
  const [fanpages, setFanpages] = useState<Fanpage[]>([]);
  const [action, setAction] = useState("NEW");
  const router = useRouter();

  const [dataEdit, setDataEdit] = useState<ProfileFormValues>({
    pageUUID: "",
    pageName: "",
    accessToken: "",
    id: undefined,
  });
  const [isFormAddFanpage, setIsFormAddFanpage] = useState(false);

  const handleFindAllFanpage = () => {
    findAllFanpage()
      .then((result) => {
        setFanpages(result?.data);
      })
      .catch((error) => {
        return error;
      });
  };
  const handleDelete = (id: string) => {
    deleteFanpage(+id)
      .then((data) => {
        console.log(data.success + "alert delete: " + id);
        setFanpages((prev) => prev.filter((x) => x.id !== id));
      })
      .catch((error) => {
        return error;
      });
  };
  const handleEdit = (id: string) => {
    console.log("alert edit: " + id);
    const [rawEdit] = fanpages.filter((item: Fanpage) => item.id === id);
    console.log(rawEdit);
    setDataEdit({
      pageUUID: rawEdit.pageUUID || "",
      id: +rawEdit.id,
      pageName: rawEdit.pageName || "",
      accessToken: "",
    });
    setIsFormAddFanpage(true);
    setAction("EDIT");
  };
  const columns = FanpageColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });
  useEffect(() => {
    handleFindAllFanpage();
  }, []);

  const [activeTab, setActiveTab] = useState("input");
  const [dataImport, setDataImport] = useState<ContentComments[]>([]);
  const [fanpageImport, setFanpageImport] = useState<FanpageCreate[]>([]);

  const handleActiveTab = (val: string) => {
    console.log(val);
    setActiveTab(val);
  };
  const handleSubmitForm = async (data: FanpageCreate) => {
    if (action === "NEW") {
      const response = await saveFanpage(data);
      if (response?.success) {
        setIsFormAddFanpage(false);
        handleFindAllFanpage();
      }
    } else if (action === "EDIT") {
      if (dataEdit.id === undefined) {
        throw Error;
      }
      const response = await updateFanpage(dataEdit.id, data);
      console.log(response);
      setIsFormAddFanpage(false);
      handleFindAllFanpage();
      return response.data;
    } else {
      throw Error;
    }
  };
  const formRef = useRef<UseFormReturn<ProfileFormValues> | null>(null);
  const handleSubmitOutside = async () => {
    if (activeTab !== "input") {
      if (fanpageImport.length) {
        const createPage = fanpageImport.map((page) => ({
          pageName: page.pageName,
          pageUUID: page.pageUUID,
          accessToken: page.accessToken,
        }));

        createPage.map(async (page) => {
          return await saveFanpage(page);
        });
        setIsFormAddFanpage(false);
      }
    }
    if (!formRef.current) return;
    formRef.current.handleSubmit((data) => {
      handleSubmitForm(data);
    })();
  };
  const handleImportExcel = async (file: File) => {
    console.log(file);
    const accounts = await handleReadFile(file);
    setFanpageImport(accounts); //import fanpage
    if (accounts.length > 0) {
      setDataImport(
        accounts.map((item, index) => ({
          id: index + "",
          title: item.pageName,
        }))
      );
    }
  };

  return (
    <DataTableApp
      filter="pageName"
      columns={columns}
      // data={fanpages}
      data={FanpageColumnData}
    >
      <SelectApp config={configSelect}></SelectApp>
      <DialogModal
        dialogProps={dialogPropsFromAccount}
        handleSave={handleSubmitOutside}
        isOpen={isFormAddFanpage}
        handleOpenChange={setIsFormAddFanpage}
      >
        {action === "NEW" ? (
          <TabFromAccount
            activeTab={activeTab}
            handleActiveTab={handleActiveTab}
            onHandleImportExcel={handleImportExcel}
            onHandleSubmitForm={handleSubmitForm}
            dataImport={dataImport}
            formRef={formRef}
            tabValue={1}
          ></TabFromAccount>
        ) : (
          <ProfileForm
            isBtn={false}
            onHandleSubmit={handleSubmitForm}
            formRef={formRef}
            initialData={dataEdit}
          ></ProfileForm>
        )}
      </DialogModal>
    </DataTableApp>
  );
}
const handleReadFile = async (file: File) => {
  const data: ProfileFormValues[] = (await readExcel(
    file
  )) as ProfileFormValues[];
  return data;
};
