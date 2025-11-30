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
  pageSize?: number,
  startDateTime?: string,
  endDateTime?: string
): Promise<IAttendanceSummariesRes> => {
  const page = pageIndex + 1;
  let data;
  if (startDateTime && endDateTime) {
    data = await api.get<IApiResponse<IAttendanceLog[]>>(
      `/attendance-summaries?page=${page}&limit=${pageSize}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
    );
  } else {
    data = await api.get<IApiResponse<IAttendanceLog[]>>(
      `/attendance-summaries?page=${page}&limit=${pageSize}`
    );
  }

  return {
    attendanceSummaries: data.data,
    pagination: data.pagination,
  };
};

export const getAttendanceLogById = async (
  attendanceLogId?: number
): Promise<IAttendanceSummaryRes> => {
  const data = await api.get<IApiResponse<IAttendanceLog>>(
    `/categories/${attendanceLogId}`
  );
  return {
    attendanceSummary: data.data,
  };
};

export const updateAttendanceLog = async (
  attendanceSummaryId?: number,
  request?: IUpdateAttendanceSummaryRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/attendance-summaries/${attendanceSummaryId}`,
    request
  );
};

export const deleteAttendanceLog = async (
  attendanceSummaryId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(
    `/attendance-summaries/${attendanceSummaryId}`
  );
};
