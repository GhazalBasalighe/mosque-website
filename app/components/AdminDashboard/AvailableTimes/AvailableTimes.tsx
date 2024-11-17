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
                className="flex-1 w-full"
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
        <div className="flex flex-col gap-4 mt-4">
          <label className="text-right text-sm font-medium">
            توضیحات:
          </label>
          <textarea
            className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-teal-800 dark:placeholder:text-teal-400 dark:focus-visible:ring-teal-400 hover:border-teal-400 hover:bg-teal-50 focus:border-teal-500 focus:bg-teal-100"
            placeholder="توضیحات را وارد کنید"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableTimes;
