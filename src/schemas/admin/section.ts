import z from "zod";

export const sectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  departmentId: z.number().min(1, "Please select a department"),
});

export type SectionValues = z.infer<typeof sectionSchema>;
