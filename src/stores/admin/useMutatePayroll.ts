"use client";

import { PayrollRequest, RunPayrollValues } from "@/schemas/admin/payroll";
import { payrollFirstPayment, payrollSecondPayment } from "@/service/admin/payroll.service";
import { payrollKeys } from "@/service/util/query-keys/payroll";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Payroll";

export const useMutatePayroll = () => {
  const queryClient = useQueryClient();

  const payrollFirstPaymentMutation = useMutation({
    mutationFn: async ({ request }: { request: PayrollRequest }) => {
      return await payrollFirstPayment(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} first payment successfully`);

      queryClient.invalidateQueries({
        queryKey: [payrollKeys.list_payroll],
      });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const payrollSecondPaymentMutation = useMutation({
    mutationFn: async ({ request }: { request: PayrollRequest }) => {
      return await payrollSecondPayment(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} second payment successfully`);

      queryClient.invalidateQueries({
        queryKey: [payrollKeys.list_payroll],
      });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    payrollFirstPayment: payrollFirstPaymentMutation.mutateAsync,
    payrollSecondPayment: payrollSecondPaymentMutation.mutateAsync,
  };
};
