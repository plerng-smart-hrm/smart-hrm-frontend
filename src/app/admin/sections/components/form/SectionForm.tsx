"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useState } from "react";
import ActionButton from "@/components/shared/button/ActionButton";
import { RenderFields } from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import { sectionFields, getSectionValues } from "./sectionShiftFormFields";
import { ISection } from "@/types/admin";
import { sectionSchema, SectionValues } from "@/schemas/admin/section";
import { useMutateSection } from "@/stores/admin/useMutateSection";
import { DepartmentCombobox } from "@/components/comboboxes/DepartmentCombobox";

interface Props {
  initialData?: ISection;
  onSuccess: () => void;
}

export default function SectionForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SectionValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: getSectionValues(initialData),
  });

  const { createSection, updateSection } = useMutateSection();

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: sectionFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    if (isEdit && initialData?.id) {
      updateSection(
        { sectionId: initialData.id, request: values },
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
      createSection(
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
        <RenderFields fields={sectionFields} control={form.control} />

        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem className="grid gap-y-2 w-full">
              <FormLabel>
                Department
                <span className="text-red-500">*</span>
              </FormLabel>
              <DepartmentCombobox
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

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
