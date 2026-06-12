"use client";

import { generateExcel, getPayrollReportDetail } from "@/service/admin/payroll-report.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
        const { buffer, fileName } = await generateExcel(
          {
            fileUrl: data?.fileUrl,
            fileName: "proposal-export",
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
        a.download = fileName;
        a.click();

        URL.revokeObjectURL(url);

        return res;
      } catch (error: any) {
        if (
          error?.name === "AbortError" ||
          error?.name === "CanceledError" ||
          error?.code === "ERR_CANCELED"
        ) {
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
