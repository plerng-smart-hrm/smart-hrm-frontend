import { IEmployee } from "./employee";

export interface ITermination {
  id?: number;
  employeeId?: number;
  employee?: IEmployee;
  contractType?: string;
  terminationType?: string;
  basicSalary?: number;
  unpaidSalary?: number;
  remainingAnnualLeave?: number;
  noticeDays?: number;
  requiredNoticeDays?: number;
  salaryEarnedFdc?: number;
  other?: number;
  deduction?: number;
  damages?: number;
  dailyWage?: number;
  unpaidSalaryAmount?: number;
  annualLeaveAmount?: number;
  noticeCompensation?: number;
  fdcIndemnity5Per?: number;
  finalTotal?: number;
  remark?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}
