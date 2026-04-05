import { IEmployee } from "./employee";

export interface IAttAdjustment {
  id?: number;
  attendanceSummaryId?: number;
  employeeId?: number;
  employee?: IEmployee;
  date?: string;
  fieldChanged?: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
  requestedBy?: number;
  approvedBy?: number;
  approvalStatus?: string;
  isApplied?: boolean;
  isActive?: boolean;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}