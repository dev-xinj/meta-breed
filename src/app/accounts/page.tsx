import { dialogPropsComment } from "@/domain/props/dialog.data";
import { DialogModal } from "../components/modal/DialogModal";
import { SheetApp } from "../components/sheet/SheetApp";
import { DataTableApp } from "../components/table/DataTableApp";
import { AccountData } from "../mock/account.data";
import { accountColumns } from "@/domain/users/account.columns";
import ProfileForm from "../form/AccountForm";
export default function Accounts() {
  // console.log(accountColumns);
  return (
    <div className="flex flex-col">
      
      <DataTableApp filter="namePage" columns={accountColumns} data={AccountData}>
      </DataTableApp>
    </div>
  );
}
