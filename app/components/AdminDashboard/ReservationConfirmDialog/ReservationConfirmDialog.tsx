import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Adjust the import based on your structure
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import React from "react";

interface ReservationConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
  setDescription: (value: string) => void;
}

const ReservationConfirmDialog: React.FC<
  ReservationConfirmDialogProps
> = ({ isOpen, onClose, onConfirm, description, setDescription }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            تأیید رزرو
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-2 text-sm text-gray-600">
          لطفاً توضیحات رزرو را وارد کنید: (اختیاری)
        </DialogDescription>
        <textarea
          className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600"
          placeholder="توضیحات..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DialogFooter className="gap-2 mt-4 flex justify-end">
          <Button variant="destructive" onClick={onClose}>
            انصراف
          </Button>
          <Button variant="default" onClick={onConfirm}>
            رزرو
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationConfirmDialog;
