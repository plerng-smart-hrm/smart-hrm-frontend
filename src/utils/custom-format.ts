import { format } from "date-fns";

export function formatToNumber(value: any, fallback: number = 0): number {
  if (value === undefined || value === null || value === "") return fallback;
  const num = Number(value);
  return isNaN(num) ? fallback : num;
}

export function formatToString(value: any, fallback: string = ""): string {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

export function formatToDate(value?: string, fallback: string = "") {
  if (!value) return fallback;
  return format(new Date(value), "yyyy-MM-dd");
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
