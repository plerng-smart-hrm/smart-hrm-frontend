import { IEmployee } from "./employee";
import { IContract } from "./contract";

export interface IPayrollPayment {
  id?: number;

  payrollId?: number;

  employeeId?: number;
  employee?: IEmployee;

  // Payment Info
  paymentPeriod?: string;
  paymentType?: string;
  paymentMethod?: string;
  paymentDate?: string;

  amount?: number;
  currency?: string;

  referenceNo?: string;
  remark?: string;

  status?: string;
  paidBy?: number;
  approvedBy?: number;
  approvedAt?: Date;

  // Audit
  isActive?: boolean;
  createdBy?: number;
  updatedBy?: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  contract?: IContract; // optional if you join contract
}
