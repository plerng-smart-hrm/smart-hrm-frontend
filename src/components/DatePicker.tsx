"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  placeholder: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
}

export function DatePicker({ label, placeholder, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // If we have an existing time, preserve it
      if (value) {
        const newDate = new Date(selectedDate);
        newDate.setHours(value.getHours());
        newDate.setMinutes(value.getMinutes());
        onChange(newDate);
      } else {
        // No existing time, set to default time (00:00)
        const newDate = new Date(selectedDate);
        newDate.setHours(0, 0, 0, 0);
        onChange(newDate);
      }
    } else {
      onChange(null);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="text-sm font-medium">{label}</div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start text-left"
          >
            {value ? format(value, "yyyy-MM-dd") : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
