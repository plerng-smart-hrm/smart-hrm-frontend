"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteFingerPrint,
  enrollFingerPrint,
  IEnrollRequest,
} from "@/service/admin/finger-print.service";
import { fingerPrintKeys } from "@/service/util/query-keys/finger-print";

export const useMutateFingerPrint = (employeeId: number) => {
  const queryClient = useQueryClient();
  const listKey = `${fingerPrintKeys.list_finger_print}_employee_${employeeId}`;

  const enrollMutation = useMutation({
    mutationFn: (request: IEnrollRequest) => enrollFingerPrint(request),
    onSuccess: () => {
      toast.success("Device enrolled successfully");
      queryClient.invalidateQueries({ queryKey: [listKey] });
    },
    onError: () => {
      toast.error("Failed to enroll device");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFingerPrint(id),
    onSuccess: () => {
      toast.success("Enrollment removed");
      queryClient.invalidateQueries({ queryKey: [listKey] });
    },
    onError: () => {
      toast.error("Failed to remove enrollment");
    },
  });

  return {
    enroll: enrollMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    isEnrolling: enrollMutation.isPending,
    isRemoving: deleteMutation.isPending,
  };
};
