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
import { LoadingButton } from "@/components/LoadingButton";
import { useState } from "react";
import { useMutateWorkingShift } from "@/stores/admin/useMutateWorkingShift";
import { IWorkingShift } from "@/types/admin";

function toFullTime(t: string) {
  if (!t) return t;
  return t.length === 5 ? `${t}:00` : t; // if HH:mm → add :00
}

const formSchema = z.object({
  factoryId: z.number().min(1, "Factory is required"),
  name: z.string().min(1, "Name is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  breakMinutes: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Break minutes must be numeric"),
  overtimeStart: z.string().min(1, "Overtime start is required"),
  overtimeEnd: z.string().min(1, "Overtime end is required"),
});

interface Props {
  initialData?: IWorkingShift;
  onSuccess: () => void;
}

export default function WorkingShiftForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          factoryId: initialData.factoryId ?? 1,
          name: initialData.name ?? "",
          startTime: initialData.startTime ?? "",
          endTime: initialData.endTime ?? "",
          breakMinutes: initialData.breakMinutes?.toString() ?? "60",
          overtimeStart: initialData.overtimeStart ?? "",
          overtimeEnd: initialData.overtimeEnd ?? "",
        }
      : {
          factoryId: 1,
          name: "",
          startTime: "",
          endTime: "",
          breakMinutes: "60",
          overtimeStart: "",
          overtimeEnd: "",
        },
  });

  const { create: createWorkingShiftMutate, update: updateWorkingShiftMutate } =
    useMutateWorkingShift();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const request = {
      factoryId: values.factoryId,
      name: values.name,
      breakMinutes: Number(values.breakMinutes),

      startTime: toFullTime(values.startTime),
      endTime: toFullTime(values.endTime),
      overtimeStart: toFullTime(values.overtimeStart),
      overtimeEnd: toFullTime(values.overtimeEnd),
    };

    if (isEdit) {
      await updateWorkingShiftMutate(
        { workingShiftId: initialData.id, request },
        {
          onSuccess: () => onSuccess(),
          onSettled: () => setIsLoading(false),
        }
      );
    } else {
      await createWorkingShiftMutate(
        { request },
        {
          onSuccess: () => onSuccess(),
          onSettled: () => setIsLoading(false),
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Day Shift" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time Fields */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Break Minutes */}
        <FormField
          control={form.control}
          name="breakMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Break Minutes *</FormLabel>
              <FormControl>
                <Input placeholder="60" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Overtime */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="overtimeStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overtime Start *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overtimeEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overtime End *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <LoadingButton loading={isLoading} type="submit">
            {isEdit ? "Update" : "Save"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
