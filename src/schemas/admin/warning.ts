import { z } from "zod";

export const warningSchema = z.object({
  employeeId: z.number().min(1, "Employee id is required"),
  type: z.string().optional(),
  remark: z.string().optional(),
  warningDate: z.string().optional(),
});

export type WarningValues = z.infer<typeof warningSchema>;
