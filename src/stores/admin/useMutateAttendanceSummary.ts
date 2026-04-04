"use client";

import { TriggerAttendanceSummaryValues } from "@/schemas/admin/attendance-summary";
import { triggerAttendanceSummary } from "@/service/admin/attendance-summary.service";
import { attendanceSummaryKeys } from "@/service/util/query-keys/attendance-summary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Attendance summary";

export const useMutateAttendanceSummary = () => {
  const queryClient = useQueryClient();

  const triggerMutation = useMutation({
    mutationFn: async ({ request }: { request: TriggerAttendanceSummaryValues }) => {
      return await triggerAttendanceSummary(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} trigger successfully`);

      queryClient.invalidateQueries({ queryKey: [attendanceSummaryKeys.list_attendance_summary] });
    },
    onError: () => {
      toast.error(`Failed to trigger ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    triggerAttendanceSummary: triggerMutation.mutateAsync,
  };
};
