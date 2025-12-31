"use server";

import {
  IApiResponse,
  IDepartment,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";
import { IDepartmentOption } from "@/types/admin/department";
import { DepartmentValues } from "@/schemas/admin/department";

export interface IDepartmentsOptionRes {
  data?: IDepartmentOption[];
}
export interface IDepartmentsRes {
  departments?: IDepartment[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IDepartmentRes {
  department?: IDepartment;
}

export const getAllDepartments = async (
  pageIndex: number,
  pageSize?: number
): Promise<IDepartmentsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IDepartment[]>>(
    `/v1/departments?page=${page}&limit=${pageSize}`
  );
  return {
    departments: data.data,
    pagination: data.pagination,
  };
};

export const getDepartmentsList = async (): Promise<IDepartmentsOptionRes> => {
  const data = await api.get<IApiResponse<IDepartmentOption[]>>(
    `/v1/departments/list`
  );
  return {
    data: data.data,
  };
};

export const getDepartmentById = async (
  departmentId?: number
): Promise<IDepartmentRes> => {
  const data = await api.get<IApiResponse<IDepartment>>(
    `/v1/departments/${departmentId}`
  );
  return {
    department: data.data,
  };
};

export const createDepartment = async (
  request: DepartmentValues
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/departments`, request);
};

export const updateDepartment = async (
  departmentId?: number,
  request?: DepartmentValues
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/v1/departments/${departmentId}`,
    request
  );
};

export const deleteDepartment = async (
  departmentId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/departments/${departmentId}`);
};
