"use client";

import { AttAdjustmentValues } from "@/schemas/admin/att-adjustment";
import { createAttAdjustment, deleteAttAdjustment, updateAttAdjustment } from "@/service/admin/att-adjustment.service";
import { attAdjustmentKeys } from "@/service/util/query-keys/att-adjustment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Attendance adjustment";

export const useMutateAttAdjustment = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: AttAdjustmentValues }) => {
      return await createAttAdjustment(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      queryClient.invalidateQueries({ queryKey: [attAdjustmentKeys.list_att_adjustment] });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, request }: { id?: number; request?: AttAdjustmentValues }) => {
      return await updateAttAdjustment(id, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: [attAdjustmentKeys.list_att_adjustment] });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id?: number }) => {
      return await deleteAttAdjustment(id);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: [attAdjustmentKeys.list_att_adjustment] });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    createAttAdjustment: createMutation.mutateAsync,
    updateAttAdjustment: updateMutation.mutateAsync,
    deleteAttAdjustment: deleteMutation.mutateAsync,
  };
};
