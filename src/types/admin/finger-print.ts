import { IAudit } from "./audit-entity";
import { IDevice } from "./device";

export interface IFingerPrint extends IAudit {
  id?: number;
  employeeId?: number;
  empCode?: string;
  deviceId?: number;
  role?: number;
  password?: string;
  isActive?: boolean;
  device?: IDevice;
}
