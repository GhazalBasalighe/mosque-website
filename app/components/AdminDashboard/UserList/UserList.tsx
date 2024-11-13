import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserResponse } from "../AdminDashboard";

export function UserList({ users }: { users: UserResponse[] }) {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-b last:border-none">
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
              {user.phone_number}
            </TableCell>
            <TableCell className="p-4 text-start">{user.role}</TableCell>
            <TableCell className="p-4 text-start">
              {user.created_at}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
