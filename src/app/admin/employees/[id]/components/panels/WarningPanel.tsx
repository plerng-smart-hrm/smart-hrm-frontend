"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import SharedSheet from "@/components/shared/SharedSheet";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { warningSchema, WarningValues } from "@/schemas/admin/warning";
import { useMutateWarning } from "@/stores/admin/useMutateWarning";
import { warningFields } from "../form/warningFields";
import { IWarning } from "@/types/admin/warning";
import { formatToString } from "@/lib/custom-format";
import { formatToTodayDate } from "@/utils/shared-format";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  employeeId: number;
  initialData?: IWarning;
  onSuccess?: () => void;
}

const buildDefaultValues = (employeeId: number, initialData?: IWarning): WarningValues => ({
  employeeId,
  type: formatToString(initialData?.type) || "",
  remark: formatToString(initialData?.remark) || "",
  warningDate: formatToString(initialData?.warningDate) || formatToTodayDate(),
});

export default function WarningPanel({ open, setOpen, employeeId, initialData, onSuccess }: Props) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = React.useState(false);
  const { createWarning, updateWarning } = useMutateWarning();

  const form = useForm<WarningValues>({
    resolver: zodResolver(warningSchema),
    defaultValues: buildDefaultValues(employeeId, initialData),
  });

  React.useEffect(() => {
    if (open) {
      form.reset(buildDefaultValues(employeeId, initialData));
    }
  }, [open, initialData, employeeId]);

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({ fields: warningFields, errors: form.formState.errors });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    if (isEdit) {
      await updateWarning(
        { warningId: initialData.id, request: values },
        {
          onSuccess: () => { setOpen(false); onSuccess?.(); },
          onSettled: () => setIsLoading(false),
        },
      );
    } else {
      await createWarning(
        { request: values },
        {
          onSuccess: () => { setOpen(false); onSuccess?.(); },
          onSettled: () => setIsLoading(false),
        },
      );
    }
  };

  return (
    <SharedSheet
      open={open}
      setOpen={setOpen}
      title={isEdit ? "Edit Warning" : "Add Warning"}
      width="30rem"
    >
      <Form {...form}>
        <div className="grid grid-cols-1 gap-4 pb-20">
          {warningFields.map((item) => (
            <FormField
              key={item.key}
              control={form.control as any}
              name={item.key as keyof WarningValues}
              render={(field) => <RenderField form={{ ...item, field }} />}
            />
          ))}
        </div>

        <ActionButton
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          submitTitle={isEdit ? "Update" : "Save"}
          isLoading={isLoading}
          disable={isLoading}
        />
      </Form>
    </SharedSheet>
  );
}
