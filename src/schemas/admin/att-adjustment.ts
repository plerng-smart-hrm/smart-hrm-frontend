import { z } from "zod";

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const attAdjustmentSchema = z
  .object({
    attendanceSummaryId: z.number().int().nonnegative().optional(),
    employeeId: z.number().int("Employee ID must be an integer").positive("Employee ID must be a positive number"),
    date: z.string().regex(DATE_REGEX, "Date must be in YYYY-MM-DD format"),
    fieldChanged: z.string().min(1, "Field changed is required"),
    oldValue: z.string().optional(),
    newValue: z.string().min(1, "New value is required"),
    reason: z.string().optional(),
  })
  .refine((data) => data.oldValue !== data.newValue, {
    message: "New value must be different from old value",
    path: ["newValue"],
  });

export type AttAdjustmentValues = z.infer<typeof attAdjustmentSchema>;
