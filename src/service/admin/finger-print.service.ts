"use server";

import { IApiResponse } from "@/types/admin";
import { IFingerPrint } from "@/types/admin/finger-print";
import { api } from "../util/api";

export interface IEnrollRequest {
  employeeId: number;
  deviceId: number;
  role?: number;
  password?: string;
}

export interface IDistributeResult {
  ip: string;
  port: number;
  success: boolean;
  error?: string;
}

export interface IDistributeResponse {
  templatesFound: number;
  results: IDistributeResult[];
}

export const enrollFingerPrint = async (request: IEnrollRequest): Promise<IFingerPrint> => {
  const data = await api.post<IApiResponse<IFingerPrint>>(`/finger-prints`, request);
  return data.data!;
};

export const distributeFingerPrint = async (
  id: number,
  deviceIds: number[],
): Promise<IDistributeResponse> => {
  const data = await api.post<IApiResponse<IDistributeResponse>>(
    `/finger-prints/${id}/distribute`,
    { deviceIds },
  );
  return data.data!;
};

export const deleteFingerPrint = async (id: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/finger-prints/${id}`);
};
