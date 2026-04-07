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
import {
  terminationBaseFields,
  terminationSalaryFields,
  terminationUDCFields,
  terminationFDCFields,
  terminationAllowanceFields,
  terminationDamagesFields,
} from "./terminationFormField";
import RulesPanel from "./RulesPanel";
import ResultPanel from "./ResultPanel";

const terminationSchema = z.object({
  contractType: z.string().min(1, "Contract type is required"),
  terminationType: z.string().min(1, "Termination type is required"),
  basicSalary: z.number().positive("Basic salary must be greater than 0"),
  unpaidSalaryDays: z.number().min(0, "Cannot be negative"),
  remainingAnnualLeaveDays: z.number().min(0, "Cannot be negative"),
  noticeDaysGiven: z.number().min(0, "Cannot be negative").optional(),
  requiredNoticeDays: z.number().min(0, "Cannot be negative").optional(),
  totalSalaryEarnedDuringFDC: z.number().min(0, "Cannot be negative").optional(),
  otherAllowance: z.number().min(0, "Cannot be negative"),
  deduction: z.number().min(0, "Cannot be negative"),
  damages: z.number().min(0, "Cannot be negative").optional(),
});

type TerminationValues = z.infer<typeof terminationSchema>;

export interface CalculationResult {
  dailyWage: number;
  unpaidSalary: number;
  annualLeavePayment: number;
  noticeCompensation: number;
  fdcIndemnity: number;
  otherAllowance: number;
  damages: number;
  deduction: number;
  finalTotal: number;
}

function calculate(v: TerminationValues): CalculationResult {
  const isMisconduct = v.terminationType === "misconduct";
  const isWithoutMisconduct = v.terminationType === "without_misconduct";
  const isNormalEnd = v.terminationType === "normal_end";
  const isFDC = v.contractType === "FDC";
  const isUDC = v.contractType === "UDC";

  const dailyWage = v.basicSalary / 26;
  const unpaidSalary = dailyWage * v.unpaidSalaryDays;
  const annualLeavePayment = dailyWage * v.remainingAnnualLeaveDays;

  let noticeCompensation = 0;
  if (isWithoutMisconduct && isUDC) {
    const remaining = Math.max((v.requiredNoticeDays ?? 0) - (v.noticeDaysGiven ?? 0), 0);
    noticeCompensation = remaining * dailyWage;
  }

  const fdcIndemnity = isFDC && !isMisconduct ? (v.totalSalaryEarnedDuringFDC ?? 0) * 0.05 : 0;
  const damages = isFDC && isWithoutMisconduct ? (v.damages ?? 0) : 0;

  let finalTotal = 0;
  if (isMisconduct) {
    finalTotal = unpaidSalary + annualLeavePayment + v.otherAllowance - v.deduction;
  } else if (isWithoutMisconduct) {
    finalTotal =
      unpaidSalary + annualLeavePayment + noticeCompensation + fdcIndemnity + v.otherAllowance + damages - v.deduction;
  } else if (isNormalEnd && isFDC) {
    finalTotal = unpaidSalary + annualLeavePayment + fdcIndemnity + v.otherAllowance - v.deduction;
  } else {
    finalTotal = unpaidSalary + annualLeavePayment + v.otherAllowance - v.deduction;
  }

  return {
    dailyWage,
    unpaidSalary,
    annualLeavePayment,
    noticeCompensation,
    fdcIndemnity,
    otherAllowance: v.otherAllowance,
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
  const [isLoading] = React.useState(false);

  const form = useForm<TerminationValues>({
    resolver: zodResolver(terminationSchema),
    defaultValues: {
      contractType: "",
      terminationType: "",
      basicSalary: 0,
      unpaidSalaryDays: 0,
      remainingAnnualLeaveDays: 0,
      noticeDaysGiven: 0,
      requiredNoticeDays: 0,
      totalSalaryEarnedDuringFDC: 0,
      otherAllowance: 0,
      deduction: 0,
      damages: 0,
    },
    mode: "onChange",
  });

  const watched = useWatch({ control: form.control });

  const contractType = watched.contractType ?? "";
  const terminationType = watched.terminationType ?? "";
  const isFDC = contractType === "FDC";
  const isUDC = contractType === "UDC";
  const isWithoutMisconduct = terminationType === "without_misconduct";

  const result = calculate({ ...form.getValues(), ...watched } as TerminationValues);

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
  };

  return (
    <Form {...form}>
      <div className="flex gap-6 pb-20">
        <div className="flex-1 min-w-0 space-y-5">
          {employee && (
            <div className="rounded-md bg-muted px-4 py-2.5">
              <p className="text-sm font-medium">
                {employee.lastName} {employee.firstName}
                {employee.empCode && <span className="ml-2 text-muted-foreground text-xs">#{employee.empCode}</span>}
              </p>
            </div>
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
