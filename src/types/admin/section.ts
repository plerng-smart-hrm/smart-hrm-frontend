import { IDepartment } from ".";
import { IAudit } from "./audit-entity";

export interface ISection extends IAudit {
  id?: number;
  name?: string;
  description?: string;
  departmentId?: number;
  department?: IDepartment;
}
