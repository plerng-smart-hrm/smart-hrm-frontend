"use server";

import { IApiResponse, IVaccine, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IVaccinesRes {
  vaccines?: IVaccine[];
  pagination?: IPagination;
}

export interface IVaccineRes {
  vaccine?: IVaccine;
}

export type ICreateVaccineRequest = IVaccine;

export type IUpdateVaccineRequest = IVaccine;

export const getAllVaccines = async (
  pageIndex: number,
  pageSize?: number
): Promise<IVaccinesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IVaccine[]>>(
    `/vaccines?page=${page}&limit=${pageSize}`
  );
  return {
    vaccines: data.data,
    pagination: data.pagination,
  };
};

export const getAllVaccineByEmployeeId = async (
  employeeId: number
): Promise<IVaccinesRes> => {
  const data = await api.get<IApiResponse<IVaccine[]>>(
    `/vaccines/employees/${employeeId}`
  );
  return {
    vaccines: data.data,
  };
};

export const getVaccineById = async (
  vaccineId?: number
): Promise<IVaccineRes> => {
  const data = await api.get<IApiResponse<IVaccine>>(`/vaccines/${vaccineId}`);
  return {
    vaccine: data.data,
  };
};

export const createVaccine = async (
  request: ICreateVaccineRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/vaccines`, request);
};

export const updateVaccine = async (
  vaccineId?: number,
  request?: IUpdateVaccineRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/vaccines/${vaccineId}`, request);
};

export const deleteVaccine = async (vaccineId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/vaccines/${vaccineId}`);
};
