"use client";

import {
  deleteAttendanceLog,
  IUpdateAttendanceLogRequest,
  updateAttendanceLog,
} from "@/service/admin/attendance-log.service";
import { queryKeys } from "@/service/util/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "AttendanceLog";

export const useMutateAttendanceLog = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({
      attendanceLogId,
      request,
    }: {
      attendanceLogId?: number;
      request?: IUpdateAttendanceLogRequest;
    }) => {
      return await updateAttendanceLog(attendanceLogId, request);
    },
    onSuccess: (_, variables) => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(variables.attendanceLogId),
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ attendanceLogId }: { attendanceLogId?: number }) => {
      return await deleteAttendanceLog(attendanceLogId);
    },
    onSuccess: (_, { attendanceLogId }) => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(attendanceLogId),
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
