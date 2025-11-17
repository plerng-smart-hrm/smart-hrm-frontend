"use client";

import {
  createLeaveType,
  deleteLeaveType,
  ICreateLeaveTypeRequest,
  IUpdateLeaveTypeRequest,
  updateLeaveType,
} from "@/service/admin/leave-types.service";
import { leaveTypeCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "LeaveType";

export const useMutateLeaveType = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateLeaveTypeRequest }) => {
      return await createLeaveType(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      leaveTypeCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      leaveTypeId,
      request,
    }: {
      leaveTypeId?: number;
      request?: IUpdateLeaveTypeRequest;
    }) => {
      return await updateLeaveType(leaveTypeId, request);
    },
    onSuccess: (_, variables) => {
      toast.success(`${RESOURCE} updated successfully`);

      leaveTypeCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ leaveTypeId }: { leaveTypeId?: number }) => {
      return await deleteLeaveType(leaveTypeId);
    },
    onSuccess: (_) => {
      toast.success(`${RESOURCE} deleted successfully`);

      leaveTypeCache.clearAll(queryClient);
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
