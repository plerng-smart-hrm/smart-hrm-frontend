"use client";

import { PayrollSettingValues } from "@/schemas/admin/payroll-setting";
import { updatePayrollSetting } from "@/service/admin/payroll-setting.service";
import { PayrollSettingKeys } from "@/service/util/query-keys/payroll-setting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "PayrollSetting";

export const useMutatePayrollSetting = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({
      payrollSettingId,
      request,
    }: {
      payrollSettingId?: number;
      request?: PayrollSettingValues;
    }) => {
      return await updatePayrollSetting(payrollSettingId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);
      queryClient.invalidateQueries({ queryKey: [PayrollSettingKeys.list_payroll_setting] });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    updatePayrollSetting: updateMutation.mutateAsync,
  };
};
