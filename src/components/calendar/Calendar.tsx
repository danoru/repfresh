"use client";

import { useMemo } from "react";
import moment from "moment";
import { cn } from "@/src/lib/utils";

interface CalendarProps {
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
  markedDates?: string[]; // Format: 'YYYY-MM-DD'
}

export default function Calendar({
  selectedDate,
  onSelect,
  markedDates = [],
}: CalendarProps) {
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day();

  const today = moment().format("YYYY-MM-DD");
  const selected = moment(selectedDate).format("YYYY-MM-DD");

  const days = useMemo(() => {
    const blanks = Array(startDay).fill(null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) =>
      startOfMonth.clone().date(i + 1)
    );
    return [...blanks, ...monthDays];
  }, [startDay, daysInMonth]);

  return (
    <div className="grid grid-cols-7 gap-1 w-[300px] bg-gray-50 p-2 rounded-md border">
      {["SU", "M", "T", "W", "TH", "F", "SA"].map((d) => (
        <div
          key={`day-${d}`}
          className="text-xs font-medium text-center text-muted-foreground"
        >
          {d}
        </div>
      ))}
      {days.map((day, index) => {
        if (!day) return <div key={`b-${index}`} />;

        const dateStr = day.format("YYYY-MM-DD");
        const isMarked = markedDates.includes(dateStr);
        const isToday = dateStr === today;
        const isSelected = dateStr === selected;

        return (
          <button
            key={dateStr}
            onClick={() => onSelect?.(day.toDate())}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-md text-sm transition",
              "bg-white text-black hover:bg-muted",
              isSelected &&
                "bg-white text-black font-semibold border border-primary",
              isMarked && "border border-primary border-green-500 border",
              isToday && "font-semibold underline"
            )}
          >
            {day.date()}
          </button>
        );
      })}
    </div>
  );
}
