"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { TriggerAttendanceSummaryValues } from "@/schemas/admin/attendance-summary";
import { ITriggerAttendanceSummaryResponse } from "@/types/admin/attendance-summary";

export const triggerAttendanceSummary = async (request: TriggerAttendanceSummaryValues) => {
  const res = await api.post<IApiResponse<ITriggerAttendanceSummaryResponse>>(`/v1/attendance-summary/trigger`, request);
  return res.data;
};
