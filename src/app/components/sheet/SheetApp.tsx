"use client";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogModal } from "../modal/DialogModal";
import { RadioGroupApp } from "../radio/RadioGroupApp";
import { ScrollerApp } from "../scroller/ScrollerApp";
import { SwitchApp } from "../switch/SwitchApp";
import { useState } from "react";
import {
  dialogPropsAccount,
  dialogPropsComment,
} from "@/domain/props/dialog.data";
import { FileUploadApp } from "../input/FileUploadApp";
import { MultiSelectApp } from "../select/MultiSelectApp";
import { Emot, Interact } from "@/domain/model/interact.types";
import { preconnect } from "react-dom";
type DataExcel = {
  lastName: string;
  firstName: string;
  classes: string;
};
export function SheetApp() {
  const [interact, setInteract] = useState<Interact>(() => {
    const reactionDetails = new Map<Emot, number>([[Emot.like, 0]]);
    return {
      accounts: [],
      delayActive: 0,
      behavior: {
        behaviorType: "DEFAULT",
        reactionDetails: reactionDetails,
      },
      comments: {
        isComment: false,
        contentComments: [
          {
            id: "85732923565",
            content: "this is comment",
          },
        ],
      },
    };
  });

  const handleDelayActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInteract((prev) => {
      return { ...prev, delayActive: Number(e.target.value) };
    });
  };

  const [delayNumber, setDelayNumber] = useState<string>("");
  const [listAccount, setListAccount] = useState<string[]>([]);
  const [typeInteract, setTypeInteract] = useState("DEFAULT");
  const [checkedChange, setCheckedChange] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dataRows, setDataRows] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelayNumber(e.target.value);
  };
  const handleReadFile = async (files: File[]) => {
    setFiles(files);

    if (files.length > 0) {
      const data: DataExcel[] = (await readExcel(files[0])) as DataExcel[];
      setDataRows(data.map((row) => row.firstName));
      console.log("Parsed Excel:", dataRows);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-32 cursor-pointer shadow-lg bg-violet-500 text-violet-50 hover:bg-violet-200 hover:text-violet-500"
          variant="outline"
        >
          Interact
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[820px]">
        <DialogModal key={2} dialogProps={dialogPropsAccount}>
          <MultiSelectApp
            onChange={setListAccount}
            value={listAccount}
          ></MultiSelectApp>
        </DialogModal>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">
              Random delay activation (max second){" "}
            </Label>
            <Input
              id="sheet-demo-name"
              max={600}
              value={interact.delayActive}
              onChange={handleDelayActive}
              type="string"
            />
          </div>
          <RadioGroupApp
            onChange={setTypeInteract}
            value={typeInteract}
          ></RadioGroupApp>
          <SwitchApp
            onCheckedChange={setCheckedChange}
            value={checkedChange}
          ></SwitchApp>
          {checkedChange && (
            <DialogModal key={1} dialogProps={dialogPropsComment}>
              <FileUploadApp
                files={files}
                handleSetFile={handleReadFile}
                accept=".xlsx"
              ></FileUploadApp>
            </DialogModal>
          )}
          {checkedChange && <ScrollerApp rows={dataRows}></ScrollerApp>}
        </div>
        <SheetFooter>
          <Button
            onClick={() => {
              console.log(
                typeInteract,
                files,
                listAccount,
                delayNumber,
                interact
              );
            }}
            type="submit"
          >
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
async function readExcel(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  // Lấy sheet đầu tiên
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  // Chuyển sheet thành JSON
  const json = XLSX.utils.sheet_to_json(sheet);
  return json;
}
