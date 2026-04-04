import { format } from "date-fns";

export const formatToDateTime = (value?: string) => {
  if (!value) return "N/A";
  return format(new Date(value), "dd-MM-yyyy, HH:mm");
};

export const formatToDate = (value?: string) => {
  if (!value) return "N/A";
  return format(new Date(value), "dd-MM-yyyy");
};

export const formatToTodayDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};
