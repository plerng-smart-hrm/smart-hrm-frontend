"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { TriggerAttendanceSummaryValues } from "@/schemas/admin/attendance-summary";
import { IEmployeeAttendanceSummary, ITriggerAttendanceSummaryResponse } from "@/types/admin/attendance-summary";

export const getSummaryByEmployeeId = async (empCode?: string, yearMonth?: string) => {
  const params = new URLSearchParams();
  if (empCode) params.append("empCode", empCode);
  if (yearMonth) params.append("yearMonth", yearMonth);
  return await api.get<IApiResponse<IEmployeeAttendanceSummary>>(`/v1/attendance-summary/employee`, { params });
}

export const triggerAttendanceSummary = async (request: TriggerAttendanceSummaryValues) => {
  const res = await api.post<IApiResponse<ITriggerAttendanceSummaryResponse>>(`/v1/attendance-summary/trigger`, request);
  return res.data;
};
