"use client";

import { useState } from "react";
import { PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { RenderView, Section } from "@/components/shared/view/RenderView";
import SharedSheet from "@/components/shared/SharedSheet";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { PayrollSettingKeys } from "@/service/util/query-keys/payroll-setting";
import { IPayrollSetting } from "@/types/admin/payroll-setting";
import PayrollSettingForm from "./form/PayrollSettingForm";

const PayrollClient = () => {
  const [editOpen, setEditOpen] = useState(false);

  const { data, isFetching } = useQueryShared({
    url: `/v1/payroll-settings/current`,
    key: PayrollSettingKeys.list_payroll_setting,
  });

  const setting = data?.data as IPayrollSetting | undefined;

  const formatRate = (v?: number) => (v !== undefined ? `${(v * 100).toFixed(2)}%` : "—");
  const formatNum = (v?: number) => (v !== undefined ? String(v) : "—");

  return (
    <div className="relative max-w-2xl">
      <LoadingOverlay isLoading={isFetching} />

      <SharedSheet
        open={editOpen}
        setOpen={setEditOpen}
        title="Edit Payroll Setting"
        width="34rem"
      >
        <PayrollSettingForm
          initialData={setting}
          onSuccess={() => setEditOpen(false)}
        />
      </SharedSheet>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Payroll Configuration</h2>
        <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
          <PenIcon className="h-3.5 w-3.5 mr-1.5" />
          Edit
        </Button>
      </div>

      <Section title="General">
        <RenderView
          className="grid grid-cols-2 gap-y-5"
          fields={[
            {
              label: "Standard Working Days",
              value: formatNum(setting?.standardWorkingDays),
            },
            {
              label: "Standard Working Hours / Day",
              value: formatNum(setting?.standardWorkingHoursPerDay),
            },
            {
              label: "NSSF Pension Rate (Employer)",
              value: formatRate(setting?.nssfPensionRateEmployer),
            },
            {
              label: "Half Month Pay Method",
              value: setting?.halfMonthPayMethod ?? "—",
            },
            ...(setting?.halfMonthPayMethod === "FIXED_AMOUNT"
              ? [{ label: "Fixed Half Pay Amount", value: setting?.fixedHalfPayAmount !== undefined ? `$${setting.fixedHalfPayAmount}` : "—" }]
              : []),
          ]}
        />
      </Section>
    </div>
  );
};

export default PayrollClient;
