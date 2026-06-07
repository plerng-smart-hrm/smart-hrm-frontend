"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import SharedSheet from "@/components/shared/SharedSheet";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { employeeSchema, EmployeeValues } from "@/schemas/admin/employee";
import { pickEmployeeFields } from "@/app/admin/employees/components/wizard/wizardFields";
import { TimeShiftCombobox } from "@/components/comboboxes/TimeShiftCombobox";
import { formatToNumber, formatToString } from "@/lib/custom-format";
import { IEmployee } from "@/types/admin/employee";

const coreKeys = ["empCode", "firstName", "lastName", "firstNameKh", "lastNameKh", "gender", "dateOfBirth", "phone", "idCardNo"];
const moreKeys = [
  "placeOfBirth",
  "nationality",
  "race",
  "maritalStatus",
  "childrenNumber",
  "currentAddress",
  "education",
  "laborBookNo",
  "nssfRegisterNo",
];
const jobCoreKeys = ["position", "startDate", "employeeStatus", "workStatus"];
const jobOtherKeys = ["employeeType", "endDate"];

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: IEmployee;
}

const buildDefaultValues = (employee: IEmployee): EmployeeValues => ({
  empCode: formatToString(employee.empCode),
  firstName: formatToString(employee.firstName),
  lastName: formatToString(employee.lastName),
  firstNameKh: formatToString(employee.firstNameKh),
  lastNameKh: formatToString(employee.lastNameKh),
  gender: formatToString(employee.gender),
  dateOfBirth: formatToString(employee.dateOfBirth),
  phone: formatToString(employee.phone),
  idCardNo: formatToString(employee.idCardNo),
  placeOfBirth: formatToString(employee.placeOfBirth),
  nationality: formatToString(employee.nationality),
  race: formatToString(employee.race),
  maritalStatus: formatToString(employee.maritalStatus),
  childrenNumber: formatToNumber(employee.childrenNumber),
  currentAddress: formatToString(employee.currentAddress),
  education: formatToString(employee.education),
  laborBookNo: formatToString(employee.laborBookNo),
  nssfRegisterNo: formatToString(employee.nssfRegisterNo),
  position: formatToString(employee.position),
  timeShiftId: formatToNumber(employee.timeShiftId),
  startDate: formatToString(employee.startDate),
  endDate: formatToString(employee.endDate),
  employeeStatus: formatToString(employee.employeeStatus) || "PROBATION",
  workStatus: formatToString(employee.workStatus) || "ACTIVE",
  employeeType: formatToString(employee.employeeType),
});

export default function PersonalInfoPanel({ open, setOpen, employee }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { updateEmployee } = useMutateEmployee();

  const form = useForm<EmployeeValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: buildDefaultValues(employee),
    mode: "onChange",
  });

  React.useEffect(() => {
    if (open) {
      form.reset(buildDefaultValues(employee));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, employee]);

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: [
          ...pickEmployeeFields(coreKeys),
          ...pickEmployeeFields(moreKeys),
          ...pickEmployeeFields(jobCoreKeys),
          { label: "Working Shift", key: "timeShiftId", required: true },
          ...pickEmployeeFields(jobOtherKeys),
        ],
        errors: form.formState.errors,
      });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    await updateEmployee(
      { employeeId: employee.id, request: values },
      {
        onSuccess: () => setOpen(false),
        onSettled: () => setIsLoading(false),
      },
    );
  };

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  return (
    <SharedSheet
      open={open}
      setOpen={setOpen}
      title="Update Personal Information"
      desc={`Update for ${fullNameEn || "this employee"}${employee.empCode ? ` · ${employee.empCode}` : ""}`}
      width="42rem"
    >
      <Form {...form}>
        <div className="space-y-6 pb-20">
            <div>
              <p className="text-sm font-medium mb-3">Basic information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pickEmployeeFields(coreKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof EmployeeValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-3">Personal &amp; contact details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pickEmployeeFields(moreKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof EmployeeValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-3">Job &amp; shift</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="timeShiftId"
                  render={({ field }) => (
                    <FormItem className="grid gap-y-2 w-full">
                      <FormLabel className="text-sm">
                        <span className="text-gray-700 dark:text-white">Working Shift</span>
                        <span className="text-red-600 text-sm pl-0.5">*</span>
                      </FormLabel>
                      <TimeShiftCombobox value={field.value || undefined} onChange={(value) => field.onChange(value ?? 0)} />
                    </FormItem>
                  )}
                />

                {pickEmployeeFields(jobCoreKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof EmployeeValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}

                {pickEmployeeFields(jobOtherKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof EmployeeValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}
              </div>
            </div>

          <ActionButton
            setOpen={setOpen}
            handleSubmit={onSubmit}
            submitTitle="Save Changes"
            isLoading={isLoading}
            disable={isLoading}
          />
        </div>
      </Form>
    </SharedSheet>
  );
}
