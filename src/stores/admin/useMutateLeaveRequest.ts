"use client";

import {
  createLeaveRequest,
  deleteLeaveRequest,
  ICreateLeaveRequestRequest,
  IUpdateLeaveRequestRequest,
  updateLeaveRequest,
} from "@/service/admin/leave-requests.service";
import { leaveRequestCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "LeaveRequest";

export const useMutateLeaveRequest = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({
      request,
    }: {
      request: ICreateLeaveRequestRequest;
    }) => {
      return await createLeaveRequest(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      leaveRequestCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      leaveRequestId,
      request,
    }: {
      leaveRequestId?: number;
      request?: IUpdateLeaveRequestRequest;
    }) => {
      return await updateLeaveRequest(leaveRequestId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      leaveRequestCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ leaveRequestId }: { leaveRequestId?: number }) => {
      return await deleteLeaveRequest(leaveRequestId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      leaveRequestCache.clearAll(queryClient);
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
