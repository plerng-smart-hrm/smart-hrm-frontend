import { IEmployee } from "./employee";

export interface IApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
  pagination?: IPagination;
}

export interface IPagination {
  total?: number;
  currentPage?: number;
  perPage?: number;
  totalPages?: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ICategory {
  id?: number;
  name?: string;
  isActive?: boolean;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ICustomer {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  isActive?: boolean;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IColor {
  id?: number;
  hexCode?: string;
  productId?: number;
}

export interface IIMage {
  id?: number;
  productId?: number;
  url?: string;
  sortOrder?: number;
}

export interface IProduct {
  id?: number;
  name?: string;
  categoryId?: number;
  category?: ICategory;
  description?: string;
  price?: number;
  quantity?: number;
  discountPercent?: string;
  isActive?: boolean;
  colors?: IColor[];
  images?: IIMage[];

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ICategoryOption {
  label?: string;
  value?: string;
}

export interface IDevice {
  id?: number;
  factoryId?: number;
  name?: string;
  model?: string;
  location?: string;
  ipAddress?: string;
  port?: number;
  status?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IHoliday {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  type?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IContractType {
  id?: number;
  name?: string;
  code?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IContract {
  id?: number;
  employeeId?: number;
  employee?: IEmployee;
  contractTypeId?: number;
  contractType?: IContractType;

  startDate?: string;
  endDate?: string;
  baseSalary?: number;
  contractDetail?: string;
  isExpired?: boolean;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ILeaveType {
  id?: number;
  name?: string;
  nameKh?: string;
  description?: string;
  defaultDays?: number;
  payRate?: number;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ILeaveRequest {
  id?: number;
  employeeId?: number;
  employee?: IEmployee;
  leaveTypeId?: number;
  leaveType?: ILeaveType;
  startDate?: string;
  endDate?: string;
  reason?: string;
  supportingDocUrl?: string;
  requestDate?: string;
  status?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ICompany {
  id?: number;
  name?: string;
  description?: string;
  location?: string;
  logo?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IDepartment {
  id?: number;
  name?: string;
  companyId: number;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ISection {
  id?: number;
  name?: string;
  description?: string;
  departmentId?: number;
  department?: IDepartment;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
