"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ILeaveType } from "@/types/admin";
import { useState } from "react";
import { useMutateLeaveType } from "@/stores/admin/useMutateLeaveType";
import { LoadingButton } from "@/components/LoadingButton";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameKh: z.string().min(1, "Name kh is required"),
  description: z.string().min(1, "Description is required"),
  defaultDays: z.number().min(0, "Default days must be 0 or greater"),
  payRate: z
    .number()
    .min(0, "Pay rate must be 0 or greater")
    .max(1, "Pay rate must be 1 or less"),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  initialData?: ILeaveType;
  onSuccess: () => void;
}

export default function LeaveTypeForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: FormValues = {
    name: initialData?.name ?? "",
    nameKh: initialData?.nameKh ?? "",
    description: initialData?.description ?? "",
    defaultDays: initialData?.defaultDays ?? 0,
    payRate: initialData?.payRate ?? 1,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { create: createLeaveTypeMutate, update: updateLeaveTypeMutate } =
    useMutateLeaveType();

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    if (isEdit && initialData?.id) {
      await updateLeaveTypeMutate(
        { leaveTypeId: initialData.id, request: values },
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
      await createLeaveTypeMutate(
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
        <FormField
          control={form.control}
          name="nameKh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (Khmer)</FormLabel>
              <FormControl>
                <Input placeholder="Enter name in Khmer" {...field} />
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
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Days</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter default days"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseInt(value, 10));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  placeholder="Enter pay rate (0-1)"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseFloat(value));
                  }}
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
