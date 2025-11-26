import { SheetApp } from "../components/sheet/SheetApp";
import { DataTableApp } from "../components/table/DataTableApp";
import { AccountData } from "../mock/account.data";
import { accountColumns } from "@/domain/users/account.columns";
export default function Accounts() {
  // console.log(accountColumns);
  return (
    <div className="flex flex-col">
      <SheetApp></SheetApp>
      <DataTableApp columns={accountColumns} data={AccountData}></DataTableApp>
    </div>
  );
}
