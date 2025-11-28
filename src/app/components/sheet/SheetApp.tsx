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
import { useEffect, useState } from "react";
import {
  dialogPropsAccount,
  dialogPropsComment,
} from "@/domain/props/dialog.data";
import { FileUploadApp } from "../input/FileUploadApp";
import { MultiSelectApp } from "../select/MultiSelectApp";
import {
  Behavior,
  ContentComments,
  Emot,
  Interact,
} from "@/domain/model/interact.types";
import { preconnect } from "react-dom";
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
        files: [],
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
  const defaultReactionDetails = new Map<Emot, number>([
    [Emot.haha, 0],
    [Emot.like, 0],
    [Emot.sad, 0],
    [Emot.wow, 0],
  ]);
  const handleBehavior = (val: string | "DEFAULT" | "REACTION" | "NONE") => {
    setInteract((prev) => {
      const reactionDetails: Map<Emot, number> =
        val === "REACTION" ? new Map(defaultReactionDetails) : new Map();
      return {
        ...prev,
        behavior: {
          behaviorType: val,
          reactionDetails: reactionDetails,
        },
      };
    });
  };

  const hanldeComment = (val: boolean) => {
    setInteract((prev) => {
      return {
        ...prev,
        comments: {
          ...prev.comments,
          isComment: val,
        },
      };
    });
  };

  const handleReadFile = async (files: File[]) => {
    if (files.length > 0) {
      const data: ContentComments[] = (await readExcel(
        files[0]
      )) as ContentComments[];
      // setDataRows(data.map((row) => row.firstName));
      return data;
    } else {
      return [];
    }
  };

  const handleUploadFile = (val: File[]) => {
    setInteract((prev) => {
      const firstFile = [val[val.length - 1]];
      return {
        ...prev,
        comments: {
          ...prev.comments,
          files: firstFile,
        },
      };
    });
  };

  const handleContentComment = async () => {
    const firstFile = interact.comments.files;
    const contentComments = await handleReadFile(firstFile);
    if (contentComments.length > 0) {
      setInteract((prev) => {
        setIsOpen(false);
        return {
          ...prev,
          comments: {
            ...prev.comments,
            files: firstFile,
            contentComments:
              firstFile.length > 0
                ? contentComments
                : prev.comments.contentComments,
          },
        };
      });
    } else {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://graph.facebook.com/v24.0/807529795786209/posts?"+new URLSearchParams({
          fields: "id,message,from,created_time,permalink_url,full_picture",
        }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer EAAMZAgRascpkBQM6DbZCO4d27MIMZAaPFdo5tY85wjD6G2DbNf9VMzApmwKQGGwWv9HRUzcdb27wG89JtM85ZBKw7R7FD1DInfobSevZACgjxo3ILdVvP3ZAuoOkKIxeKzdNJxenYCpKh8kpl554W0p8W93VD4faWIM04Q5s6AZBN2OJFHbDpaNZAFaVeodIjsyZBgCK9tE14dm47krryoJ88hGThNqZCd7ZCMsOeD6AfImfrxCoy3kvaSNU9sZD",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      return response;
    };
    const data = fetchData();
    console.log(data);
  }, []);

  const [listAccount, setListAccount] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
      <SheetContent className="sm:max-w-[820px] h-screen">
        {/* <DialogModal  key={2} dialogProps={dialogPropsAccount}>
          <MultiSelectApp
            onChange={setListAccount}
            value={listAccount}
          ></MultiSelectApp>
        </DialogModal> */}
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
            onChange={handleBehavior}
            value={interact.behavior.behaviorType}
          ></RadioGroupApp>
          <SwitchApp
            onCheckedChange={hanldeComment}
            value={interact.comments.isComment}
          ></SwitchApp>
          {interact.comments.isComment && (
            <DialogModal
              isOpen={isOpen}
              handleOpenChange={setIsOpen}
              handleSave={handleContentComment}
              key={1}
              dialogProps={dialogPropsComment}
            >
              <FileUploadApp
                files={interact.comments.files}
                handleSetFile={handleUploadFile}
                accept=".xlsx"
              ></FileUploadApp>
            </DialogModal>
          )}
          {interact.comments.isComment && (
            <ScrollerApp rows={interact.comments.contentComments}></ScrollerApp>
          )}
        </div>
        <SheetFooter className="flex flex-row justify-end">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button
            onClick={() => {
              console.log(listAccount, interact);
            }}
            type="submit"
          >
            Save changes
          </Button>
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
