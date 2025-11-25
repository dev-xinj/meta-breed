import React from "react";
import { DataTableDemo } from "../components/table";
import { DialogModal } from "../components/modal/DialogModal";
import { SheetDemo } from "../components/sheet/Sheet";

export default function Accounts() {
  return (
    <div className="flex flex-col">
      <SheetDemo></SheetDemo>
      <DataTableDemo></DataTableDemo>;
    </div>
  );
}
