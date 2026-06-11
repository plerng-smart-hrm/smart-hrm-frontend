import { IAudit } from "./audit-entity";


export interface IPayrollReport extends IAudit {
  id?: number;

  payrollMonth?: string; // YYYY-MM
  startDate?: string;
  endDate?: string;
  totalEmployees?: number;
  payrollSettingId?: number;

  // Earnings
  totalBaseSalary?: number;
  totalOtPay?: number;
  totalBonus?: number;
  totalAllowance?: number;
  totalGrossSalary?: number;

  // Deductions
  totalDeductionNssf?: number;
  totalDeductionTax?: number;
  totalDeductionAbsence?: number;
  totalDeductionLate?: number;
  totalDeductionLoan?: number;
  totalDeductionOther?: number;
  totalDeductionDeductions?: number;

  // Net / Settlement
  totalNetSalary?: number;
  totalSalaryAdvance?: number;
  totalSalaryBalance?: number;
  totalPaid?: number;

  // Status
}
