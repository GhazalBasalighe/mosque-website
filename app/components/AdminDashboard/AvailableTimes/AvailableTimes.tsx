import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
  };

  return (
    <Card className="w-full max-w-md mx-auto rtl">
      <CardHeader>
        <CardTitle className="text-right">
          انتخاب بازه‌های زمانی رزرو
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
              ساعت شروع:
            </label>
            <DatePicker
              {...datePickerProps}
              value={timeRange.startTime}
              onChange={(value) => handleTimeChange(value, "startTime")}
              placeholder="ساعت شروع را انتخاب کنید"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
              ساعت پایان:
            </label>
            <DatePicker
              {...datePickerProps}
              value={timeRange.endTime}
              onChange={(value) => handleTimeChange(value, "endTime")}
              placeholder="ساعت پایان را انتخاب کنید"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableTimes;
