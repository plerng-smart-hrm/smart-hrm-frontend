"use server";

import { IApiResponse, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";
import { ContractValues } from "@/schemas/admin/contract";
import { IContract } from "@/types/admin/contract";

export interface IContractsRes {
  contracts?: IContract[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IContractRes {
  contract?: IContract;
}

export interface ICreateContractRequest {
  employeeId: number;
  contractTypeId: number;
  startDate: string;
  endDate: string;
  baseSalary: number;
  contractDetail: string;
  isExpired: boolean;
}

export interface IUpdateContractRequest {
  employeeId?: number;
  contractTypeId?: number;
  startDate?: string;
  endDate?: string;
  baseSalary?: number;
  contractDetail?: string;
  isExpired?: boolean;
}

export const getAllContracts = async (pageIndex: number, pageSize?: number): Promise<IContractsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IContract[]>>(`/v1/contracts?page=${page}&limit=${pageSize}`);
  return {
    contracts: data.data,
    pagination: data.pagination,
  };
};

export const getContractById = async (contractId?: number): Promise<IContractRes> => {
  const data = await api.get<IApiResponse<IContract>>(`/v1/contracts/${contractId}`);
  return {
    contract: data.data,
  };
};

export const createContract = async (request: ContractValues): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/contracts`, request);
};

export const updateContract = async (contractId?: number, request?: ContractValues): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/contracts/${contractId}`, request);
};

export const deleteContract = async (contractId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/contracts/${contractId}`);
};
