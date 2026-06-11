"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";

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

export const createLeaveRequest = async (request: ICreateLeaveRequestRequest): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/leave-requests`, request);
};

export const updateLeaveRequest = async (
  leaveRequestId?: number,
  request?: IUpdateLeaveRequestRequest,
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/leave-requests/${leaveRequestId}`, request);
};

export const deleteLeaveRequest = async (leaveRequestId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/leave-requests/${leaveRequestId}`);
};
