"use client";

import {
  deleteAttendanceSummary,
  IUpdateAttendanceSummaryRequest,
  updateAttendanceSummary,
} from "@/service/admin/attendance-summary.service";
import { queryKeys } from "@/service/util/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Attendance summary";

export const useMutateAttendanceSummary = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({
      attendanceSummaryId,
      request,
    }: {
      attendanceSummaryId?: number;
      request?: IUpdateAttendanceSummaryRequest;
    }) => {
      return await updateAttendanceSummary(attendanceSummaryId, request);
    },
    onSuccess: (_, variables) => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(variables.attendanceSummaryId),
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({
      attendanceSummaryId,
    }: {
      attendanceSummaryId?: number;
    }) => {
      return await deleteAttendanceSummary(attendanceSummaryId);
    },
    onSuccess: (_, { attendanceSummaryId }) => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(attendanceSummaryId),
      });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
  };
};
