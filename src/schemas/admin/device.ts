import { z } from "zod";

export const deviceSchema = z.object({
  name: z.string().nonempty("Name is required"),
  model: z.string().optional(),
  location: z.string().optional(),
  ipAddress: z.string().optional(),
  port: z.number().optional(),
});

export type DeviceValues = z.infer<typeof deviceSchema>;
