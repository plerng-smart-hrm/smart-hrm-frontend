"use client";

import { TerminationValues } from "@/schemas/admin/termination";
import { createTermination, deleteTermination, updateTermination } from "@/service/admin/termination.service";
import { terminationKeys } from "@/service/util/query-keys/termination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Termination";

export const useMutateTermination = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: TerminationValues }) => {
      return await createTermination(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      queryClient.invalidateQueries({ queryKey: [terminationKeys.list_termination] });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ terminationId, request }: { terminationId?: number; request?: TerminationValues }) => {
      return await updateTermination(terminationId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: [terminationKeys.list_termination] });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ terminationId }: { terminationId?: number }) => {
      return await deleteTermination(terminationId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: [terminationKeys.list_termination] });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    createTermination: createMutation.mutateAsync,
    updateTermination: updateMutation.mutateAsync,
    deleteTermination: deleteMutation.mutateAsync,
  };
};
