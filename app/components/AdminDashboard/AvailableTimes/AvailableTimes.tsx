import { axiosInstance } from "@/app/api/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/teal.css";
import toast from "react-hot-toast";
import DeleteConfirmDialog from "../../DeleteConfirmDialog/DeleteConfirmDialog";
import AvailableTimesTable, {
  AvailableTime,
} from "../AvailableTimesTable/AvailableTimesTable";
import ReservationConfirmDialog from "../ReservationConfirmDialog/ReservationConfirmDialog";

interface TimeRange {
  startTime: Value;
  endTime: Value;
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
  const [isReservationDialogOpen, setIsReservationDialogOpen] =
    useState(false); // State for reservation dialog
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(
    null
  );
  const [reservationDescription, setReservationDescription] =
    useState<string>(""); // State for reservation description
  const [editMode, setEditMode] = useState(false);
  const [editingTimeId, setEditingTimeId] = useState<number | null>(null);

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

  const formatNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPrice = formatNumber(e.target.value);
    setPrice(formattedPrice);
  };

  const handleTimeChange = (
    value: Value,
    type: "startTime" | "endTime"
  ) => {
    setTimeRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const resetForm = () => {
    setTimeRange({ startTime: "", endTime: "" });
    setDescription("");
    setPrice("");
    setEditMode(false);
    setEditingTimeId(null);
  };

  const handleSubmit = async () => {
    try {
      const startDate = timeRange.startTime //@ts-expect-error
        ? new Date(timeRange.startTime)
            .toISOString()
            .replace("T", " ")
            .slice(0, 19)
        : "";
      const endDate = timeRange.endTime //@ts-expect-error
        ? new Date(timeRange.endTime)
            .toISOString()
            .replace("T", " ")
            .slice(0, 19)
        : "";

      const submitData = {
        start_date: startDate,
        end_date: endDate,
        price: parseInt(price.replace(/,/g, "")),
        description: description,
      };
      const editData = {
        price: parseInt(price.replace(/,/g, "")),
        description: description,
      };

      if (editMode && editingTimeId) {
        await axiosInstance.put(
          `/available-time/${editingTimeId}`,
          editData
        );
        toast.success("با موفقیت ویرایش شد");
      } else {
        await axiosInstance.post("/available-time", submitData);
        toast.success("با موفقیت ثبت شد");
      }

      fetchAvailableTimes();
      resetForm();
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response?.status === 403) {
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

  const handleEdit = async (time: AvailableTime) => {
    setEditMode(true);
    setEditingTimeId(time.id);
    setTimeRange({
      startTime: time.start_date,
      endTime: time.end_date,
    });
    setPrice(time.price.toString());
    setDescription(time.description);
  };

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
    render: (
      <Input
        readOnly={editMode}
        className={`${editMode ? "cursor-not-allowed" : ""}`}
      />
    ),
  };

  const handleDeleteClick = (id: number) => {
    setSelectedTimeId(id);
    setIsDialogOpen(true);
  };

  const handleReservationClick = (time: AvailableTime) => {
    setSelectedTimeId(time.id);
    setIsReservationDialogOpen(true);
  };

  const handleReservation = async () => {
    try {
      const submitData = {
        description: reservationDescription,
      };
      await axiosInstance.post(
        `/reservation/make/${selectedTimeId}`,
        submitData
      );
      toast.success("رزرو با موفقیت انجام شد");
      setReservationDescription(""); // Clear the description after reservation
      setIsReservationDialogOpen(false); // Close the dialog
      fetchAvailableTimes(); // Refresh available times
    } catch (error) {
      console.error("Error making reservation:", error);
      toast.error("خطا در انجام رزرو");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {localStorage.getItem("role") === "Admin" && (
        <Card className="w-full rtl">
          <CardHeader>
            <CardTitle className="text-right font-bold text-2xl">
              {editMode
                ? "ویرایش بازه زمانی"
                : "انتخاب بازه‌های زمانی رزرو"}
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
                  //@ts-expect-error
                  value={new Date(timeRange.startTime)}
                  onChange={(value) =>
                    handleTimeChange(value, "startTime")
                  }
                  placeholder="ساعت شروع را انتخاب کنید"
                  style={{ width: "100%" }}
                  disabled={editMode}
                  readOnly={editMode}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-right text-sm font-medium">
                  ساعت پایان:
                </label>
                <DatePicker
                  {...datePickerProps}
                  //@ts-expect-error
                  value={new Date(timeRange.endTime)}
                  onChange={(value) => handleTimeChange(value, "endTime")}
                  placeholder="ساعت پایان را انتخاب کنید"
                  style={{ width: "100%" }}
                  disabled={editMode}
                  readOnly={editMode}
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
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-md bg-teal-600 py-2 text-white hover:bg-teal-700"
              >
                {editMode ? "ثبت تغییرات" : "ثبت بازه جدید"}
              </button>
              {editMode && (
                <button
                  onClick={resetForm}
                  className="flex-1 rounded-md bg-gray-500 py-2 text-white hover:bg-gray-600"
                >
                  انصراف
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <AvailableTimesTable
        availableTimes={availableTimes}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEdit}
        onReservationClick={handleReservationClick}
      />
      {localStorage.getItem("role") === "Admin" && (
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
      )}
      <ReservationConfirmDialog
        isOpen={isReservationDialogOpen}
        onClose={() => setIsReservationDialogOpen(false)}
        onConfirm={handleReservation}
        description={reservationDescription}
        setDescription={setReservationDescription}
      />{" "}
    </div>
  );
};

export default AvailableTimes;
