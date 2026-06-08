"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { WarningValues } from "@/schemas/admin/warning";

export const createWarning = async (request: WarningValues): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/warnings`, request);
};

export const updateWarning = async (warningId?: number, request?: WarningValues): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/warnings/${warningId}`, request);
};

export const deleteWarning = async (warningId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/warnings/${warningId}`);
};
