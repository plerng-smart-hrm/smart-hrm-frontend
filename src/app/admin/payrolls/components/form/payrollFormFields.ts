import { IRunPayrollForm } from "@/types/admin/payroll";
import { format, startOfMonth, setDate } from "date-fns";

export const paymentTypeFields = [
  {
    label: "Payment Type",
    key: "paymentType",
    type: "select",
    required: true,
    options: [
      { value: "FIRST_PAYMENT", label: "FIRST_PAYMENT" },
      { value: "SECOND_PAYMENT", label: "SECOND_PAYMENT" },
    ],
  },
];

export const payrollPeriodFields = [
  {
    label: "From Date",
    key: "startDate",
    type: "date",
    required: true,
  },
  {
    label: "To Date",
    key: "endDate",
    type: "date",
    required: true,
  },
];

export const runPayrollFields = [...paymentTypeFields, ...payrollPeriodFields];

export const getRunPayrollValues = (data?: IRunPayrollForm) => {
  const now = new Date();

  const defaultStartDate = format(startOfMonth(now), "yyyy-MM-dd");
  const defaultEndDate = format(setDate(now, 15), "yyyy-MM-dd");

  return {
    payrollPeriod: data?.payrollPeriod ?? "FIRST_PAYMENT",
    startDate: data?.startDate ?? defaultStartDate,
    endDate: data?.endDate ?? defaultEndDate,
  };
};
