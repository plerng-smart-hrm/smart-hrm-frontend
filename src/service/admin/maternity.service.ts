"use server";

import { IApiResponse, IMaternity, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IMaternitiesRes {
  maternities?: IMaternity[];
  pagination?: IPagination;
}

export interface IMaternityRes {
  maternity?: IMaternity;
}

export type ICreateMaternityRequest = IMaternity;

export type IUpdateMaternityRequest = IMaternity;

export const getAllMaternitys = async (
  pageIndex: number,
  pageSize?: number
): Promise<IMaternitiesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IMaternity[]>>(
    `/maternities?page=${page}&limit=${pageSize}`
  );
  return {
    maternities: data.data,
    pagination: data.pagination,
  };
};

export const getAllMaternityByEmployeeId = async (
  employeeId: number
): Promise<IMaternitiesRes> => {
  const data = await api.get<IApiResponse<IMaternity[]>>(
    `/maternities/employees/${employeeId}`
  );
  return {
    maternities: data.data,
  };
};

export const getMaternityById = async (
  maternityId?: number
): Promise<IMaternityRes> => {
  const data = await api.get<IApiResponse<IMaternity>>(
    `/maternities/${maternityId}`
  );
  return {
    maternity: data.data,
  };
};

export const createMaternity = async (
  request: ICreateMaternityRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/maternities`, request);
};

export const updateMaternity = async (
  maternityId?: number,
  request?: IUpdateMaternityRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/maternities/${maternityId}`, request);
};

export const deleteMaternity = async (maternityId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/maternities/${maternityId}`);
};
