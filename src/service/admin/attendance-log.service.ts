"use server";

import {
  IApiResponse,
  IAttendanceLog,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";

export interface IAttendanceLogsRes {
  attendanceLogs?: IAttendanceLog[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IAttendanceLogRes {
  attendanceLog?: IAttendanceLog;
}

export type IUpdateAttendanceLogRequest = IAttendanceLog;

export const getAllAttendanceLogs = async (
  pageIndex: number,
  pageSize?: number,
  startDateTime?: string,
  endDateTime?: string
): Promise<IAttendanceLogsRes> => {
  const page = pageIndex + 1;
  let data;
  if (startDateTime && endDateTime) {
    data = await api.get<IApiResponse<IAttendanceLog[]>>(
      `/attendance-logs?page=${page}&limit=${pageSize}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
    );
  } else {
    data = await api.get<IApiResponse<IAttendanceLog[]>>(
      `/attendance-logs?page=${page}&limit=${pageSize}`
    );
  }

  return {
    attendanceLogs: data.data,
    pagination: data.pagination,
  };
};

export const getAttendanceLogById = async (
  attendanceLogId?: number
): Promise<IAttendanceLogRes> => {
  const data = await api.get<IApiResponse<IAttendanceLog>>(
    `/categories/${attendanceLogId}`
  );
  return {
    attendanceLog: data.data,
  };
};

export const updateAttendanceLog = async (
  attendanceLogId?: number,
  request?: IUpdateAttendanceLogRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/attendance-logs/${attendanceLogId}`,
    request
  );
};

export const deleteAttendanceLog = async (
  attendanceLogId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/attendance-logs/${attendanceLogId}`);
};
