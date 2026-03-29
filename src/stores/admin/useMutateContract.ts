"use client";

import { ContractValues } from "@/schemas/admin/contract";
import {
  createContract,
  deleteContract,
  ICreateContractRequest,
  IUpdateContractRequest,
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

  return {
    createContract: createMutation.mutateAsync,
    updateContract: updateMutation.mutateAsync,
    deleteContract: deleteMutation.mutateAsync,
  };
};
