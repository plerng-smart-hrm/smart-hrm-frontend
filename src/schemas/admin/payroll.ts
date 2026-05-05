import { z } from "zod";

export const runPayrollSchema = z.object({
  paymentType: z.string().min(1, "Payment type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type RunPayrollValues = z.infer<typeof runPayrollSchema>;

export type PayrollRequest = Omit<RunPayrollValues, "paymentType">;

