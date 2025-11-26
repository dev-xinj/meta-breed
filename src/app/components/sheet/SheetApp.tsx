"use client";
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

export function SheetApp() {
  const [selected, setSelected] = useState("DEFAULT");
  const [checkedChange, setCheckedChange] = useState(false);
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
        <DialogModal></DialogModal>
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
              defaultValue={0}
              max={600}
              type="number"
            />
          </div>
          <RadioGroupApp
            onChange={setSelected}
            value={selected}
          ></RadioGroupApp>
          <SwitchApp
            onCheckedChange={setCheckedChange}
            value={checkedChange}
          ></SwitchApp>
          {checkedChange && <DialogModal></DialogModal>}
          <ScrollerApp></ScrollerApp>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
