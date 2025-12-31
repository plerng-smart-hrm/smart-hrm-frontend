import { z } from "zod";

export const deviceSchema = z.object({
  name: z.string().min(1),
  model: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  ipAddress: z.string().min(1).optional(),
  port: z.number().optional(),
});

export type DeviceValues = z.infer<typeof deviceSchema>;
