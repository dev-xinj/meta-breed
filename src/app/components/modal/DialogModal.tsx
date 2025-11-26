"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MultiSelectApp } from "../select/MultiSelectApp";

export type ModelProp = {
  labelBtn: string;
  labelModal: string;
  labelBtnPrimary: string;
  labelBtnSecond: string;
  description: string;
};
export function DialogModal() {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleSave = (e: React.FormEvent) => {
    // e.preventDefault();
    console.log("Selected accounts:", selected);
    setOpen(false);
    // TODO: gửi lên API hoặc xử lý logic khác
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            className="w-32 cursor-pointer shadow-lg bg-violet-500 text-violet-50 hover:bg-violet-200 hover:text-violet-500 ml-4 mt-5"
            variant="outline"
          >
            Add Accounts
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>Chọn tài khoản để tương tác</DialogTitle>
            <DialogDescription>
              Phải chắc chắn rằng đã thêm tài khoản từ hệ thống
            </DialogDescription>
          </DialogHeader>

          <div className="">
            <MultiSelectApp
              value={selected}
              onChange={setSelected}
            ></MultiSelectApp>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
