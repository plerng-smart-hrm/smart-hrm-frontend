import { IAudit } from "./audit-entity";
import { IContract } from "./contract";
import { ISection } from "./section";
import { ITimeShift } from "./time-shift";

export interface IEmployee extends IAudit {
  id?: number;
  sectionId?: number;

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

  activeContract?: IContract;
  timeShift?: ITimeShift;

  section?: ISection
}
