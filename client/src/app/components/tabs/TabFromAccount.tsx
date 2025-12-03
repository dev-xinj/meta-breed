import ProfileForm, { ProfileFormValues } from "@/app/form/AccountForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { FileUploadApp } from "../input/FileUploadApp";
import { DynamicRow, ScrollerApp } from "../scroller/ScrollerApp";

const TabFromAccount = ({
  onHandleSubmitForm,
  onHandleImportExcel,
  handleActiveTab,
  activeTab,
  tabValue,
  dataImport,
  formRef,
}: {
  onHandleSubmitForm: (val: ProfileFormValues) => void;
  onHandleImportExcel: (val: File) => void;
  handleActiveTab: (val: string) => void;
  activeTab: string;
  tabValue?: number;
  dataImport?: DynamicRow[];
  formRef?: React.RefObject<ReturnType<
    typeof useForm<ProfileFormValues>
  > | null>;
}) => {
  return (
    <div className="w-full">
      <Tabs
        defaultValue="explore"
        className="gap-4"
        value={activeTab}
        onValueChange={handleActiveTab}
      >
        <TabsList
          tabIndex={tabValue}
          className="bg-background rounded-none border-b p-0"
        >
          <TabsTrigger
            key={"input"}
            value={"input"}
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
          >
            {"Input"}
          </TabsTrigger>
          <TabsTrigger
            key={"importExcel"}
            value={"importExcel"}
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
          >
            {"Import Excel"}
          </TabsTrigger>
        </TabsList>

        <TabsContent key={"input"} value={"input"}>
          <div className="text-muted-foreground text-sm">
            <ProfileForm
              isBtn={false}
              onHandleSubmit={onHandleSubmitForm}
              formRef={formRef}
            ></ProfileForm>
          </div>
        </TabsContent>
        <TabsContent key={"importExcel"} value={"importExcel"}>
          <div className="flex flex-row ">
            <FileUploadApp
              // files={uploadedFiles}
              accept=".xlsx"
              onFileAccept={onHandleImportExcel}
            ></FileUploadApp>
            <ScrollerApp
              rows={!dataImport?.length ? [] : dataImport}
            ></ScrollerApp>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabFromAccount;
