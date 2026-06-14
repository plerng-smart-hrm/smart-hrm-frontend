import { IAudit } from "./audit-entity";

export interface IDevice extends IAudit {
  id?: number;
  name?: string;
  location?: string;
}
