import z from "zod";

export const departmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type DepartmentValues = z.infer<typeof departmentSchema>;
