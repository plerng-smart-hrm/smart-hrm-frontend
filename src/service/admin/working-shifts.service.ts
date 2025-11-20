"use server";

import {
  IApiResponse,
  IWorkingShift,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";

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

export type ICreateWorkingShiftRequest = IWorkingShift;

export type IUpdateWorkingShiftRequest = IWorkingShift;

export const getAllWorkingShifts = async (
  pageIndex: number,
  pageSize?: number
): Promise<IWorkingShiftsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IWorkingShift[]>>(
    `/working-shift?page=${page}&limit=${pageSize}`
  );
  return {
    workingShifts: data.data,
    pagination: data.pagination,
  };
};

export const getWorkingShiftById = async (
  workingShiftId?: number
): Promise<IWorkingShiftRes> => {
  const data = await api.get<IApiResponse<IWorkingShift>>(
    `/working-shift/${workingShiftId}`
  );
  return {
    workingShift: data.data,
  };
};

export const createWorkingShift = async (
  request: ICreateWorkingShiftRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/working-shift`, request);
};

export const updateWorkingShift = async (
  workingShiftId?: number,
  request?: IUpdateWorkingShiftRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/working-shift/${workingShiftId}`,
    request
  );
};

export const deleteWorkingShift = async (
  workingShiftId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/working-shift/${workingShiftId}`);
};
