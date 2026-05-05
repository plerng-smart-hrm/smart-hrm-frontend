"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { PayrollRequest, RunPayrollValues } from "@/schemas/admin/payroll";

export const payrollFirstPayment = async (request: PayrollRequest) => {
  return await api.post<IApiResponse<void>>(`/v1/payrolls/first-payment/bulk`, request);
};

export const payrollSecondPayment = async (request: PayrollRequest) => {
  return await api.post<IApiResponse<void>>(`/v1/payrolls/second-payment/bulk`, request);
};
