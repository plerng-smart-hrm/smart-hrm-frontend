"use server";

import { IApiResponse, IHoliday, ILeaveType, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface ILeaveTypesRes {
  leaveTypes?: ILeaveType[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface ILeaveTypeRes {
  leaveType?: ILeaveType;
}

export interface ICreateLeaveTypeRequest {
  name: string;
  nameKh?: string;
  description?: string;
  defaultDays?: number;
  payRate?: number;
}

export interface IUpdateLeaveTypeRequest {
  name: string;
  nameKh?: string;
  description?: string;
  defaultDays?: number;
  payRate?: number;
}

export const getAllLeaveTypes = async (
  pageIndex: number,
  pageSize?: number
): Promise<ILeaveTypesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<ILeaveType[]>>(
    `/leave-types?page=${page}&limit=${pageSize}`
  );
  return {
    leaveTypes: data.data,
    pagination: data.pagination,
  };
};

export const getLeaveTypeList = async (): Promise<ILeaveTypesRes> => {
  const data = await api.get<IApiResponse<ILeaveType[]>>(`/leave-types/list`);
  return {
    leaveTypes: data.data,
  };
};

export const getLeaveTypeById = async (
  leaveTypeId?: number
): Promise<ILeaveTypeRes> => {
  const data = await api.get<IApiResponse<ILeaveType>>(
    `/leave-types/${leaveTypeId}`
  );
  return {
    leaveType: data.data,
  };
};

export const createLeaveType = async (
  request: ICreateLeaveTypeRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/leave-types`, request);
};

export const updateLeaveType = async (
  leaveTypeId?: number,
  request?: IUpdateLeaveTypeRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/leave-types/${leaveTypeId}`, request);
};

export const deleteLeaveType = async (leaveTypeId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/leave-types/${leaveTypeId}`);
};
