"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { IDevice } from "@/types/admin";
import { useState } from "react";
import { useMutateDevice } from "@/stores/admin/useMutateDevice";
import { deviceSchema, DeviceValues } from "@/schemas/admin/device";
import { deviceFields, getDeviceValues } from "./deviceFormFields";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";

interface Props {
  initialData?: IDevice;
  onSuccess: () => void;
}

export default function DeviceForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DeviceValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: getDeviceValues(initialData),
  });

  const { createDevice, updateDevice } = useMutateDevice();

  async function onSubmit() {
    const isValid = await form.trigger();

    if (!isValid) {
      showValidationWarning({
        fields: deviceFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    if (isEdit) {
      await updateDevice(
        { deviceId: initialData.id, request: values },
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
      await createDevice(
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
        {deviceFields.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={item.key as keyof DeviceValues}
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
          submitTitle={"Submit"}
          isLoading={isLoading}
          disable={isLoading}
        />
      </div>
    </Form>
  );
}
