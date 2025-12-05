"use client";
import { DataTableApp } from "@/app/components/table/DataTableApp";
import { AccountColumnData } from "../mock/account.mock";
import { AccountColumns } from "@/app/common/columns/account.column";
import { SelectApp } from "@/app/components/select/Select";

export default function AccountDataTable() {
  const columns = AccountColumns({
    onDelete: () => console.log("delete"),
    onEdit: () => console.log("Edit"),
  });

  const configSelect = {
    defaultValue: "",
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
    onChange: (val: string) => console.log(val),
  };

  return (
    <DataTableApp filter="name" columns={columns} data={AccountColumnData}>
      {/* <SelectApp config={configSelect}></SelectApp> */}
    </DataTableApp>
  );
}
