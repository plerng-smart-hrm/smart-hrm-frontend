import { z } from "zod";

export const payrollSettingSchema = z
  .object({
    id: z.number().optional(),
    standardWorkingDays: z.number().min(1, "Standard Working Days is required"),
    standardWorkingHoursPerDay: z.number().min(1, "Standard Working Hours Per Day is required"),
    nssfPensionRateEmployer: z.number().min(0, "NSSF Pension Rate Employer is required"),
    halfMonthPayMethod: z.string().min(1, "Half Month Pay Method is required"),
    fixedHalfPayAmount: z.number().optional(),
  })
  .refine(
    (data) => data.halfMonthPayMethod !== "FIXED_AMOUNT" || (data.fixedHalfPayAmount !== undefined && data.fixedHalfPayAmount > 0),
    { message: "Fixed Half Pay Amount is required", path: ["fixedHalfPayAmount"] },
  );

export type PayrollSettingValues = z.infer<typeof payrollSettingSchema>;
