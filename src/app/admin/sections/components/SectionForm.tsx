"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ISection } from "@/types/admin";
import { useState } from "react";
import { useMutateSection } from "@/stores/admin/useMutateSection";
import { LoadingButton } from "@/components/LoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { DepartmentCombobox } from "@/components/comboboxes/DepartmentCombobox";
import { sectionSchema, SectionValues } from "@/schemas/admin/section";

interface Props {
  initialData?: ISection;
  onSuccess: () => void;
}

export default function SectionForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | undefined
  >(undefined);

  const defaultValues: Partial<SectionValues> = {
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    departmentId: initialData?.departmentId,
  };

  const form = useForm<SectionValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues,
  });

  const { create: createSectionMutate, update: updateSectionMutate } =
    useMutateSection();

  async function onSubmit(values: SectionValues) {
    setIsLoading(true);
    if (isEdit && initialData?.id) {
      await updateSectionMutate(
        { sectionId: initialData.id, request: values },
        {
          onSuccess: () => {
            onSuccess();
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      await createSectionMutate(
        { request: values },
        {
          onSuccess: () => {
            onSuccess();
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-2">
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department <span className="text-red-500">*</span></FormLabel>
              <DepartmentCombobox
                value={selectedDepartmentId}
                onChange={(id) => {
                  field.onChange(id);
                  setSelectedDepartmentId(id);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={isLoading}>
          {isEdit ? "Save" : "Create"}
        </LoadingButton>
      </form>
    </Form>
  );
}
