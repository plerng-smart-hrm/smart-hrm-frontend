import { z } from "zod";
import { employeeSchema } from "@/schemas/admin/employee";
import { contractSchema } from "@/schemas/admin/contract";

export const personalInfoSchema = employeeSchema.pick({
  empCode: true,
  firstName: true,
  lastName: true,
  firstNameKh: true,
  lastNameKh: true,
  gender: true,
  dateOfBirth: true,
  phone: true,
  idCardNo: true,
  placeOfBirth: true,
  nationality: true,
  race: true,
  maritalStatus: true,
  childrenNumber: true,
  currentAddress: true,
  education: true,
  laborBookNo: true,
  nssfRegisterNo: true,
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const jobShiftSchema = employeeSchema.pick({
  position: true,
  timeShiftId: true,
  startDate: true,
  endDate: true,
  employeeStatus: true,
  workStatus: true,
  employeeType: true,
  sectionId: true,
});
export type JobShiftValues = z.infer<typeof jobShiftSchema>;

// Derived from the single source of truth (contractSchema) — empCode is supplied
// automatically from the personal-info step, so the contract step never asks for it.
export const contractStepSchema = contractSchema.omit({ empCode: true });
export type ContractStepValues = z.infer<typeof contractStepSchema>;

export const personalInfoDefaults: PersonalInfoValues = {
  empCode: "",
  firstName: "",
  lastName: "",
  firstNameKh: "",
  lastNameKh: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  idCardNo: "",
  placeOfBirth: "",
  nationality: "",
  race: "",
  maritalStatus: "",
  childrenNumber: 0,
  currentAddress: "",
  education: "",
  laborBookNo: "",
  nssfRegisterNo: "",
};

export const jobShiftDefaults: JobShiftValues = {
  position: "",
  timeShiftId: 0,
  startDate: "",
  endDate: "",
  employeeStatus: "PROBATION",
  workStatus: "ACTIVE",
  employeeType: "",
  sectionId: undefined,
};

export const contractStepDefaults: ContractStepValues = {
  contractType: "",
  startDate: "",
  endDate: "",
  status: "ACTIVE",
  baseSalary: 0,
  allowanceFoodPerDay: 0,
  allowanceFemaleLunchPerDay: 0,
  allowanceMilkMonthly: 0,
  allowanceHousing: 0,
  allowanceTransport: 0,
  allowanceOtFoodPerHour: 0,
  allowanceUnionFeeMonthly: 0,
  allowanceSkill: 0,
  bonusAttendance: 0,
  bonusPosition: 0,
  bonusTechnical: 0,
  skillLevel: "NONE",
  otRateNormal: 0,
  otRateExcess: 0,
};
