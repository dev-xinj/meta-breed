"use client";
// import * as XLSX from "xlsx";
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
import {
  ContentComments,
  Emot,
  Interact
} from "@/domain/model/interact.types";
import {
  dialogPropsComment
} from "@/domain/props/dialog.data";
import { useState } from "react";
import { FileUploadApp } from "../input/FileUploadApp";
import { DialogModal } from "../modal/DialogModal";
import { RadioGroupApp } from "../radio/RadioGroupApp";
import { ScrollerApp } from "../scroller/ScrollerApp";
import { SwitchApp } from "../switch/SwitchApp";
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
      // const data: ContentComments[] = (await readExcel(
      //   files[0]
      // )) as ContentComments[];
       const data: ContentComments[] = [{
          id: "1",
          content: "1233"
       }]
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await facebookService.getPagePosts("807529795786209");
  //       console.log(result);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData(); // chạy
  // }, []);

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
// async function readExcel(file: File) {
//   const arrayBuffer = await file.arrayBuffer();
//   const workbook = XLSX.read(arrayBuffer, { type: "array" });

//   // Lấy sheet đầu tiên
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];
//   // Chuyển sheet thành JSON
//   const json = XLSX.utils.sheet_to_json(sheet);
//   return json;
// }
