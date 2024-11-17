import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">تأیید حذف</h2>
        </DialogHeader>
        <DialogDescription>
          <p>آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟</p>
        </DialogDescription>
        <DialogFooter className="gap-2">
          <Button variant="destructive" onClick={onConfirm}>
            حذف
          </Button>
          <Button variant="default" onClick={onClose}>
            انصراف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
