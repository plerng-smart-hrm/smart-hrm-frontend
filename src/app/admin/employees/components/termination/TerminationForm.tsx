"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import RenderField from "@/components/shared/form/RenderField";
import { Separator } from "@/components/ui/separator";
import { IEmployee } from "@/types/admin/employee";
import ActionButton from "@/components/shared/button/ActionButton";
import { EmployeeCombobox } from "@/components/comboboxes/EmployeeCombobox";
import {
  terminationBaseFields,
  terminationSalaryFields,
  terminationUDCFields,
  terminationFDCFields,
  terminationAllowanceFields,
  terminationDamagesFields,
  getTerminationValues,
} from "./terminationFormField";
import RulesPanel from "./RulesPanel";
import ResultPanel from "./ResultPanel";
import { terminationSchema, TerminationValues } from "@/schemas/admin/termination";
import { useMutateTermination } from "@/stores/admin/useMutateTermination";
import { showValidationWarning } from "@/utils/form-validation";

export interface CalculationResult {
  dailyWage: number;
  unpaidSalary: number;
  annualLeavePayment: number;
  noticeCompensation: number;
  fdcIndemnity: number;
  other: number;
  damages: number;
  deduction: number;
  finalTotal: number;
}

function calculate(v: TerminationValues, requiredNoticeDays: number): CalculationResult {
  const isMisconduct = v.terminationType === "misconduct";
  const isWithoutMisconduct = v.terminationType === "without_misconduct";
  const isNormalEnd = v.terminationType === "normal_end";
  const isFDC = v.contractType === "FDC";
  const isUDC = v.contractType === "UDC";

  const dailyWage = v.basicSalary / 26;
  const unpaidSalary = dailyWage * v.unpaidSalary;
  const annualLeavePayment = dailyWage * v.remainingAnnualLeave;

  let noticeCompensation = 0;
  if (isWithoutMisconduct && isUDC) {
    const remaining = Math.max(requiredNoticeDays - (v.noticeDays ?? 0), 0);
    noticeCompensation = remaining * dailyWage;
  }

  const fdcIndemnity = isFDC && !isMisconduct ? (v.salaryEarnedFdc ?? 0) * 0.05 : 0;
  const damages = isFDC && isWithoutMisconduct ? (v.damages ?? 0) : 0;

  let finalTotal = 0;
  if (isMisconduct) {
    finalTotal = unpaidSalary + annualLeavePayment + v.other - v.deduction;
  } else if (isWithoutMisconduct) {
    finalTotal =
      unpaidSalary + annualLeavePayment + noticeCompensation + fdcIndemnity + v.other + damages - v.deduction;
  } else if (isNormalEnd && isFDC) {
    finalTotal = unpaidSalary + annualLeavePayment + fdcIndemnity + v.other - v.deduction;
  } else {
    finalTotal = unpaidSalary + annualLeavePayment + v.other - v.deduction;
  }

  return {
    dailyWage,
    unpaidSalary,
    annualLeavePayment,
    noticeCompensation,
    fdcIndemnity,
    other: v.other,
    damages,
    deduction: v.deduction,
    finalTotal,
  };
}

interface IProps {
  setOpen: (open: boolean) => void;
  employee: IEmployee | null;
}

export default function TerminationForm({ setOpen, employee }: IProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TerminationValues>({
    resolver: zodResolver(terminationSchema),
    defaultValues: getTerminationValues(),
    mode: "onChange",
  });

  const watched = useWatch({ control: form.control });

  const contractType = watched.contractType ?? "";
  const terminationType = watched.terminationType ?? "";
  const isFDC = contractType === "FDC";
  const isUDC = contractType === "UDC";
  const isWithoutMisconduct = terminationType === "without_misconduct";

  const requiredNoticeDays = watched.requiredNoticeDays ?? 0;
  const result = calculate({ ...form.getValues(), ...watched } as TerminationValues, requiredNoticeDays);

  // Track selected employee when coming from TerminationClient (no pre-selected employee)
  const [selectedEmployee, setSelectedEmployee] = React.useState<IEmployee | undefined>(employee ?? undefined);

  React.useEffect(() => {
    const emp = selectedEmployee ?? employee;
    if (emp?.id) form.setValue("employeeId", emp.id);
  }, [selectedEmployee?.id, employee?.id]);

  const { createTermination } = useMutateTermination();
  const onSubmit = async () => {
    const isValid = await form.trigger();

    if (!isValid) {
      showValidationWarning({
        fields: terminationBaseFields,
        errors: form.formState.errors,
      });
      return;
    }

    const { requiredNoticeDays: _skip, ...values } = form.getValues();
    setIsLoading(true);

    await createTermination(
      { request: values },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <div className="flex gap-6 pb-20">
        <div className="flex-1 min-w-0 space-y-5">
          {employee ? (
            <div className="rounded-md bg-muted px-4 py-2.5">
              <p className="text-sm font-medium">
                {employee.lastName} {employee.firstName}
                {employee.empCode && <span className="ml-2 text-muted-foreground text-xs">#{employee.empCode}</span>}
              </p>
            </div>
          ) : (
            <EmployeeCombobox value={selectedEmployee?.id} onChange={(emp) => setSelectedEmployee(emp)} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {terminationBaseFields.map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.key as keyof TerminationValues}
                render={(field) => <RenderField form={{ ...item, field }} />}
              />
            ))}
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {terminationSalaryFields.map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.key as keyof TerminationValues}
                render={(field) => <RenderField form={{ ...item, field }} />}
              />
            ))}
            {isUDC &&
              terminationUDCFields.map((item, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.key as keyof TerminationValues}
                  render={(field) => <RenderField form={{ ...item, field }} />}
                />
              ))}
            {isFDC &&
              terminationFDCFields.map((item, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.key as keyof TerminationValues}
                  render={(field) => <RenderField form={{ ...item, field }} />}
                />
              ))}
            {terminationAllowanceFields.map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.key as keyof TerminationValues}
                render={(field) => <RenderField form={{ ...item, field }} />}
              />
            ))}
            {isFDC &&
              isWithoutMisconduct &&
              terminationDamagesFields.map((item, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.key as keyof TerminationValues}
                  render={(field) => <RenderField form={{ ...item, field }} />}
                />
              ))}
          </div>

          <RulesPanel />
        </div>

        <div className="w-[320px] shrink-0 space-y-5 overflow-y-auto">
          <ResultPanel result={result} isFDC={isFDC} isWithoutMisconduct={isWithoutMisconduct} />

          <ActionButton
            setOpen={setOpen}
            handleSubmit={onSubmit}
            submitTitle="Confirm Termination"
            isLoading={isLoading}
            disable={isLoading}
          />
        </div>
      </div>
    </Form>
  );
}
