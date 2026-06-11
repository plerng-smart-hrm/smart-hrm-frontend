import { IAudit } from "./audit-entity";

export interface ILeaveType extends IAudit {
  id?: number;
  code?: string;
  name?: string;
  nameKh?: string;
  description?: string;
  defaultDays?: string;
  payRate?: string;
}
