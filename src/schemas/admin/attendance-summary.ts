import z from "zod";
import { DATE_REGEX } from "../shared-regex";

export const triggerAttendanceSummarySchema = z.object({
  date: z.string().regex(DATE_REGEX, "Date must be in YYYY-MM-DD format"),
});

export type TriggerAttendanceSummaryValues = z.infer<typeof triggerAttendanceSummarySchema>;
