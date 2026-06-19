"use client";

import { ContractValues, RenewContractValues } from "@/schemas/admin/contract";
import {
  createContract,
  deleteContract,
  generateContractData,
  generateFile,
  renewContract,
  updateContract,
} from "@/service/admin/contracts.service";
import { contractKeys } from "@/service/util/query-keys/contract";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Contract";

export const useMutateContract = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ContractValues }) => {
      return await createContract(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      queryClient.invalidateQueries({ queryKey: [contractKeys.list_contract] });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ contractId, request }: { contractId?: number; request?: ContractValues }) => {
      return await updateContract(contractId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: [contractKeys.list_contract] });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const renewMutation = useMutation({
    mutationFn: async ({ contractId, request }: { contractId?: number; request?: RenewContractValues }) => {
      return await renewContract(contractId, request);
    },
    onSuccess: (_, { contractId }) => {
      toast.success(`${RESOURCE} renewed successfully`);

      queryClient.invalidateQueries({
        queryKey: [`${contractKeys.list_contract}_${contractId}`],
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ contractId }: { contractId?: number }) => {
      return await deleteContract(contractId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: [contractKeys.list_contract] });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  const downloadContractMutation = useMutation({
    mutationFn: async ({ id, signal }: { id?: number; signal?: AbortSignal }) => {
      try {
        const res = await generateContractData(id, signal);

        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }
        const data = res.data.data;
        const { buffer, fileName } = await generateFile(
          {
            file_url: data?.file_url,
            context: data,
          },
          signal,
        );

        const blob = new Blob([buffer], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;

        // Force PDF extension

        const downloadName = (fileName || data?.fileName || "contract").replace(/\.[^.]+$/, "") + ".pdf";
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      } catch (error: any) {
        if (error?.name === "AbortError" || error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
          throw new Error("DOWNLOAD_CANCELLED");
        }

        throw error;
      }
    },
  });

  return {
    createContract: createMutation.mutateAsync,
    updateContract: updateMutation.mutateAsync,
    renewContract: renewMutation.mutateAsync,
    deleteContract: deleteMutation.mutateAsync,
    downloadContract: downloadContractMutation.mutateAsync,
  };
};
