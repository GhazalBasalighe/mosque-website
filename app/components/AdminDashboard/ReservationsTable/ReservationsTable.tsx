import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

export interface Reservation {
  id: number;
  user_id: number;
  description: null | string;
  tracking_code: string;
  status: "Pending" | "Declined" | "Paid";
  availableTime_id: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
}

interface ReservationProps {
  reservations: Reservation[];
  onDeleteClick: (reservationId: number) => void;
}

const ReservationsTable = ({
  reservations,
  onDeleteClick,
}: ReservationProps) => {
  return (
    <Card className="w-full rtl relative z-30 bg-white/90">
      <CardHeader>
        <CardTitle className="text-right font-bold text-2xl">
          لیست زمان‌های رزرو شده
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <Table className="border-none rounded-2xl">
            <TableHeader className="bg-teal-100 rounded-t-lg hover:bg-teal-200">
              <TableRow>
                <TableHead className="text-start p-4">ساعت شروع</TableHead>
                <TableHead className="text-start p-4">
                  ساعت پایان
                </TableHead>
                <TableHead className="text-start p-4">کد ردیابی</TableHead>
                <TableHead className="text-start p-4">توضیحات</TableHead>
                <TableHead className="text-start p-4">وضعیت</TableHead>
                <TableHead className="text-start p-4">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow
                  key={reservation.id}
                  className="border-b last:border-none"
                >
                  <TableCell className="p-4 text-start">
                    {new Date(reservation.start_date).toLocaleString(
                      "fa-IR"
                    )}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    {new Date(reservation.end_date).toLocaleString(
                      "fa-IR"
                    )}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    {reservation.tracking_code}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    {reservation.description}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        reservation.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : reservation.status === "Declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {reservation.status === "Pending"
                        ? "در انتظار پرداخت"
                        : reservation.status === "Declined"
                        ? "رد شده"
                        : "پرداخت شده"}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 text-start relative group">
                    <div className="invisible group-hover:visible flex gap-2">
                      <button
                        onClick={() => onDeleteClick(reservation.id)}
                        className="text-red-600 hover:text-red-800"
                        title="حذف"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationsTable;
