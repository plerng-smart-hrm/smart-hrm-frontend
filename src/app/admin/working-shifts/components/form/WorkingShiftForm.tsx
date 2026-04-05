"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useMutateWorkingShift } from "@/stores/admin/useMutateWorkingShift";
import { IWorkingShift } from "@/types/admin/working-shift";
import {
  workingShiftSchema,
  WorkingShiftValues,
} from "@/schemas/admin/working-shift";
import ActionButton from "@/components/shared/button/ActionButton";
import { RenderFields } from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import {
  workingShiftFields,
  basicInfoFields,
  timePolicyFields,
  morningSessionFields,
  afternoonSessionFields,
  getWorkingShiftValues,
} from "./workingShiftFormFields";

// Helper function to convert time format
function toFullTime(t: string | undefined) {
  if (!t) return "";
  return t.length === 5 ? `${t}:00` : t; // if HH:mm → add :00
}

interface Props {
  initialData?: IWorkingShift;
  onSuccess: () => void;
}

export default function WorkingShiftForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<WorkingShiftValues>({
    resolver: zodResolver(workingShiftSchema),
    defaultValues: getWorkingShiftValues(initialData),
  });

  const { createWorkingShift, updateWorkingShift } = useMutateWorkingShift();

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: workingShiftFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
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
      updateWorkingShift(
        { workingShiftId: initialData.id, request },
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
      createWorkingShift(
        { request },
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
        <div className="grid grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <RenderFields fields={basicInfoFields} control={form.control} />
          </div>

          {/* Time Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Time Policies</h3>
            <RenderFields fields={timePolicyFields} control={form.control} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Morning Session */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Morning Session</h3>
            <RenderFields fields={morningSessionFields} control={form.control} />
          </div>

          {/* Afternoon Session */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Afternoon Session</h3>
            <RenderFields fields={afternoonSessionFields} control={form.control} />
          </div>
        </div>

        {/* Action Buttons */}
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
