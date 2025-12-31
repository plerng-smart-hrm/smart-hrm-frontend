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
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/LoadingButton";
import { useState } from "react";
import { useMutateWorkingShift } from "@/stores/admin/useMutateWorkingShift";
import { IWorkingShift } from "@/types/admin/working-shift";
import {
  workingShiftSchema,
  WorkingShiftValues,
} from "@/schemas/admin/working-shift";

// Helper function to convert time format
function toFullTime(t: string | undefined) {
  if (!t) return "";
  return t.length === 5 ? `${t}:00` : t; // if HH:mm → add :00
}

// Helper function to convert from HH:mm:ss to HH:mm for input
function toShortTime(t: string | undefined) {
  if (!t) return "";
  return t.substring(0, 5); // HH:mm:ss → HH:mm
}

interface Props {
  initialData?: IWorkingShift;
  onSuccess: () => void;
}

export default function WorkingShiftForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<WorkingShiftValues> = {
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    firstInTime: toShortTime(initialData?.firstInTime),
    firstOutTime: toShortTime(initialData?.firstOutTime),
    secondInTime: toShortTime(initialData?.secondInTime),
    secondOutTime: toShortTime(initialData?.secondOutTime),
    breakMinutes: initialData?.breakMinutes ?? 60,
    lateAllowMinutes: initialData?.lateAllowMinutes ?? 10,
  };

  const form = useForm<WorkingShiftValues>({
    resolver: zodResolver(workingShiftSchema),
    defaultValues,
  });

  const { create: createWorkingShiftMutate, update: updateWorkingShiftMutate } =
    useMutateWorkingShift();

  async function onSubmit(values: WorkingShiftValues) {
    setIsLoading(true);

    const request = {
      name: values.name,
      description: values.description || "",
      firstInTime: toFullTime(values.firstInTime),
      firstOutTime: toFullTime(values.firstOutTime),
      secondInTime: toFullTime(values.secondInTime),
      secondOutTime: toFullTime(values.secondOutTime),
      breakMinutes: values.breakMinutes,
      lateAllowMinutes: values.lateAllowMinutes,
    };

    if (isEdit && initialData?.id) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Top Section: Basic Information and Time Policies */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Office Morning Shift" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Standard office working hours"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right: Time Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Time Policies</h3>

            {/* Break Minutes */}
            <FormField
              control={form.control}
              name="breakMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Break Minutes <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="60"
                      min="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      value={field.value ?? 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Late Allow Minutes */}
            <FormField
              control={form.control}
              name="lateAllowMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Late Allow Minutes <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      min="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      value={field.value ?? 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Bottom Section: Time Selections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Morning Session */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Morning Session</h3>

            {/* First In Time */}
            <FormField
              control={form.control}
              name="firstInTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First In Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step="300"
                      placeholder="08:00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Out Time */}
            <FormField
              control={form.control}
              name="firstOutTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Out Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step="300"
                      placeholder="12:00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right: Afternoon Session */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Afternoon Session</h3>

            {/* Second In Time */}
            <FormField
              control={form.control}
              name="secondInTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Second In Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step="300"
                      placeholder="13:00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Second Out Time */}
            <FormField
              control={form.control}
              name="secondOutTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Second Out Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step="300"
                      placeholder="17:00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <LoadingButton loading={isLoading} type="submit">
            {isEdit ? "Update Shift" : "Create Shift"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
