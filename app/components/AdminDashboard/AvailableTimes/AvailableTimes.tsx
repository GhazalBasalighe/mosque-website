import { axiosInstance } from "@/app/api/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/teal.css";

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

  // Format number with commas
  const formatNumber = (value: string) => {
    // Remove any non-digit characters
    const numbers = value.replace(/[^\d]/g, "");
    // Add commas for thousands
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
            //@ts-ignore toDate does not exist on type Value
            .toDate()
            .toISOString()
            .replace("T", " ")
            .slice(0, 19)
        : "";
      const endDate = timeRange.endTime
        ? timeRange.endTime //@ts-ignore toDate does not exist on type Value
            .toDate()
            .toISOString()
            .replace("T", " ")
            .slice(0, 19)
        : "";

      const response = await axiosInstance.post("/available-time", {
        start_date: startDate,
        end_date: endDate,
        price: parseInt(price.replace(/,/g, "")),
        description: description,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
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
    <Card className="w-full max-w-2xl rtl">
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
              style={{
                width: "100%",
              }}
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
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <label className="text-right text-sm font-medium">
            توضیحات:
          </label>
          <textarea
            className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-teal-800 dark:placeholder:text-teal-400 dark:focus-visible:ring-teal-400 hover:border-teal-400 hover:bg-teal-50 focus:border-teal-500 focus:bg-teal-100"
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
  );
};

export default AvailableTimes;
