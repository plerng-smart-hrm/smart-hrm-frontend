"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { RunPayrollValues } from "@/schemas/admin/payroll";

export const payrollSalaryAdvance = async (request: RunPayrollValues) => {
  return await api.post<IApiResponse<void>>(`/v1/payrolls/salary-advance/bulk`, request);
};

export const payrollSalaryBalance = async (request: RunPayrollValues) => {
  return await api.post<IApiResponse<void>>(`/v1/payrolls/salary-balance/bulk`, request);
};
