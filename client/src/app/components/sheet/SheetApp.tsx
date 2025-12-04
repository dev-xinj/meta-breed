"use client";
// import * as XLSX from "xlsx";
import { FanpageColumnData } from "@/app/fanpages/mock/fanpage.data";
import readExcel from "@/components/lib/excel";
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
import { ContentComments, Emot, Interact } from "@/domain/model/interact.types";
import { dialogPropsComment } from "@/domain/props/dialog.data";
import { Account } from "@/domain/users/account.types";
import { useMultiSelectStore } from "@/hooks/useMultiSelect";
import { useUploadFileStore } from "@/hooks/useUploadFile";
import { useState } from "react";
import { toast } from "sonner";
import { FileUploadApp } from "../input/FileUploadApp";
import { DialogModal } from "../modal/DialogModal";
import { RadioGroupApp } from "../radio/RadioGroupApp";
import { ScrollerApp } from "../scroller/ScrollerApp";
import { MultiselectState } from "../select/MultiSelectState";
import { SwitchApp } from "../switch/SwitchApp";
export function SheetApp({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFanpage, setIsOpenFanpage] = useState(false);
  const selectedFanpage = useMultiSelectStore((state) => state.selected);
  const files = useUploadFileStore((state) => state.files);
  const initInteract = () => {
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
            title: "this is comment",
          },
        ],
      },
    };
  };
  const [interact, setInteract] = useState<Interact>(() => initInteract());
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

  // selected = useMultiSelectStore((state) => state.selected);
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
    handleUploadFile(files);
    const firstFile = [files[files.length - 1]];
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
  const handleAddFanpage = () => {
    setInteract((prev) => {
      const newFanpages: Account[] = selectedFanpage.map((acc) =>
        JSON.parse(acc)
      );
      return {
        ...prev,
        accounts: [...newFanpages],
      };
    });
    setIsOpenFanpage(false);
  };
  const options = FanpageColumnData.map((row) => {
    return {
      label: row.pageName || row.pageUUID,
      value: JSON.stringify(row),
    };
  });
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
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <DialogModal
              handleOpenChange={setIsOpenFanpage}
              handleSave={handleAddFanpage}
              isOpen={isOpenFanpage}
              key={2}
              dialogProps={dialogPropsComment}
            >
              <MultiselectState
                selected={selectedFanpage}
                options={options}
              ></MultiselectState>
            </DialogModal>
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
                onFileAccept={() => console.log("oke")}
                accept={".xlsx"}
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
              console.log(interact);
            }}
            // type="submit"
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
      {children}
    </Sheet>
  );
}
