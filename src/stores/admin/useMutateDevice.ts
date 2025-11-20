"use client";

import {
  createDevice,
  deleteDevice,
  ICreateDeviceRequest,
  IUpdateDeviceRequest,
  syncAllDevices,
  updateDevice,
} from "@/service/admin/device.service";
import { deviceCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Device";

export const useMutateDevice = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateDeviceRequest }) => {
      return await createDevice(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      deviceCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });
  const syncAllDevicesMutation = useMutation({
    mutationFn: async () => {
      return await syncAllDevices();
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} sync successfully`);
    },
    onError: () => {
      toast.error(`Failed to sync ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      deviceId,
      request,
    }: {
      deviceId?: number;
      request?: IUpdateDeviceRequest;
    }) => {
      return await updateDevice(deviceId, request);
    },
    onSuccess: (_, { deviceId }) => {
      toast.success(`${RESOURCE} updated successfully`);

      deviceCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ deviceId }: { deviceId?: number }) => {
      return await deleteDevice(deviceId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      deviceCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    sync: syncAllDevicesMutation.mutateAsync,
  };
};
