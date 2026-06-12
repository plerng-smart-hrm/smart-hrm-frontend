"use client";

import { generateExcel, getPayrollReportDetail } from "@/service/admin/payroll-report.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RESOURCE = "PayrollReport";

export const useMutatePayrollReport = () => {
  const queryClient = useQueryClient();

  const downloadPayrollReportExcelMutation = useMutation({
    mutationFn: async ({ id, signal }: { id?: number; signal?: AbortSignal }) => {
      try {
        const res = await getPayrollReportDetail(id, signal);

        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        const data = res.data.data;
        const { buffer } = await generateExcel(
          {
            fileUrl: data?.fileUrl,
            fileName: data?.fileName,
            sheets: data?.sheets,
          },
          signal,
        );

        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data?.fileName || "payroll-report.xlsx";
        a.click();

        URL.revokeObjectURL(url);

        return res;
      } catch (error: any) {
        if (error?.name === "AbortError" || error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
          throw new Error("DOWNLOAD_CANCELLED");
        }

        throw error;
      }
    },
  });

  return {
    downloadPayrollReportExcel: downloadPayrollReportExcelMutation.mutateAsync,
    isDownloading: downloadPayrollReportExcelMutation.isPending,
  };
};
