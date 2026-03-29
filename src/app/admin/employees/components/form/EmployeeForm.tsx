"use client";

import React from "react";
import ActionButton from "@/components/shared/button/ActionButton";
import { FormField, Form, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeSchema, EmployeeValues } from "@/schemas/admin/employee";
import { employeeFields } from "./employeeFormField";
import { User } from "lucide-react";
import RenderField from "@/components/shared/form/RenderField";
import { Separator } from "@/components/ui/separator";
import { WorkingShiftCombobox } from "@/components/comboboxes/WorkingShiftCombobox";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { showValidationWarning } from "@/utils/form-validation";
import { IEmployee } from "@/types/admin/employee";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employee?: IEmployee;
}

export default function EmployeeForm({ setOpen, employee }: IProps) {
  const isEditMode = !!employee?.id;
  const [isLoading, setIsLoading] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { createEmployee, updateEmployee } = useMutateEmployee();

  const form = useForm<EmployeeValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      empCode: employee?.empCode || "",
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      firstNameKh: employee?.firstNameKh || "",
      lastNameKh: employee?.lastNameKh || "",
      gender: employee?.gender || "",
      dateOfBirth: employee?.dateOfBirth || "",
      placeOfBirth: employee?.placeOfBirth || "",
      nationality: employee?.nationality || "",
      race: employee?.race || "",
      maritalStatus: employee?.maritalStatus || "",
      childrenNumber: employee?.childrenNumber || 0,
      phone: employee?.phone || "",
      currentAddress: employee?.currentAddress || "",
      education: employee?.education || "",
      employeeType: employee?.employeeType || "",
      workStatus: employee?.workStatus || "",
      employeeStatus: employee?.employeeStatus || "",
      start: employee?.start || "",
      position: employee?.position || "",
      startDate: employee?.startDate || "",
      endDate: employee?.endDate || "",
      laborBookNo: employee?.laborBookNo || "",
      idCardNo: employee?.idCardNo || "",
      nssfRegisterNo: employee?.nssfRegisterNo || "",
      workingShiftId: employee?.workingShiftId || 0,
    },
    mode: "onChange",
  });

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: employeeFields,
        errors: form.formState.errors,
      });
      return;
    }

    const data = form.getValues();
    setIsLoading(true);

    const mutationOptions = {
      onSuccess: () => {
        setOpen(false);
      },
      onError: () => {},
      onSettled: () => {
        setIsLoading(false);
      },
    };

    if (isEditMode) {
      updateEmployee(
        { employeeId: employee?.id, request: data },
        mutationOptions,
      );
    } else {
      createEmployee({ request: data }, mutationOptions);
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Photo Upload Section */}
        <div className="flex gap-6">
          <div
            onClick={handlePhotoClick}
            className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 dark:bg-gray-900 flex-shrink-0"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <User className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2 text-center px-2">
                  Click to upload photo
                </span>
              </>
            )}
          </div>

          {/* Top Fields Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 content-start">
            {employeeFields.slice(0, 4).map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.key as keyof EmployeeValues}
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
        </div>

        <Separator />

        {/* Main Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employeeFields
            .slice(4)
            .filter((item) => item.key !== "workingShiftId")
            .map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.key as keyof EmployeeValues}
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

          {/* Working Shift Combobox */}
          <FormField
            control={form.control}
            name="workingShiftId"
            render={({ field }) => (
              <FormItem className="grid gap-y-2 w-full">
                <FormLabel className="text-[13px]">
                  <span className="text-gray-700 dark:text-white">
                    Working Shift
                  </span>
                  <span className="text-red-600 text-[11px] pl-0.5">*</span>
                </FormLabel>
                <WorkingShiftCombobox
                  value={field.value || undefined}
                  onChange={(value) => field.onChange(value ?? 0)}
                />
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4">
          <ActionButton
            setOpen={setOpen}
            handleSubmit={onSubmit}
            submitTitle={isEditMode ? "Update" : "Submit"}
            isLoading={isLoading}
            disable={isLoading}
          />
        </div>
      </div>
    </Form>
  );
}
