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
import { DialogProps } from "@/domain/props/dialog.types";

export function DialogModal({
  dialogProps,
  children,
  isOpen,
  handleOpenChange,
  handleSave,
  ...props
}: {
  dialogProps: DialogProps;
  isOpen?: boolean;
  handleOpenChange?: (val: boolean) => void;
  handleSave: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button
            className={` w-32 cursor-pointer shadow-lg bg-violet-500 text-violet-50 hover:bg-violet-200 hover:text-violet-500 `}
            variant="outline"
          >
            {dialogProps.labelBtn}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[1200px]">
          <DialogHeader>
            {/* <DialogTitle>Chọn tài khoản để tương tác</DialogTitle> */}
            <DialogTitle>{dialogProps.labelModal}</DialogTitle>
            {/* <DialogDescription> Phải chắc chắn rằng đã thêm tài khoản từ hệ thống </DialogDescription> */}
            <DialogDescription>{dialogProps.description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{dialogProps.labelBtnSecond}</Button>
            </DialogClose>
            <Button onClick={handleSave} type="submit">
              {dialogProps.labelBtnPrimary}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
