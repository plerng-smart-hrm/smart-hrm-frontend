import { IContract } from "./contract";
import { IEmployee } from "./employee";

export interface IPayroll {
  id?: number;

  employeeId?: number;
  contractId?: number;

  payrollMonth?: string; // YYYY-MM
  startDate?: string;
  endDate?: string;

  // Attendance
  workingDays?: number;
  presentDays?: number;
  absentDays?: number;
  leaveDays?: number;
  unpaidLeaveDays?: number;
  holidayDays?: number;
  lateMinutes?: number;

  // Overtime
  ot1Hours?: number;
  ot2Hours?: number;
  holidayOtHours?: number;
  ot1Pay?: number;
  ot2Pay?: number;
  holidayOtPay?: number;

  // Earnings
  baseSalary?: number;
  seniorityBonus?: number;
  foodAllowance?: number;
  transportAllowance?: number;
  attendanceBonus?: number;
  skillAllowance?: number;
  nightShiftAllowance?: number;
  otherAllowances?: number;
  allowanceTotal?: number;
  grossSalary?: number;

  // Deductions
  nssfDeduction?: number;
  absenceDeduction?: number;
  lateDeduction?: number;
  taxDeduction?: number;
  otherDeductions?: number;
  totalDeductions?: number;

  // GDT Tax
  taxExchangeRate?: number;
  taxInKhr?: number;
  taxableIncomeKhr?: number;

  // Net & Payment
  netSalary?: number;
  totalPaid?: number;
  remainingBalance?: number;

  // Status & Approval
  status?: string;
  calculatedAt?: string | Date;
  approvedBy?: number;
  approvedAt?: string | Date;
  remark?: string;

  // Audit
  isActive?: boolean;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date;

  // Relations
  employee?: IEmployee;
  contract?: IContract;
  payments?: any[];
  nssfContributions?: any[];
}


export interface IRunPayrollForm {
  payrollPeriod?: string;
  startDate?: string;
  endDate?: string;
}