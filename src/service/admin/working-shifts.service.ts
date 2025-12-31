"use server";

import {
  IApiResponse,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";
import { IWorkingShift, IWorkingShiftOption } from "@/types/admin/working-shift";
import { WorkingShiftValues } from "@/schemas/admin/working-shift";

export interface IWorkingShiftsRes {
  workingShifts?: IWorkingShift[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IWorkingShiftRes {
  workingShift?: IWorkingShift;
}

export const getAllWorkingShifts = async (
  pageIndex: number,
  pageSize?: number
): Promise<IWorkingShiftsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IWorkingShift[]>>(
    `/v1/working-shift?page=${page}&limit=${pageSize}`
  );
  return {
    workingShifts: data.data,
    pagination: data.pagination,
  };
};

export const getWorkingShiftsList = async () => {
  const data = await api.get<IApiResponse<IWorkingShiftOption[]>>(
    `/v1/working-shift/list`
  )

  return {
    data: data.data
  }
}

export const getWorkingShiftById = async (
  workingShiftId?: number
): Promise<IWorkingShiftRes> => {
  const data = await api.get<IApiResponse<IWorkingShift>>(
    `/v1/working-shift/${workingShiftId}`
  );
  return {
    workingShift: data.data,
  };
};

export const createWorkingShift = async (
  request: WorkingShiftValues
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/working-shift`, request);
};

export const updateWorkingShift = async (
  workingShiftId?: number,
  request?: WorkingShiftValues
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/v1/working-shift/${workingShiftId}`,
    request
  );
};

export const deleteWorkingShift = async (
  workingShiftId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/working-shift/${workingShiftId}`);
};
