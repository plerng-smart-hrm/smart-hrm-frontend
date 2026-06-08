"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { payrollSettingSchema, PayrollSettingValues } from "@/schemas/admin/payroll-setting";
import { useMutatePayrollSetting } from "@/stores/admin/useMutatePayrollSetting";
import { IPayrollSetting } from "@/types/admin/payroll-setting";
import { getPayrollSettingValues, payrollSettingFields } from "./payrollSettingFields";

interface Props {
  initialData?: IPayrollSetting;
  onSuccess?: () => void;
}

export default function PayrollSettingForm({ initialData, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { updatePayrollSetting } = useMutatePayrollSetting();

  const form = useForm<PayrollSettingValues>({
    resolver: zodResolver(payrollSettingSchema),
    defaultValues: getPayrollSettingValues(initialData),
  });

  useEffect(() => {
    if (initialData) {
      form.reset(getPayrollSettingValues(initialData));
    }
  }, [initialData]);

  const halfMonthPayMethod = form.watch("halfMonthPayMethod");
  const isFixedAmount = halfMonthPayMethod === "FIXED_AMOUNT";

  const visibleFields = payrollSettingFields.filter(
    (f) => f.key !== "fixedHalfPayAmount" || isFixedAmount,
  );

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({ fields: visibleFields, errors: form.formState.errors });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    await updatePayrollSetting(
      { payrollSettingId: values.id ?? initialData?.id, request: values },
      {
        onSuccess: () => onSuccess?.(),
        onSettled: () => setIsLoading(false),
      },
    );
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-4 pb-20">
        {visibleFields.map((item) => (
          <FormField
            key={item.key}
            control={form.control as any}
            name={item.key as keyof PayrollSettingValues}
            render={(field) => <RenderField form={{ ...item, field }} />}
          />
        ))}
      </div>

      <ActionButton
        setOpen={() => onSuccess?.()}
        handleSubmit={handleSubmit}
        submitTitle="Save Changes"
        isLoading={isLoading}
        disable={isLoading}
      />
    </Form>
  );
}
