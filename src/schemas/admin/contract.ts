import z from "zod";

export const contractSchema = z.object({
  empCode: z.string().min(1, "Please enter employee code"),
  contractType: z.string().min(1, "Contract type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.string().min(1, "Status is required"),
  baseSalary: z.number().min(0, "Base salary must be 0 or higher"),
  allowanceFoodPerDay: z.number().min(0, "Food allowance must be 0 or higher"),
  allowanceFemaleLunchPerDay: z.number().min(0, "Food allowance must be 0 or higher"),
  allowanceMilkMonthly: z.number().min(0, "Food allowance must be 0 or higher"),
  allowanceHousing: z.number().min(0, "Transport allowance must be 0 or higher"),
  allowanceTransport: z.number().min(0, "Transport allowance must be 0 or higher"),
  allowanceOtFoodPerHour: z.number().min(0, "Transport allowance must be 0 or higher"),
  allowanceUnionFeeMonthly: z.number().min(0, "Attendance bonus must be 0 or higher"),
  allowanceSkill: z.number().min(1, "Skill level is required"),
  bonusAttendance: z.number().min(0, "Skill allowance must be 0 or higher"),
  bonusPosition: z.number().min(0, "OT rate normal must be 0 or higher"),
  bonusTechnical: z.number().min(0, "OT rate excess must be 0 or higher"),
  skillLevel: z.string().min(1, "Skill level is required"),
  otRateNormal: z.number().min(0, "OT rate normal must be 0 or higher"),
  otRateExcess: z.number().min(0, "OT rate excess must be 0 or higher"),
});

export type ContractValues = z.infer<typeof contractSchema>;
