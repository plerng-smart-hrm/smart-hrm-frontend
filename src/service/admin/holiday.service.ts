"use server";

import { IApiResponse, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IHolidayRes {
  holiday?: IHoliday;
}

export type ICreateHolidayRequest = IHoliday;

export type IUpdateHolidayRequest = IHoliday;

export const getAllHolidays = async (
  pageIndex: number,
  pageSize?: number
): Promise<IHolidaysRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IHoliday[]>>(
    `/holidays?page=${page}&limit=${pageSize}&sortBy=startDate&order=ASC`
  );
  return {
    holidays: data.data,
    pagination: data.pagination,
  };
};

export const getHolidayById = async (
  holidayId?: number
): Promise<IHolidayRes> => {
  const data = await api.get<IApiResponse<IHoliday>>(`/holidays/${holidayId}`);
  return {
    holiday: data.data,
  };
};

export const createHoliday = async (
  request: ICreateHolidayRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/holidays`, request);
};

export const updateHoliday = async (
  holidayId?: number,
  request?: IUpdateHolidayRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/holidays/${holidayId}`, request);
};

export const deleteHoliday = async (holidayId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/holidays/${holidayId}`);
};
