"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import ActionButton from "@/components/shared/button/ActionButton";
import { RenderFields } from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import { runPayrollFields, getRunPayrollValues } from "./payrollFormFields";
import { runPayrollSchema, RunPayrollValues } from "@/schemas/admin/payroll";
import { useMutatePayroll } from "@/stores/admin/useMutatePayroll";

interface Props {
  type: "FIRST_PAYMENT" | "SECOND_PAYMENT";
  onSuccess: () => void;
}

export default function RunPayrollForm({ type, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RunPayrollValues>({
    resolver: zodResolver(runPayrollSchema),
    defaultValues: getRunPayrollValues(type),
  });

  const { payrollSalaryAdvance, payrollSalaryBalance } = useMutatePayroll();

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({ fields: runPayrollFields, errors: form.formState.errors });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    const mutate = type === "FIRST_PAYMENT" ? payrollSalaryAdvance : payrollSalaryBalance;

    await mutate(
      { request: values },
      {
        onSuccess: () => onSuccess(),
        onSettled: () => setIsLoading(false),
      },
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <RenderFields fields={runPayrollFields} control={form.control} />
        </div>

        <div className="pt-2">
          <ActionButton
            setOpen={onSuccess}
            handleSubmit={onSubmit}
            submitTitle="Run"
            isLoading={isLoading}
            disable={isLoading}
          />
        </div>
      </div>
    </Form>
  );
}
