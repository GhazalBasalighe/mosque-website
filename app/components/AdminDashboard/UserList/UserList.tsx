import { axiosInstance } from "@/app/api/api";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteConfirmDialog from "../../DeleteConfirmDialog/DeleteConfirmDialog";
import { UserResponse } from "../AdminDashboard";

export function UserList({
  users,
  onDelete,
}: {
  users: UserResponse[];
  onDelete: (userId: number) => void;
}) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleDeleteConfirm = async () => {
    if (userToDelete !== null) {
      try {
        await axiosInstance.delete(`/user/${userToDelete}`);
        toast.success("کاربر با موفقیت حذف شد");
        onDelete(userToDelete);
        setUserToDelete(null);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete user", error);
        toast.error("حذف کاربر با خطا مواجه شد");
      }
    }
  };

  const openDeleteDialog = (userId: number) => {
    setUserToDelete(userId);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setUserToDelete(null);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Table className="border-none rounded-2xl">
        <TableHeader className="bg-teal-100 rounded-t-lg hover:bg-teal-200">
          <TableRow>
            <TableHead className="text-start p-4">نام کاربری</TableHead>
            <TableHead className="text-start p-4">نام</TableHead>
            <TableHead className="text-start p-4">نام خانوادگی</TableHead>
            <TableHead className="text-start p-4">شماره تماس</TableHead>
            <TableHead className="text-start p-4">نقش</TableHead>
            <TableHead className="text-start p-4">تاریخ ایجاد</TableHead>
            <TableHead className="text-start p-4">اقدامات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-b last:border-none relative"
              onMouseEnter={() => setHoveredRow(user.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell className="p-4 text-start">
                {user.username}
              </TableCell>
              <TableCell className="p-4 text-start">
                {user.first_name}
              </TableCell>
              <TableCell className="p-4 text-start">
                {user.last_name}
              </TableCell>
              <TableCell className="p-4 text-start">
                {convertToPersianDigits(user.phone_number)}
              </TableCell>
              <TableCell className="p-4 text-start">{user.role}</TableCell>
              <TableCell className="p-4 text-start">
                {convertToPersianDigits(
                  new Date(user.created_at).toLocaleDateString("fa-IR")
                )}
              </TableCell>
              <TableCell className="p-4 text-start relative">
                {hoveredRow === user.id && (
                  <button
                    onClick={() => openDeleteDialog(user.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete User"
                  >
                    <Trash />
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
