"use server";

import { IApiResponse, IDevice, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IDevicesRes {
  devices?: IDevice[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IDeviceRes {
  device?: IDevice;
}

export interface ICreateDeviceRequest extends IDevice {}

export interface IUpdateDeviceRequest {}

export const getAllDevices = async (
  pageIndex: number,
  pageSize?: number
): Promise<IDevicesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IDevice[]>>(
    `/devices?page=${page}&limit=${pageSize}`
  );
  return {
    devices: data.data,
    pagination: data.pagination,
  };
};

export const syncAllDevices = async () => {
  await api.post<IApiResponse<IDevice[]>>(`/devices/sync-attendance`);
};

export const getDeviceById = async (deviceId?: number): Promise<IDeviceRes> => {
  const data = await api.get<IApiResponse<IDevice>>(`/devices/${deviceId}`);
  return {
    device: data.data,
  };
};

export const createDevice = async (
  request: ICreateDeviceRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/devices`, request);
};

export const updateDevice = async (
  deviceId?: number,
  request?: IUpdateDeviceRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/devices/${deviceId}`, request);
};

export const deleteDevice = async (deviceId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/devices/${deviceId}`);
};
