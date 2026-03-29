"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import ActionButton from "@/components/shared/button/ActionButton";
import { RenderFields } from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import { IDepartment } from "@/types/admin";
import { departmentSchema, DepartmentValues } from "@/schemas/admin/department";
import { useMutateDepartment } from "@/stores/admin/useMutateDepartment";
import { departmentFields, getDepartmentValues } from "./departmentFormFields";

interface Props {
  initialData?: IDepartment;
  onSuccess: () => void;
}

export default function DepartmentForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DepartmentValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: getDepartmentValues(initialData),
  });

  const { createDepartment, updateDepartment } = useMutateDepartment();

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: departmentFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    if (isEdit && initialData?.id) {
      updateDepartment(
        { departmentId: initialData.id, request: values },
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
      createDepartment(
        { request: values },
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
      <div className="space-y-4">
        <RenderFields fields={departmentFields} control={form.control} />

        <div className="pt-4">
          <ActionButton
            setOpen={onSuccess}
            handleSubmit={onSubmit}
            isLoading={isLoading}
            disable={isLoading}
          />
        </div>
      </div>
    </Form>
  );
}
