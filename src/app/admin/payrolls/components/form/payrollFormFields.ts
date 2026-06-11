import { format, startOfMonth, endOfMonth, setDate } from "date-fns";

export const payrollPeriodFields = [
  {
    label: "From Date",
    key: "fromDate",
    type: "date",
    required: true,
  },
  {
    label: "To Date",
    key: "toDate",
    type: "date",
    required: true,
  },
];

export const runPayrollFields = [...payrollPeriodFields];

export const getRunPayrollValues = (type: "FIRST_PAYMENT" | "SECOND_PAYMENT" = "FIRST_PAYMENT") => {
  const now = new Date();
  if (type === "FIRST_PAYMENT") {
    return {
      fromDate: format(startOfMonth(now), "yyyy-MM-dd"),
      toDate: format(setDate(now, 15), "yyyy-MM-dd"),
    };
  }
  return {
    fromDate: format(setDate(now, 16), "yyyy-MM-dd"),
    toDate: format(endOfMonth(now), "yyyy-MM-dd"),
  };
};
