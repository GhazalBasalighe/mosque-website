import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Pencil, CheckCircle } from "lucide-react";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";

export interface AvailableTime {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  price: number;
  description: string;
  reserved: 0 | 1;
}

interface AvailableTimesTableProps {
  availableTimes: AvailableTime[];
  onDeleteClick: (id: number) => void;
  onEditClick: (time: AvailableTime) => void;
  onReservationClick: (time: AvailableTime) => void; // Updated to handle reservation action
}

const AvailableTimesTable = ({
  availableTimes,
  onDeleteClick,
  onEditClick,
  onReservationClick,
}: AvailableTimesTableProps) => {
  return (
    <Card className="w-full rtl z-30 bg-white/90 col-span-2">
      <CardHeader>
        <CardTitle className="text-right font-bold text-2xl">
          لیست زمان‌های موجود
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border-none rounded-2xl">
          <TableHeader className="bg-teal-100 rounded-t-lg hover:bg-teal-200">
            <TableRow>
              <TableHead className="text-start p-4">ساعت شروع</TableHead>
              <TableHead className="text-start p-4">ساعت پایان</TableHead>
              <TableHead className="text-start p-4">قیمت</TableHead>
              <TableHead className="text-start p-4">توضیحات</TableHead>
              <TableHead className="text-start p-4">وضعیت</TableHead>
              <TableHead className="text-start p-4">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableTimes.map((time) => (
              <TableRow
                key={time.id}
                className="border-b last:border-none"
              >
                <TableCell className="p-4 text-start">
                  {new Date(time.start_date).toLocaleString("fa-IR")}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {new Date(time.end_date).toLocaleString("fa-IR")}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {convertToPersianDigits(time.price.toLocaleString())}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {time.description}
                </TableCell>
                <TableCell className="p-4 text-start">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      time.reserved
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {time.reserved ? "رزرو شده" : "خالی"}
                  </span>
                </TableCell>
                <TableCell className="p-4 text-start relative group">
                  <div className="invisible group-hover:visible flex gap-2">
                    <button
                      onClick={() => onEditClick(time)}
                      className="text-blue-600 hover:text-blue-800"
                      title="ویرایش"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => onDeleteClick(time.id)}
                      className="text-red-600 hover:text-red-800"
                      title="حذف"
                    >
                      <Trash size={20} />
                    </button>
                    <button
                      onClick={() => onReservationClick(time)} // Handle reservation click
                      className="text-green-600 hover:text-green-800"
                      title="رزرو بازه زمانی"
                    >
                      <CheckCircle size={20} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AvailableTimesTable;
