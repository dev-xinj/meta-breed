"use client";
import { FanpageColumns } from "@/app/fanpages/common/fanpage.columns";
import { ProfileFormValues } from "@/app/form/AccountForm";
import readExcel from "@/components/lib/excel";
import { ContentComments } from "@/domain/model/interact.types";
import { dialogPropsFromAccount } from "@/domain/props/dialog.data";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DialogModal } from "../../components/modal/DialogModal";
import { DataTableApp } from "../../components/table/DataTableApp";
import TabFromAccount from "../../components/tabs/TabFromAccount";
import { findAllFanpage, saveFanpage } from "../services/fanpage.service";
import { FanpageCreate } from "../types/fanpage-create.type";
import { Fanpage } from "../types/fanpage.type";

export default function FanpageDataTable() {
  const [fanpages, setFanpages] = useState<Fanpage[]>([]);
  const [isFormAddFanpage, setIsFormAddFanpage] = useState(false);
  const handleFindAllFanpage = () => {
    findAllFanpage()
      .then((result) => {
        setFanpages(result?.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
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
  const handleSubmitForm = (data: FanpageCreate) => {
    const response = saveFanpage(data);
    if (response?.success) {
      setIsFormAddFanpage(false);
      handleFindAllFanpage();
    }
    // setFormData([data]);
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
    <DataTableApp filter="pageName" columns={FanpageColumns} data={fanpages}>
      <DialogModal
        dialogProps={dialogPropsFromAccount}
        handleSave={handleSubmitOutside}
        isOpen={isFormAddFanpage}
        handleOpenChange={setIsFormAddFanpage}
      >
        <TabFromAccount
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
          onHandleImportExcel={handleImportExcel}
          onHandleSubmitForm={handleSubmitForm}
          dataImport={dataImport}
          formRef={formRef}
          tabValue={1}
        ></TabFromAccount>
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
