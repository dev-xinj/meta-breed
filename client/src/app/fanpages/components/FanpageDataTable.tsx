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
import { findAllFanpage, saveFanpage } from "../services/fanpage.api";
import { FanpageCreate } from "../types/fanpage-create.type";
import { Fanpage } from "../types/fanpage.type";

export default function FanpageDataTable() {
  const [fanpages, setFanpages] = useState<Fanpage[]>([]);
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
    console.log(data);
    const response = saveFanpage(data);
    if (response?.success) {
      handleFindAllFanpage();
    }
    // setFormData([data]);
  };
  const formRef = useRef<UseFormReturn<ProfileFormValues> | null>(null);
  const handleSubmitOutside = () => {
    if (activeTab !== "input") {
      console.log(fanpageImport);

      if (fanpageImport.length) {
        const createPage = fanpageImport.map((page) => ({
          pageName: page.pageName,
          pageUUID: page.pageUUID,
          accessToken: page.accessToken,
        }));
        createPage.forEach((page) => {
          saveFanpage(page);
        });
      }
      return;
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
  console.log("render lại");
  return (
    <DataTableApp filter="pageName" columns={FanpageColumns} data={fanpages}>
      <DialogModal
        dialogProps={dialogPropsFromAccount}
        handleSave={handleSubmitOutside}
        handleOpenChange={() => console.log("123")}
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
