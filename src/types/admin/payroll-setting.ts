import { IAudit } from "./audit-entity";

export interface IPayrollSetting extends IAudit {
  id?: number;
  standardWorkingDays?: number;
  standardWorkingHoursPerDay?: number;
  nssfPensionRateEmployer?: number;
  halfMonthPayMethod?: string;
  fixedHalfPayAmount?: number;
}
