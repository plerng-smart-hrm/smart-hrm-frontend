import { IContract } from "./contract";
import { ITimeShift } from "./time-shift";

export interface IEmployee {
  id?: number;
  empCode?: string;
  firstName?: string;
  lastName?: string;
  firstNameKh?: string;
  lastNameKh?: string;
  profileUrl?: string;
  gender?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  nationality?: string;
  race?: string;
  maritalStatus?: string;
  childrenNumber?: number;
  phone?: string;
  currentAddress?: string;
  education?: string;
  employeeType?: string;
  workStatus?: string;
  employeeStatus?: string;
  start?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  laborBookNo?: string;
  idCardNo?: string;
  nssfRegisterNo?: string;
  timeShiftId?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  activeContract?: IContract;
  timeShift?: ITimeShift;
}
