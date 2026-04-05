"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { useState } from "react";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { triggerAttendanceSummarySchema, TriggerAttendanceSummaryValues } from "@/schemas/admin/attendance-summary";
import { useMutateAttendanceSummary } from "@/stores/admin/useMutateAttendanceSummary";
import { ITriggerAttendanceSummaryResponse } from "@/types/admin/attendance-summary";
import TriggerAttendanceSummaryResult from "./TriggerAttendanceSummaryResult";
import { getTriggerAttSummaryValues, triggerAttSummaryFields } from "./triggerAttSummarytFields";

interface Props {
  onClose: () => void;
}

export default function TriggerAttendanceSummaryForm({ onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ITriggerAttendanceSummaryResponse | undefined>(undefined);

  const form = useForm<TriggerAttendanceSummaryValues>({
    resolver: zodResolver(triggerAttendanceSummarySchema),
    defaultValues: getTriggerAttSummaryValues(),
  });

  const { triggerAttendanceSummary } = useMutateAttendanceSummary();

  async function onSubmit() {
    const isValid = await form.trigger();

    if (!isValid) {
      showValidationWarning({
        fields: triggerAttSummaryFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    await triggerAttendanceSummary(
      { request: values },
      {
        onSuccess: (data) => {
          setResult(data);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  }

  if (result) {
    return <TriggerAttendanceSummaryResult result={result} onClose={onClose} />;
  }

  return (
    <Form {...form}>
      <div className="flex-1 grid grid-cols-1 gap-4 content-start">
        {triggerAttSummaryFields.map((item, index) => (
          <FormField
            key={index}
            control={form.control as any}
            name={item.key as any}
            render={(field) => (
              <RenderField
                form={{
                  ...item,
                  field,
                }}
              />
            )}
          />
        ))}
      </div>

      <div className="pt-4">
        <ActionButton
          setOpen={onClose}
          handleSubmit={onSubmit}
          submitTitle="Generate"
          isLoading={isLoading}
          disable={isLoading}
        />
      </div>
    </Form>
  );
}
