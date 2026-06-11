import { z } from "zod";

export const runPayrollSchema = z.object({
  fromDate: z.string().min(1, "From date is required"),
  toDate: z.string().min(1, "To date is required"),
});

export type RunPayrollValues = z.infer<typeof runPayrollSchema>;
