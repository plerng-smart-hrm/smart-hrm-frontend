import { z } from "zod";

export const workingShiftSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  firstInTime: z.string().min(1, "First in time is required"),
  firstOutTime: z.string().min(1, "First out time is required"),
  secondInTime: z.string().min(1, "Second in time is required"),
  secondOutTime: z.string().min(1, "Second out time is required"),
  breakMinutes: z.number().int().min(0, "Break minutes must be at least 0"),
  lateAllowMinutes: z.number().int().min(0, "Late allow minutes must be at least 0"),
});

export type WorkingShiftValues = z.infer<typeof workingShiftSchema>;