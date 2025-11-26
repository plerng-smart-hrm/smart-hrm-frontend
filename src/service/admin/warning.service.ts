"use server";

import { IApiResponse, IWarning, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IWarningsRes {
  warnings?: IWarning[];
  pagination?: IPagination;
}

export interface IWarningRes {
  warning?: IWarning;
}

export type ICreateWarningRequest = IWarning;

export type IUpdateWarningRequest = IWarning;

export const getAllWarnings = async (
  pageIndex: number,
  pageSize?: number
): Promise<IWarningsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IWarning[]>>(
    `/warnings?page=${page}&limit=${pageSize}`
  );
  return {
    warnings: data.data,
    pagination: data.pagination,
  };
};

export const getAllWarningByEmployeeId = async (
  employeeId: number
): Promise<IWarningsRes> => {
  const data = await api.get<IApiResponse<IWarning[]>>(
    `/warnings/employees/${employeeId}`
  );
  return {
    warnings: data.data,
  };
};

export const getWarningById = async (
  warningId?: number
): Promise<IWarningRes> => {
  const data = await api.get<IApiResponse<IWarning>>(`/warnings/${warningId}`);
  return {
    warning: data.data,
  };
};

export const createWarning = async (
  request: ICreateWarningRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/warnings`, request);
};

export const updateWarning = async (
  warningId?: number,
  request?: IUpdateWarningRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/warnings/${warningId}`, request);
};

export const deleteWarning = async (warningId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/warnings/${warningId}`);
};
