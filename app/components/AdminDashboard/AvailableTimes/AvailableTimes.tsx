import { axiosInstance } from "@/app/api/api";
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
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/teal.css";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";
import toast from "react-hot-toast";
import DeleteConfirmDialog from "../../DeleteConfirmDialog/DeleteConfirmDialog";
import { Trash } from "lucide-react";

interface TimeRange {
  startTime: Value;
  endTime: Value;
}

interface AvailableTime {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  price: number;
  description: string;
}

const AvailableTimes = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: "",
    endTime: "",
  });
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>(
    []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(
    null
  );

  // Fetch available times data
  const fetchAvailableTimes = async () => {
    try {
      const response = await axiosInstance.get("/available-time");
      setAvailableTimes(response.data.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  useEffect(() => {
    fetchAvailableTimes();
  }, []);

  // Format number with commas
  const formatNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle price input change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPrice = formatNumber(e.target.value);
    setPrice(formattedPrice);
  };

  // Helper function to handle time changes
  const handleTimeChange = (
    value: Value,
    type: "startTime" | "endTime"
  ) => {
    setTimeRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const startDate = timeRange.startTime
        ? timeRange.startTime
            //@ts-ignore
            .toDate()
            .toISOString()
            .replace("T", " ")
            .slice(0, 19)
        : "";
      const endDate = timeRange.endTime
        ? timeRange.endTime //@ts-ignore
            .toDate()
            .toISOString()
            .replace("T", " ")
            .slice(0, 19)
        : "";

      await axiosInstance.post("/available-time", {
        start_date: startDate,
        end_date: endDate,
        price: parseInt(price.replace(/,/g, "")),
        description: description,
      });
      fetchAvailableTimes();
      toast.success("با موفقیت ثبت شد");
    } catch (error) {
      console.error("Error:", error);
      //@ts-ignore
      if (error.response.status === 403) {
        toast.error("تداخل بازه زمانی با بازه های زمانی موجود");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/available-time/${id}`);
      fetchAvailableTimes();
      toast.success("بازه زمانی با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting time:", error);
      toast.error("خطا در حذف بازه زمانی");
    }
  };

  // Common DatePicker props
  const datePickerProps = {
    calendar: persian,
    locale: persian_fa,
    format: "YYYY/MM/DD HH:mm",
    className: "teal",
    plugins: [
      <TimePicker
        key="timepicker"
        position="right"
        style={{ minWidth: "100px" }}
      />,
    ],
    render: <Input />,
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="w-full rtl">
        <CardHeader>
          <CardTitle className="text-right font-bold text-2xl">
            انتخاب بازه‌های زمانی رزرو
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="text-right text-sm font-medium">
                قیمت (به ریال):
              </label>
              <div className="w-full">
                <Input
                  placeholder="قیمت را وارد کنید"
                  className="flex-1 w-full text-right"
                  value={price}
                  onChange={handlePriceChange}
                  inputMode="numeric"
                />
                <span className="text-right text-xs text-gray-500">
                  لطفاً قیمت را به ریال وارد کنید
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-right text-sm font-medium">
                ساعت شروع:
              </label>
              <DatePicker
                {...datePickerProps}
                value={timeRange.startTime}
                onChange={(value) => handleTimeChange(value, "startTime")}
                placeholder="ساعت شروع را انتخاب کنید"
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-right text-sm font-medium">
                ساعت پایان:
              </label>
              <DatePicker
                {...datePickerProps}
                value={timeRange.endTime}
                onChange={(value) => handleTimeChange(value, "endTime")}
                placeholder="ساعت پایان را انتخاب کنید"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <label className="text-right text-sm font-medium">
              توضیحات:
            </label>
            <textarea
              className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600"
              placeholder="توضیحات را وارد کنید"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full rounded-md bg-teal-600 py-2 text-white hover:bg-teal-700"
          >
            ثبت بازه جدید
          </button>
        </CardContent>
      </Card>

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
                <TableHead className="text-start p-4">
                  ساعت پایان
                </TableHead>
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
                    {/* Delete icon */}
                    <button
                      onClick={() => {
                        setSelectedTimeId(time.id);
                        setIsDialogOpen(true);
                      }}
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

      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          if (selectedTimeId) {
            handleDelete(selectedTimeId);
            setSelectedTimeId(null);
            setIsDialogOpen(false);
          }
        }}
      />
    </div>
  );
};

export default AvailableTimes;
