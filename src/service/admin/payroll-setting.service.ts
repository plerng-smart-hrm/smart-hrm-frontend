"use server";

import { IApiResponse } from "@/types/admin";
import { PayrollSettingValues } from "@/schemas/admin/payroll-setting";
import { IPayrollSetting } from "@/types/admin/payroll-setting";
import { api } from "../util/api";

export const getPayrollSetting = async (): Promise<IApiResponse<IPayrollSetting>> => {
  return await api.get<IApiResponse<IPayrollSetting>>(`/v1/payroll-settings`);
};

export const updatePayrollSetting = async (id?: number, request?: PayrollSettingValues) => {
  return await api.patch(`/v1/payroll-settings/${id}`, request);
};
