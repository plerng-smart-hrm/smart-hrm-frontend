"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import ActionButton from "@/components/shared/button/ActionButton";
import { RenderFields } from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import { runPayrollFields, getRunPayrollValues, paymentTypeFields, payrollPeriodFields } from "./payrollFormFields";
import { runPayrollSchema, RunPayrollValues } from "@/schemas/admin/payroll";
import { useMutatePayroll } from "@/stores/admin/useMutatePayroll";
import { startOfMonth, endOfMonth, setDate, format } from "date-fns";

interface Props {
  onSuccess: () => void;
}

export default function RunPayrollForm({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RunPayrollValues>({
    resolver: zodResolver(runPayrollSchema),
    defaultValues: getRunPayrollValues(),
  });

  const paymentType = form.watch("paymentType");

  useEffect(() => {
    const now = new Date();
    if (paymentType === "FIRST_PAYMENT") {
      form.setValue("startDate", format(startOfMonth(now), "yyyy-MM-dd"));

      form.setValue("endDate", format(setDate(now, 15), "yyyy-MM-dd"));
    }

    if (paymentType === "SECOND_PAYMENT") {
      form.setValue("startDate", format(setDate(now, 16), "yyyy-MM-dd"));
      form.setValue("endDate", format(endOfMonth(now), "yyyy-MM-dd"));
    }
  }, [paymentType, form]);

  const { payrollFirstPayment, payrollSecondPayment } = useMutatePayroll();

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: runPayrollFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    const request = {
      startDate: values.startDate,
      endDate: values.endDate,
    };

    if (values.paymentType === "FIRST_PAYMENT") {
      payrollFirstPayment(
        { request: request },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: () => {},
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    } else {
      payrollSecondPayment(
        { request: request },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: () => {},
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="space-y-2">
          <RenderFields fields={paymentTypeFields} control={form.control} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <RenderFields fields={payrollPeriodFields} control={form.control} />
        </div>

        <div className="pt-4">
          <ActionButton
            setOpen={onSuccess}
            handleSubmit={onSubmit}
            submitTitle={"Submit"}
            isLoading={isLoading}
            disable={isLoading}
          />
        </div>
      </div>
    </Form>
  );
}
