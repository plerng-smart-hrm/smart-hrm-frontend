"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { AttAdjustmentValues } from "@/schemas/admin/att-adjustment";
import { IAttAdjustment } from "@/types/admin/att-adjustment";

export const createAttAdjustment = async (request: AttAdjustmentValues) => {
  return await api.post<IApiResponse<IAttAdjustment>>(`/v1/att-adjustments`, request);
};

export const updateAttAdjustment = async (contractId?: number, request?: AttAdjustmentValues) => {
  await api.patch<IApiResponse<IAttAdjustment>>(`/v1/att-adjustments/${contractId}`, request);
};

export const deleteAttAdjustment = async (contractId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/att-adjustments/${contractId}`);
};
