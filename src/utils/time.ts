import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format } from "date-fns";

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIMEZONE = "Asia/Phnom_Penh";

export const formatScanTime = (date?: string | Date) => {
  return dayjs(date).tz(APP_TIMEZONE).format("YYYY-MM-DD HH:mm:ss");
};

export const formatDateTime = (date: Date | null) =>
  date ? format(date, "yyyy-MM-dd HH:mm") : "";