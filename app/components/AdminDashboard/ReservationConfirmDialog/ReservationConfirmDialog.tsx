import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
          <DialogDescription className="mt-2 text-sm text-gray-600">
            لطفاً توضیحات رزرو را وارد کنید:
          </DialogDescription>
        </DialogHeader>
        <textarea
          className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-teal-500"
          placeholder="توضیحات..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            انصراف
          </Button>
          <Button onClick={onConfirm} className="bg-teal-600 text-white">
            رزرو
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationConfirmDialog;
