"use server";

import { IApiResponse, IHealthCheck, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IHealthChecksRes {
  healthChecks?: IHealthCheck[];
  pagination?: IPagination;
}

export interface IHealthCheckRes {
  healthCheck?: IHealthCheck;
}

export type ICreateHealthCheckRequest = IHealthCheck;

export type IUpdateHealthCheckRequest = IHealthCheck;

export const getAllHealthChecks = async (
  pageIndex: number,
  pageSize?: number
): Promise<IHealthChecksRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IHealthCheck[]>>(
    `/health-checks?page=${page}&limit=${pageSize}`
  );
  return {
    healthChecks: data.data,
    pagination: data.pagination,
  };
};

export const getAllHealthCheckByEmployeeId = async (
  employeeId: number
): Promise<IHealthChecksRes> => {
  const data = await api.get<IApiResponse<IHealthCheck[]>>(
    `/health-checks/employees/${employeeId}`
  );
  return {
    healthChecks: data.data,
  };
};

export const getHealthCheckById = async (
  healthCheckId?: number
): Promise<IHealthCheckRes> => {
  const data = await api.get<IApiResponse<IHealthCheck>>(
    `/health-checks/${healthCheckId}`
  );
  return {
    healthCheck: data.data,
  };
};

export const createHealthCheck = async (
  request: ICreateHealthCheckRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/health-checks`, request);
};

export const updateHealthCheck = async (
  healthCheckId?: number,
  request?: IUpdateHealthCheckRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/health-checks/${healthCheckId}`,
    request
  );
};

export const deleteHealthCheck = async (
  healthCheckId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/health-checks/${healthCheckId}`);
};
