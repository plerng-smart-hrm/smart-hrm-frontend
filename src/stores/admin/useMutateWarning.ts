"use client";

import {
  createWarning,
  deleteWarning,
  ICreateWarningRequest,
  IUpdateWarningRequest,
  updateWarning,
} from "@/service/admin/warning.service";
import { warningCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Warning";

export const useMutateWarning = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateWarningRequest }) => {
      return await createWarning(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      warningCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      warningId,
      request,
    }: {
      warningId?: number;
      request?: IUpdateWarningRequest;
    }) => {
      return await updateWarning(warningId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      warningCache.clearAll(queryClient);
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

      warningCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
  };
};
