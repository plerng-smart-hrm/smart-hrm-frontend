import { z } from "zod";

export const terminationSchema = z.object({
  employeeId: z.number().min(1, "Employee ID is required"),
  contractType: z.string().min(1, "Contract type is required"),
  terminationType: z.string().min(1, "Termination type is required"),
  basicSalary: z.number().positive("Basic salary must be greater than 0"),
  unpaidSalary: z.number().min(0, "Cannot be negative"),
  remainingAnnualLeave: z.number().min(0, "Cannot be negative"),
  noticeDays: z.number().min(0, "Cannot be negative").optional(),
  requiredNoticeDays: z.number().min(0).optional(),
  salaryEarnedFdc: z.number().min(0, "Cannot be negative").optional(),
  other: z.number().min(0, "Cannot be negative"),
  deduction: z.number().min(0, "Cannot be negative"),
  damages: z.number().min(0, "Cannot be negative").optional(),
  remark: z.string().optional(),
});

export type TerminationValues = z.infer<typeof terminationSchema>;
