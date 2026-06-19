"use client";

import { getDetailAttWithPayroll } from "@/service/admin/att-summary.service";
import { generateFile } from "@/service/admin/contracts.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "AttSummary";

export const useMutateAttSummary = () => {
  const queryClient = useQueryClient();

  const downloadAttSummaryMutation = useMutation({
    mutationFn: async ({ id, payrollMonth, signal }: { id?: number; payrollMonth?: string; signal?: AbortSignal }) => {
      try {
        const res = await getDetailAttWithPayroll(id, payrollMonth, signal);

        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        const data = res.data.data;
        const { buffer } = await generateFile(
          {
            file_url: data?.file_url,
            context: data,
          },
          signal,
        );

        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        const blob = new Blob([buffer], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data?.fileName || "attSummary.pdf";
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
    downloadAttSummary: downloadAttSummaryMutation.mutateAsync,
  };
};
