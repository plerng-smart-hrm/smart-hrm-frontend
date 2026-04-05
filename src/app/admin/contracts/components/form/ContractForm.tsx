"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { useState } from "react";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { contractSchema, ContractValues } from "@/schemas/admin/contract";
import { contractFields, getContractValues } from "./contractFields";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { IContract } from "@/types/admin/contract";

interface Props {
  initialData?: IContract;
  onSuccess: () => void;
}

export default function ContractForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContractValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: getContractValues(initialData),
  });

  const { createContract, updateContract } = useMutateContract();

  async function onSubmit() {
    const isValid = await form.trigger();

    if (!isValid) {
      showValidationWarning({
        fields: contractFields,
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    if (isEdit) {
      await updateContract(
        { contractId: initialData.id, request: values },
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
      await createContract(
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
        {contractFields.map((item, index) => (
          <FormField
            key={index}
            control={form.control as any}
            name={item.key as any}
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
          submitTitle={"Save"}
          isLoading={isLoading}
          disable={isLoading}
        />
      </div>
    </Form>
  );
}
