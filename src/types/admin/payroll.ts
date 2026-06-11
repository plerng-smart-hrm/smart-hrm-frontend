import { IAudit } from "./audit-entity";
import { IEmployee } from "./employee";

export interface IPayroll extends IAudit {
  id?: number;

  employeeId?: number;
  contractId?: number;

  payrollMonth?: string; // YYYY-MM
  startDate?: string;
  endDate?: string;

  // Attendance counts
  workingDays?: number;
  normalDays?: number;
  nightDays?: number;
  absentDays?: number;
  leaveDays?: number;
  unpaidLeaveDays?: number;
  lateMins?: number;

  // Hour totals
  totalNormalHours?: number;
  totalNightHours?: number;
  totalPhHours?: number;
  totalLeaveHours?: number;
  totalOt1Hours?: number;
  totalOt2Hours?: number;
  totalOtNightHours?: number;

  // Pay components
  payNormalHours?: number;
  payNightHours?: number;
  payPh?: number;
  payLeave?: number;
  payOt1?: number;
  payOt2?: number;
  payOtNight?: number;
  payTotal?: number;

  // Salary
  baseSalary?: number;

  // Bonuses
  bonusAttendance?: number;
  bonusSeniority?: number;
  bonusPosition?: number;
  bonusTechnical?: number;
  bonusTarget?: number;
  bonusTotal?: number;

  // Allowances
  allowanceOtFood?: number;
  allowanceLunch?: number;
  allowanceMilk?: number;
  allowanceHousing?: number;
  allowanceTransport?: number;
  allowanceSkill?: number;
  allowanceNightShift?: number;
  allowanceOther?: number;
  allowanceTotal?: number;

  grossSalary?: number;

  // Deductions
  deductionNssf?: number;
  deductionAbsence?: number;
  deductionLate?: number;
  deductionTax?: number;
  deductionLoan?: number;
  deductionOther?: number;
  deductionTotal?: number;

  netSalary?: number;
  salaryAdvance?: number;
  salaryBalance?: number;

  status?: string;
  employee?: IEmployee;
}

export interface IRunPayrollForm {
  payrollPeriod?: string;
  startDate?: string;
  endDate?: string;
}
