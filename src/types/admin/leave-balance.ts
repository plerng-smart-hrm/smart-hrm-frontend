import { IAudit } from "./audit-entity";

export interface ILeaveBalance extends IAudit {
  id?: number;
  employeeId?: number;
  year?: string;
  annualEntitledDays?: number;
  annualCarriedDays?: number;
  annualAccrued?: number;
  annualUsedDays?: number;
  specialEntitledDays?: number;
  specialUsedDays?: number;
}
