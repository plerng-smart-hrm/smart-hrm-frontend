"use client";

import { IApiResponse } from "@/types/admin";
import { axiosClient, axiosGatewayClient } from "../util/axios-client";
import { extractFileName } from "../util/extract-file-name";

export interface IGenerateExcelPayload {
  fileName: string;
  fileUrl: string;
  sheets: {
    sheetIndex: number;
    sheetName: string;
    data: Record<string, any[]>;
  }[];
}

export const generateExcel = async (request: IGenerateExcelPayload, signal?: AbortSignal) => {
  const response = await axiosGatewayClient.post("/v1/excel/generate", request, {
    responseType: "arraybuffer",
    signal,
  });

  const fileName = extractFileName(response.headers["content-disposition"] ?? null);

  return { buffer: response.data as ArrayBuffer, fileName };
};

export const getPayrollReportDetail = async (id?: number, signal?: AbortSignal) => {
  const url = `/v1/payroll-reports/${id}/detail`;
  return await axiosClient.get<IApiResponse<any>>(url, { signal });
};
