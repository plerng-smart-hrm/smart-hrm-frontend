import { z } from "zod";
import { DATE_REGEX } from "../shared-regex";

export const attAdjustmentSchema = z
  .object({
    attendanceSummaryId: z.number().int().nonnegative().optional(),
    employeeId: z.number().int().nonnegative().min(1, "Employee is required"),
    date: z.string().regex(DATE_REGEX, "Date must be in YYYY-MM-DD format"),
    fieldChanged: z.string().min(1, "Field changed is required"),
    oldValue: z.string().optional(),
    newValue: z.string().min(1, "New value is required"),
    leaveType: z.string().optional(),
    reason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.oldValue === data.newValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New value must be different from old value",
        path: ["newValue"],
      });
    }
    if (data.fieldChanged === "LEAVE_HOURS" && !data.leaveType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Leave type is required",
        path: ["leaveType"],
      });
    }
  });

export type AttAdjustmentValues = z.infer<typeof attAdjustmentSchema>;
