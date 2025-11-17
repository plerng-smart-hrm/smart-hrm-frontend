"use server";

import { IApiResponse, ICompany, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface ICompaniesRes {
  companies?: ICompany[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface ICompanyRes {
  company?: ICompany;
}

export interface ICreateCompanyRequest {
  employeeId: number;
  companyTypeId: number;
  startDate: string;
  endDate: string;
  baseSalary: number;
  companyDetail: string;
  isExpired: boolean;
}

export interface IUpdateCompanyRequest {
  employeeId?: number;
  companyTypeId?: number;
  startDate?: string;
  endDate?: string;
  baseSalary?: number;
  companyDetail?: string;
  isExpired?: boolean;
}

export const getAllCompanies = async (
  pageIndex: number,
  pageSize?: number
): Promise<ICompaniesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<ICompany[]>>(
    `/companies?page=${page}&limit=${pageSize}`
  );
  return {
    companies: data.data,
    pagination: data.pagination,
  };
};

export const getCompanyById = async (
  companyId?: number
): Promise<ICompanyRes> => {
  const data = await api.get<IApiResponse<ICompany>>(`/companies/${companyId}`);
  return {
    company: data.data,
  };
};

export const createCompany = async (
  request: ICreateCompanyRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/companies`, request);
};

export const updateCompany = async (
  companyId?: number,
  request?: IUpdateCompanyRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/companies/${companyId}`, request);
};

export const deleteCompany = async (companyId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/companies/${companyId}`);
};
