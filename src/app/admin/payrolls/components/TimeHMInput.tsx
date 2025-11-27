"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface TimeHMInputProps {
  value: Date | null;
  selectedMonth?: string;
  day: number;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
}

const TimeHMInput: React.FC<TimeHMInputProps> = ({
  value,
  selectedMonth,
  day,
  onChange,
  disabled = false,
}) => {
  const [time, setTime] = useState("");
  const [error, setError] = useState(false);

  // Sync external value
  useEffect(() => {
    if (!value) {
      setTime("");
      setError(false);
      return;
    }

    const hh = value.getHours().toString().padStart(2, "0");
    const mm = value.getMinutes().toString().padStart(2, "0");
    setTime(`${hh}:${mm}`);
    setError(false);
  }, [value]);

  // Convert "1:2" -> "01:02"
  const normalizeTime = (input: string): string | null => {
    const parts = input.split(":");

    if (parts.length !== 2) return null;
    const [h, m] = parts;

    if (h === "" || m === "") return null;

    const hh = h.padStart(2, "0");
    const mm = m.padStart(2, "0");

    if (hh.length !== 2 || mm.length !== 2) return null;

    const hourNum = Number(hh);
    const minuteNum = Number(mm);

    if (hourNum > 23 || minuteNum > 59) return null;

    return `${hh}:${mm}`;
  };

  const buildDate = (normalized: string) => {
    if (!selectedMonth) return;

    const [hh, mm] = normalized.split(":").map(Number);
    const [year, month] = selectedMonth.split("-").map(Number);

    const newDate = new Date(year, month - 1, day, hh, mm);
    onChange(newDate);
  };

  return (
    <Input
      type="text"
      value={time}
      disabled={disabled}
      // placeholder="HH:mm"
      maxLength={5}
      inputMode="numeric"
      onChange={(e) => {
        const raw = e.target.value.replace(/[^0-9:]/g, "");

        // Auto allow typing like 1:2
        if (raw.length <= 5) {
          setTime(raw);
        }

        setError(false);
      }}
      onBlur={() => {
        if (time === "") {
          onChange(null);
          setError(false);
          return;
        }

        const normalized = normalizeTime(time);

        if (!normalized) {
          setError(true);
          onChange(null);
          return;
        }

        setError(false);
        setTime(normalized);
        buildDate(normalized);
      }}
      className={`
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500 rounded-none"
            : "w-20 text-center border-0 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        }`}
    />
  );
};

export default TimeHMInput;
