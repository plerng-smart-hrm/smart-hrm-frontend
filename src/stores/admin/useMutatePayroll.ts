"use client";

import { RunPayrollValues } from "@/schemas/admin/payroll";
import { payrollSalaryAdvance, payrollSalaryBalance } from "@/service/admin/payroll.service";
import { payrollKeys } from "@/service/util/query-keys/payroll";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Payroll";

export const useMutatePayroll = () => {
  const queryClient = useQueryClient();

  const payrollSalaryAdvanceMutation = useMutation({
    mutationFn: async ({ request }: { request: RunPayrollValues }) => {
      return await payrollSalaryAdvance(request);
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

  const payrollSalaryBalanceMutation = useMutation({
    mutationFn: async ({ request }: { request: RunPayrollValues }) => {
      return await payrollSalaryBalance(request);
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
    payrollSalaryAdvance: payrollSalaryAdvanceMutation.mutateAsync,
    payrollSalaryBalance: payrollSalaryBalanceMutation.mutateAsync,
  };
};
