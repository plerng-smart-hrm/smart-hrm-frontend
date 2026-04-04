import { z } from "zod";
import { DATE_REGEX } from "../shared-regex";

export const attAdjustmentSchema = z
  .object({
    attendanceSummaryId: z.number().int().nonnegative().optional(),
    empCode: z.string().min(1, "Employee Code is required"),
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
