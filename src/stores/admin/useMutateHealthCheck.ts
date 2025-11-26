"use client";

import {
  createHealthCheck,
  deleteHealthCheck,
  ICreateHealthCheckRequest,
  IUpdateHealthCheckRequest,
  updateHealthCheck,
} from "@/service/admin/health-check.service";
import { healthCheckCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "HealthCheck";

export const useMutateHealthCheck = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateHealthCheckRequest }) => {
      return await createHealthCheck(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      healthCheckCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      healthCheckId,
      request,
    }: {
      healthCheckId?: number;
      request?: IUpdateHealthCheckRequest;
    }) => {
      return await updateHealthCheck(healthCheckId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      healthCheckCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ healthCheckId }: { healthCheckId?: number }) => {
      return await deleteHealthCheck(healthCheckId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      healthCheckCache.clearAll(queryClient);
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
