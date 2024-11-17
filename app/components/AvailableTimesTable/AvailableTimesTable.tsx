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
import { Trash } from "lucide-react";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";

export interface AvailableTime {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  price: number;
  description: string;
}

interface AvailableTimesTableProps {
  availableTimes: AvailableTime[];
  onDeleteClick: (id: number) => void;
}

const AvailableTimesTable = ({
  availableTimes,
  onDeleteClick,
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
                <TableCell className="p-4 text-start relative group">
                  <button
                    onClick={() => onDeleteClick(time.id)}
                    className="invisible group-hover:visible text-red-600 hover:text-red-800"
                  >
                    <Trash />
                  </button>
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
