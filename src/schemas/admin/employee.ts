import { z } from "zod";

export const employeeSchema = z.object({
  empCode: z.string().min(1, "Employee code is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  firstNameKh: z.string().optional(),
  lastNameKh: z.string().optional(),
  gender: z.string(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  race: z.string().optional(),
  maritalStatus: z.string(),
  childrenNumber: z.number().min(0).optional(),
  phone: z.string().optional(),
  currentAddress: z.string().optional(),
  education: z.string().optional(),
  employeeType: z.string(),
  workStatus: z.string(),
  employeeStatus: z.string(),
  start: z.string().min(1, "Start date is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  laborBookNo: z.string().optional(),
  idCardNo: z.string().optional(),
  nssfRegisterNo: z.string().optional(),
  workingShiftId: z.number().min(1, "Please select a working shift"),
});

export type EmployeeValues = z.infer<typeof employeeSchema>;
