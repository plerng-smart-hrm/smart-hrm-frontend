"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { useState } from "react";
import RenderField, { FieldDefinition } from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { IAttAdjustment } from "@/types/admin/att-adjustment";
import { attAdjustmentSchema, AttAdjustmentValues } from "@/schemas/admin/att-adjustment";
import { useMutateAttAdjustment } from "@/stores/admin/useMutateAttAdjustment";
import { attAdjustmentFields, getAttAdjustmentValues } from "./attAdjustmentFields";

interface Props {
  initialData?: IAttAdjustment;
  onSuccess: () => void;
}

export default function AttAdjustmentForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AttAdjustmentValues>({
    resolver: zodResolver(attAdjustmentSchema),
    defaultValues: getAttAdjustmentValues(initialData),
  });

  const { createAttAdjustment, updateAttAdjustment } = useMutateAttAdjustment();

  async function onSubmit() {
    const isValid = await form.trigger();

    if (!isValid) {
      showValidationWarning({
        fields: attAdjustmentFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    if (isEdit) {
      await updateAttAdjustment(
        { id: initialData.id, request: values },
        {
          onSuccess: () => {
            onSuccess();
          },
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    } else {
      await createAttAdjustment(
        { request: values },
        {
          onSuccess: () => {
            onSuccess();
          },
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    }
  }

  return (
    <Form {...form}>
      <div className="flex-1 grid grid-cols-2 gap-4 content-start">
        {attAdjustmentFields.map((item: FieldDefinition, index: number) => (
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

      {/* Action Buttons */}
      <div className="pt-4">
        <ActionButton
          setOpen={onSuccess}
          handleSubmit={onSubmit}
          submitTitle={"Save"}
          isLoading={isLoading}
          disable={isLoading}
        />
      </div>
    </Form>
  );
}
