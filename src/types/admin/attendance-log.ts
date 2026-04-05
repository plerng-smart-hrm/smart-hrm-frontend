import { IDevice } from ".";
import { IEmployee } from "./employee";

export interface IAttendanceLog {
  id?: number;
  employee?: IEmployee;
  device?: IDevice;
  scanTime?: string;
  actionType?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}
