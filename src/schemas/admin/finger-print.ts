import { z } from "zod";

export const enrollFingerPrintSchema = z.object({
  deviceId: z.string().min(1, "Device is required"),
  role: z.number().optional(),
  password: z.string().optional(),
});

export type EnrollFingerPrintValues = z.infer<typeof enrollFingerPrintSchema>;
