"use client";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { ContractValues, RenewContractValues } from "@/schemas/admin/contract";
import { axiosClient, axiosGatewayClient } from "../util/axios-client";
import { extractFileName } from "../util/extract-file-name";

export interface IGenerateWordPayload {
  file_url: string;
  context: Record<string, any[]>;
}

export const createContract = async (request: ContractValues): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/contracts`, request);
};

export const updateContract = async (contractId?: number, request?: ContractValues): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/contracts/${contractId}`, request);
};

export const deleteContract = async (contractId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/contracts/${contractId}`);
};

export const renewContract = async (contractId?: number, request?: RenewContractValues): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/contracts/${contractId}/renew`, request);
};

export const generateFile = async (request: IGenerateWordPayload, signal?: AbortSignal) => {
  const response = await axiosGatewayClient.post("/v1/document/generate?option=pdf", request, {
    responseType: "arraybuffer",
    signal,
  });

  const fileName = extractFileName(response.headers["content-disposition"] ?? null);

  return { buffer: response.data as ArrayBuffer, fileName };
};

export const generateContractData = async (id?: number, signal?: AbortSignal) => {
  return await axiosClient.get<IApiResponse<any>>(`/v1/contracts/generate/${id}`, { signal });
};
