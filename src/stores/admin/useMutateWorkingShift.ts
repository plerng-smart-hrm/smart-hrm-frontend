"use client";

import { WorkingShiftValues } from "@/schemas/admin/working-shift";
import {
  createWorkingShift,
  deleteWorkingShift,
  updateWorkingShift,
} from "@/service/admin/working-shifts.service";
import { workingShiftCache } from "@/service/util/query-cache/working-shift";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Working shift";

export const useMutateWorkingShift = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({
      request,
    }: {
      request: WorkingShiftValues;
    }) => {
      return await createWorkingShift(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      workingShiftCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      workingShiftId,
      request,
    }: {
      workingShiftId?: number;
      request?: WorkingShiftValues;
    }) => {
      return await updateWorkingShift(workingShiftId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      workingShiftCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ workingShiftId }: { workingShiftId?: number }) => {
      return await deleteWorkingShift(workingShiftId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      workingShiftCache.clearAll(queryClient);
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
