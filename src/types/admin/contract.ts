import { IEmployee } from "./employee";

export interface IContract {
  id?: number;
  employeeId?: number;
  employee?: IEmployee;
  contractTypeId?: number;
  contractType?: string;

  startDate?: string;
  endDate?: string;
  baseSalary?: number;
  contractDetail?: string;
  isExpired?: boolean;
  
  foodAllowancePerDay?: number;
  transportAllowance?: number;
  attendanceBonus?: number;
  skillLevel?: string;
  skillAllowance?: number;
  otRateNormal?: number;
  otRateExcess?: number;

  status?: string;


  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
