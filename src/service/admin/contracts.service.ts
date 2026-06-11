"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { ContractValues, RenewContractValues } from "@/schemas/admin/contract";

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
