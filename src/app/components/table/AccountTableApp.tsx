"use client";
import { ProfileFormValues } from "@/app/form/AccountForm";
import { AccountData } from "@/app/mock/account.data";
import readExcel from "@/components/lib/excel";
import { ContentComments } from "@/domain/model/interact.types";
import { dialogPropsFromAccount } from "@/domain/props/dialog.data";
import { accountColumns } from "@/domain/users/account.columns";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DialogModal } from "../modal/DialogModal";
import TabFromAccount from "../tabs/TabFromAccount";
import { DataTableApp } from "./DataTableApp";

export default function AccountTableApp() {
  const [formData, setFormData] = useState<ProfileFormValues[]>(() => [
    {
      id: undefined,
      username: "",
      accessToken: "",
    },
  ]);
  const [activeTab, setActiveTab] = useState("input");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dataImport, setDataImport] = useState<ContentComments[]>([]);
  const [accountSheet, setAccountSheet] = useState<ProfileFormValues[]>([]);

  const handleActiveTab = (val: string) => {
    console.log(val);
    setActiveTab(val);
  };
  const handleSubmitForm = (data: ProfileFormValues) => {
    console.log(formData);
    setFormData([data]);
  };
  const formRef = useRef<UseFormReturn<ProfileFormValues> | null>(null);
  const handleSubmitOutside = () => {
    if (activeTab !== "input") {
      setFormData(accountSheet);
      console.log(formData)
      return;
    }
    if (!formRef.current) return;
    formRef.current.handleSubmit((data) => {
      handleSubmitForm(data);
    })();
  };
  const handleImportExcel = async (files: File[]) => {
    const file = [files[files.length - 1]];
    setUploadedFiles(files);
    const accounts = await handleReadFile(file);
    if (accounts.length > 0) {
      setAccountSheet(accounts);
      console.log(dataImport);
      setDataImport(
        accounts.map((item, index) => ({
          id: index + "",
          title: item.username,
        }))
      );
    }
  };
  return (
    <DataTableApp filter="namePage" columns={accountColumns} data={AccountData}>
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
          uploadedFiles={uploadedFiles}
          dataImport={dataImport}
          formRef={formRef}
          tabValue={1}
        ></TabFromAccount>
      </DialogModal>
    </DataTableApp>
  );
}
const handleReadFile = async (files: File[]) => {
  if (files.length > 0) {
    const data: ProfileFormValues[] = (await readExcel(
      files[0]
    )) as ProfileFormValues[];
    return data;
  } else {
    return [];
  }
};
