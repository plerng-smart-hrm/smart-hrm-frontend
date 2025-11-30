"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
}

export function TimePicker({ label, value, onChange }: Props) {
  // Use useMemo for derived state instead of useState + useEffect
  const time = useMemo(() => {
    return value ? format(value, "HH:mm") : "00:00";
  }, [value]);

  const handleTimeChange = (newTime: string) => {
    if (value) {
      // Update time on existing date
      const [h, m] = newTime.split(":").map(Number);
      const newDate = new Date(value);
      newDate.setHours(h, m, 0, 0);
      onChange(newDate);
    } else {
      // Create new date with today's date and selected time
      const newDate = new Date();
      const [h, m] = newTime.split(":").map(Number);
      newDate.setHours(h, m, 0, 0);
      onChange(newDate);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="text-sm font-medium">{label}</div>
      <Input
        type="time"
        value={time}
        onChange={(e) => handleTimeChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
