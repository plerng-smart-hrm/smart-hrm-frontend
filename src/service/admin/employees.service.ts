"use server";

import { IApiResponse, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";
import { IEmployee } from "@/types/admin/employee";
import { EmployeeValues } from "@/schemas/admin/employee";

export interface IEmployeesRes {
  employees?: IEmployee[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IEmployeeRes {
  employee?: IEmployee;
}

export const getAllEmployees = async (
  pageIndex: number,
  pageSize?: number
): Promise<IEmployeesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IEmployee[]>>(
    `/v1/employees?page=${page}&limit=${pageSize}`
  );
  return {
    employees: data.data,
    pagination: data.pagination,
  };
};

export const getEmployeeById = async (
  employeeId?: number
): Promise<IEmployeeRes> => {
  const data = await api.get<IApiResponse<IEmployee>>(
    `/v1/employees/${employeeId}`
  );
  return {
    employee: data.data,
  };
};

export const createEmployee = async (
  request: EmployeeValues
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/employees`, request);
};

export const updateEmployee = async (
  employeeId?: number,
  request?: EmployeeValues
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/employees/${employeeId}`, request);
};

export const deleteEmployee = async (employeeId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/employees/${employeeId}`);
};
