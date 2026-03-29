"use client";

import { DeviceValues } from "@/schemas/admin/device";
import {
  createDevice,
  deleteDevice,
  ICreateDeviceRequest,
  IUpdateDeviceRequest,
  syncAllDevices,
  updateDevice,
} from "@/service/admin/device.service";
import { deviceKeys } from "@/service/util/query-keys/device";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Device";

export const useMutateDevice = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: DeviceValues }) => {
      return await createDevice(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);
      queryClient.invalidateQueries({
        queryKey: [deviceKeys.list_device],
      });
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
      queryClient.invalidateQueries({
        queryKey: [deviceKeys.list_device],
      });
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
      request?: DeviceValues;
    }) => {
      return await updateDevice(deviceId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({
        queryKey: [deviceKeys.list_device],
      });
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

      queryClient.invalidateQueries({
        queryKey: [deviceKeys.list_device],
      });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    createDevice: createMutation.mutateAsync,
    updateDevice: updateMutation.mutateAsync,
    deleteDevice: deleteMutation.mutateAsync,
    syncDevice: syncAllDevicesMutation.mutateAsync,
  };
};
