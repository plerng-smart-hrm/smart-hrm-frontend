"use client";

import {
  createMaternity,
  deleteMaternity,
  ICreateMaternityRequest,
  IUpdateMaternityRequest,
  updateMaternity,
} from "@/service/admin/maternity.service";
import { maternityCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Maternity";

export const useMutateMaternity = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateMaternityRequest }) => {
      return await createMaternity(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      maternityCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      maternityId,
      request,
    }: {
      maternityId?: number;
      request?: IUpdateMaternityRequest;
    }) => {
      return await updateMaternity(maternityId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      maternityCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ maternityId }: { maternityId?: number }) => {
      return await deleteMaternity(maternityId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      maternityCache.clearAll(queryClient);
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
