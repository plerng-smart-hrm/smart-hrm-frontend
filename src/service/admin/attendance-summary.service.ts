"use server";

import {
  IApiResponse,
  IAttendanceLog,
  IAttendanceSummary,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";

export interface IAttendanceSummariesRes {
  attendanceSummaries?: IAttendanceSummary[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IAttendanceSummaryRes {
  attendanceSummary?: IAttendanceSummary;
}

export type IUpdateAttendanceSummaryRequest = IAttendanceSummary;

export const getAllAttendanceSummaries = async (
  pageIndex: number,
  pageSize?: number
): Promise<IAttendanceSummariesRes> => {
  const page = pageIndex + 1;

  const data = await api.get<IApiResponse<IAttendanceLog[]>>(
    `/attendance-summary?page=${page}&limit=${pageSize}`
  );

  return {
    attendanceSummaries: data.data,
    pagination: data.pagination,
  };
};

export const getAttendanceSummaryById = async (
  attendanceSummaryId?: number
): Promise<IAttendanceSummaryRes> => {
  const data = await api.get<IApiResponse<IAttendanceSummary>>(
    `/attendance-summary/${attendanceSummaryId}`
  );
  return {
    attendanceSummary: data.data,
  };
};

export const updateAttendanceSummary = async (
  attendanceSummaryId?: number,
  request?: IUpdateAttendanceSummaryRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/attendance-summary/${attendanceSummaryId}`,
    request
  );
};

export const deleteAttendanceSummary = async (
  attendanceSummaryId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(
    `/attendance-summary/${attendanceSummaryId}`
  );
};
