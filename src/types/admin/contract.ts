import { IEmployee } from "./employee";

export interface IContract {
  id?: number;
  employeeId?: number;
  employee?: IEmployee;
  empCode?: string;
  contractTypeId?: number;
  contractType?: string;

  startDate?: string;
  endDate?: string;
  signedDate?: string | null;
  baseSalary?: number;
  dailyRate?: number;
  hourlyRate?: number;
  contractDetail?: string;
  isExpired?: boolean;

  // legacy field names (older API shape) — kept for existing consumers
  foodAllowancePerDay?: number;
  transportAllowance?: number;
  attendanceBonus?: number;
  skillAllowance?: number;

  // current API / contractSchema field names
  allowanceFoodPerDay?: number;
  allowanceFemaleLunchPerDay?: number;
  allowanceMilkMonthly?: number;
  allowanceHousing?: number;
  allowanceTransport?: number;
  allowanceOtFoodPerHour?: number;
  allowanceUnionFeeMonthly?: number;
  allowanceSkill?: number;
  bonusAttendance?: number;
  bonusPosition?: number;
  bonusTechnical?: number;

  skillLevel?: string;
  otRateNormal?: number;
  otRateExcess?: number;

  status?: string;


  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
