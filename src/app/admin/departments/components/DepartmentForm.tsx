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
import { IDepartment } from "@/types/admin";
import { useState } from "react";
import { useMutateDepartment } from "@/stores/admin/useMutateDepartment";
import { LoadingButton } from "@/components/LoadingButton";
import { departmentSchema, DepartmentValues } from "@/schemas/admin/department";

interface Props {
  initialData?: IDepartment;
  onSuccess: () => void;
}

export default function DepartmentForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: DepartmentValues = {
    name: initialData?.name ?? "",
  };

  const form = useForm<DepartmentValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues,
  });

  const { create: createDepartmentMutate, update: updateDepartmentMutate } =
    useMutateDepartment();

  async function onSubmit(values: DepartmentValues) {
    setIsLoading(true);
    if (isEdit && initialData?.id) {
      await updateDepartmentMutate(
        { departmentId: initialData.id, request: values },
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
      await createDepartmentMutate(
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
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
