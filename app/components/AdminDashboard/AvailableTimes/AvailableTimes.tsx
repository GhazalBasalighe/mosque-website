import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, addMinutes } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlot {
  date: string;
}

const AvailableTimes: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [availableTimeslots, setAvailableTimeslots] = useState<Date[]>([]);

  useEffect(() => {
    const fetchAvailableTimeslots = async () => {
      try {
        const response = await fetch(
          "https://time.openstatus.dev/api/v1/timeslots"
        );
        const data: TimeSlot[] = await response.json();
        setAvailableTimeslots(
          data.map((timeslot) => new Date(timeslot.date))
        );
      } catch (error) {
        console.error("خطا در بازیابی زمان‌های موجود:", error);
      }
    };

    fetchAvailableTimeslots();
  }, []);

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const combineDateAndTime = (
    date: Date | undefined,
    time: string
  ): Date | null => {
    if (!date) return null;
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  const filteredTimeslots = availableTimeslots.filter((timeslot) => {
    if (!startDate || !endDate) return false;
    const startDateTime = combineDateAndTime(startDate, startTime);
    const endDateTime = combineDateAndTime(endDate, endTime);
    return (
      startDateTime &&
      endDateTime &&
      timeslot >= startDateTime &&
      timeslot <= endDateTime
    );
  });

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">انتخاب بازه‌های زمانی رزرو</h2>

      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">تاریخ و زمان شروع:</label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "انتخاب کنید"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  disabled={(date) =>
                    date < new Date() ||
                    date > addMinutes(new Date(), 1440)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="انتخاب زمان" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            تاریخ و زمان پایان:
          </label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "انتخاب کنید"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) =>
                    (startDate ? date < startDate : date < new Date()) ||
                    date > addMinutes(new Date(), 1440)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="انتخاب زمان" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredTimeslots.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">زمان‌های موجود:</h3>
          <ul className="space-y-2">
            {filteredTimeslots.map((timeslot, index) => (
              <li key={index} className="p-2 bg-gray-50 rounded">
                {format(timeslot, "PPP p")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvailableTimes;
