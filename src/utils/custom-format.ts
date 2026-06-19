import { ITimeShiftOption } from "@/types/admin/time-shift";
import { format } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz';

export function formatToNumber(value: any, fallback: number = 0): number {
  if (value === undefined || value === null || value === "") return fallback;
  const num = Number(value);
  return isNaN(num) ? fallback : num;
}

export function formatToString(value: any, fallback: string = ""): string {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

export function formatToDate(date?: string | Date, formatStr = "yyyy-MM-dd", timezone?: string) {
  if (!date) return "";

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return ""; // invalid date
  }

  if (timezone) {
    return formatInTimeZone(parsedDate, timezone, formatStr);
  }

  return format(parsedDate, formatStr);
}

export function formatToTime(value?: string, fallback: string = ""): string {
  if (!value) return fallback;
  const parts = value.split(":");
  const h = (parts[0] ?? "00").padStart(2, "0");
  const m = (parts[1] ?? "00").padStart(2, "0");
  const s = (parts[2] ?? "00").padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function formatToCurrency(value?: number, fallback: string = "") {
  if (value === undefined || value === null) return fallback;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
