import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserResponse } from "../AdminDashboard";
import { axiosInstance } from "@/app/api/api";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";

export function UserList({
  users,
  onDelete,
}: {
  users: UserResponse[];
  onDelete: (userId: number) => void;
}) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleDelete = async (userId: number) => {
    try {
      await axiosInstance.delete(`/user/${userId}`);
      toast.success("کاربر با موفقیت حذف شد");
      onDelete(userId);
    } catch (error) {
      console.error("Failed to delete user", error);
      toast.error("حذف کاربر با خطا مواجه شد");
    }
  };

  return (
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
                  onClick={() => handleDelete(user.id)}
                  className=" text-red-500 hover:text-red-700"
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
  );
}
