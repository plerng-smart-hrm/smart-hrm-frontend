"use client";

import { WarningValues } from "@/schemas/admin/warning";
import { createWarning, deleteWarning, updateWarning } from "@/service/admin/warning.service";
import { warningKeys } from "@/service/util/query-keys/warning";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Warning";

export const useMutateWarning = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: WarningValues }) => {
      return await createWarning(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);
      queryClient.invalidateQueries({ queryKey: [warningKeys.list_warning] });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ warningId, request }: { warningId?: number; request?: WarningValues }) => {
      return await updateWarning(warningId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);
      queryClient.invalidateQueries({ queryKey: [warningKeys.list_warning] });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ warningId }: { warningId?: number }) => {
      return await deleteWarning(warningId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: [warningKeys.list_warning] });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    createWarning: createMutation.mutateAsync,
    updateWarning: updateMutation.mutateAsync,
    deleteWarning: deleteMutation.mutateAsync,
  };
};
