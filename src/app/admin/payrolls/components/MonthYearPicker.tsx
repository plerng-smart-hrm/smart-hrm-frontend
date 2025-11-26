"use client";

import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

interface MonthYearPickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export default function MonthYearPicker({ value, onChange }: MonthYearPickerProps) {
  const [year, setYear] = React.useState(
    value?.getFullYear() || new Date().getFullYear()
  );

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(year, monthIndex, 1);
    onChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "MMMM yyyy") : "Select month"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-4 space-y-4">
        {/* Year Selector */}
        <div className="flex justify-between items-center">
          <Button size="sm" variant="ghost" onClick={() => setYear(year - 1)}>
            ◀
          </Button>
          <span className="font-semibold text-lg">{year}</span>
          <Button size="sm" variant="ghost" onClick={() => setYear(year + 1)}>
            ▶
          </Button>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <Button
              key={month}
              variant={
                value &&
                value.getMonth() === index &&
                value.getFullYear() === year
                  ? "default"
                  : "outline"
              }
              onClick={() => handleMonthSelect(index)}
            >
              {month.substring(0, 3)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
