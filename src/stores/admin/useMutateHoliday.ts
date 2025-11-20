"use client";

import {
  createHoliday,
  deleteHoliday,
  ICreateHolidayRequest,
  IUpdateHolidayRequest,
  updateHoliday,
} from "@/service/admin/holiday.service";
import { holidayCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Holiday";

export const useMutateHoliday = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateHolidayRequest }) => {
      return await createHoliday(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      holidayCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      holidayId,
      request,
    }: {
      holidayId?: number;
      request?: IUpdateHolidayRequest;
    }) => {
      return await updateHoliday(holidayId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      holidayCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ holidayId }: { holidayId?: number }) => {
      return await deleteHoliday(holidayId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      holidayCache.clearAll(queryClient);
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
