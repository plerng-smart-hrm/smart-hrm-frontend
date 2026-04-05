import z from "zod";

export const contractSchema = z.object({
  employeeId: z.number().min(1, "Please select an employee"),
  contractType: z.string().min(1, "Contract type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.string().min(1, "Status is required"),
  baseSalary: z.number().min(0, "Base salary must be 0 or higher"),
  foodAllowancePerDay: z.number().min(0, "Food allowance must be 0 or higher"),
  transportAllowance: z.number().min(0, "Transport allowance must be 0 or higher"),
  attendanceBonus: z.number().min(0, "Attendance bonus must be 0 or higher"),
  skillLevel: z.string().min(1, "Skill level is required"),
  skillAllowance: z.number().min(0, "Skill allowance must be 0 or higher"),
  otRateNormal: z.number().min(0, "OT rate normal must be 0 or higher"),
  otRateExcess: z.number().min(0, "OT rate excess must be 0 or higher"),
  isActive: z.boolean().optional(),
});

export type ContractValues = z.infer<typeof contractSchema>;