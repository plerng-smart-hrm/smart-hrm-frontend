import { IAudit } from "./audit-entity";

export interface IWarning extends IAudit {
  id?: number;
  employeeId?: number;
  type?: string;
  remark?: string;
  warningDate?: string;
}
