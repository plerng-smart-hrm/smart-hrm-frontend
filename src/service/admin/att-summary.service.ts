"use client";

import { IApiResponse } from "@/types/admin";
import { axiosClient } from "../util/axios-client";


export const getDetailAttWithPayroll = async (id?: number, payrollMonth?: string, signal?: AbortSignal) => {
  return await axiosClient.get<IApiResponse<any>>(
    `/v1/att-summaries/employee/payroll?employeeId=${id}&payrollMonth=${payrollMonth}`,
    { signal },
  );
};
