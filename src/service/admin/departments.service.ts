"use server";

import {
  IApiResponse,
  IDepartment,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";

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

export interface ICreateDepartmentRequest {
  name?: string;
}

export interface IUpdateDepartmentRequest {
  name?: string;
}

export const getAllDepartments = async (
  pageIndex: number,
  pageSize?: number
): Promise<IDepartmentsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IDepartment[]>>(
    `/departments?page=${page}&limit=${pageSize}`
  );
  return {
    departments: data.data,
    pagination: data.pagination,
  };
};

export const getDepartmentById = async (
  departmentId?: number
): Promise<IDepartmentRes> => {
  const data = await api.get<IApiResponse<IDepartment>>(
    `/departments/${departmentId}`
  );
  return {
    department: data.data,
  };
};

export const createDepartment = async (
  request: ICreateDepartmentRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/departments`, request);
};

export const updateDepartment = async (
  departmentId?: number,
  request?: IUpdateDepartmentRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/departments/${departmentId}`, request);
};

export const deleteDepartment = async (
  departmentId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/departments/${departmentId}`);
};
