"use server";

import {
  IApiResponse,
  IHoliday,
  ILeaveRequest,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";

export interface ILeaveRequestsRes {
  leaveRequests?: ILeaveRequest[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface ILeaveRequestRes {
  leaveRequest?: ILeaveRequest;
}

export interface ICreateLeaveRequestRequest {
  employeeId?: number;
  leaveTypeId?: number;
  startDate?: string;
  endDate?: string;
  reason?: string;
  supportingDocUrl?: string;
  requestDate?: string;
}

export interface IUpdateLeaveRequestRequest {
  employeeId?: number;
  leaveTypeId?: number;
  startDate?: string;
  endDate?: string;
  reason?: string;
  supportingDocUrl?: string;
  requestDate?: string;
}

export const getAllLeaveRequests = async (
  pageIndex: number,
  pageSize?: number
): Promise<ILeaveRequestsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<ILeaveRequest[]>>(
    `/leave-request?page=${page}&limit=${pageSize}`
  );
  console.log("data", data.data);
  return {
    leaveRequests: data.data,
    pagination: data.pagination,
  };
};

export const getLeaveRequestList = async (): Promise<ILeaveRequestsRes> => {
  const data = await api.get<IApiResponse<ILeaveRequest[]>>(
    `/leave-request/list`
  );
  return {
    leaveRequests: data.data,
  };
};

export const getLeaveRequestById = async (
  leaveRequestId?: number
): Promise<ILeaveRequestRes> => {
  const data = await api.get<IApiResponse<ILeaveRequest>>(
    `/leave-request/${leaveRequestId}`
  );
  return {
    leaveRequest: data.data,
  };
};

export const createLeaveRequest = async (
  request: ICreateLeaveRequestRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/leave-request`, request);
};

export const updateLeaveRequest = async (
  leaveRequestId?: number,
  request?: IUpdateLeaveRequestRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/leave-request/${leaveRequestId}`,
    request
  );
};

export const deleteLeaveRequest = async (
  leaveRequestId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/leave-request/${leaveRequestId}`);
};
