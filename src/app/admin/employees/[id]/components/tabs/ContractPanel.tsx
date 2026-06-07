"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import RenderField from "@/components/shared/form/RenderField";
import ActionButton from "@/components/shared/button/ActionButton";
import { showValidationWarning } from "@/utils/form-validation";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { contractSchema, ContractValues } from "@/schemas/admin/contract";
import { formatToNumber, formatToString } from "@/lib/custom-format";
import { IContract } from "@/types/admin/contract";
import { IEmployee } from "@/types/admin/employee";
import { contractFields } from "@/app/admin/contracts/components/form/contractFields";

const basicsKeys = ["contractType", "startDate", "endDate", "status"];
const salaryKeys = [
  "baseSalary",
  "allowanceFoodPerDay",
  "allowanceFemaleLunchPerDay",
  "allowanceMilkMonthly",
  "allowanceHousing",
  "allowanceTransport",
  "allowanceOtFoodPerHour",
  "allowanceUnionFeeMonthly",
  "bonusAttendance",
  "bonusPosition",
  "bonusTechnical",
];
const skillKeys = ["skillLevel", "allowanceSkill", "otRateNormal", "otRateExcess"];

const fieldsByKeys = (keys: string[]) => keys.map((key) => contractFields.find((f) => f.key === key)).filter(Boolean) as typeof contractFields;

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: IEmployee;
  /** Existing contract being edited (update mode) */
  editingContract?: IContract;
  /** Reference contract to copy salary/allowance terms from when starting a renewal (create mode) */
  renewFrom?: IContract;
}

const buildDefaultValues = (employee: IEmployee, editingContract?: IContract, renewFrom?: IContract): ContractValues => {
  const source = editingContract ?? renewFrom;
  const isRenewal = !editingContract && !!renewFrom;

  return {
    empCode: employee.empCode ?? "",
    contractType: formatToString(source?.contractType),
    startDate: isRenewal ? "" : formatToString(source?.startDate),
    endDate: isRenewal ? "" : formatToString(source?.endDate),
    status: formatToString(source?.status) || "ACTIVE",
    baseSalary: formatToNumber(source?.baseSalary),
    // IContract (API response type) doesn't carry these newer breakdown fields yet —
    // copy what we can from the source contract and default the rest to 0.
    allowanceFoodPerDay: formatToNumber(source?.foodAllowancePerDay),
    allowanceFemaleLunchPerDay: 0,
    allowanceMilkMonthly: 0,
    allowanceHousing: 0,
    allowanceTransport: formatToNumber(source?.transportAllowance),
    allowanceOtFoodPerHour: 0,
    allowanceUnionFeeMonthly: 0,
    allowanceSkill: formatToNumber(source?.skillAllowance),
    bonusAttendance: formatToNumber(source?.attendanceBonus),
    bonusPosition: 0,
    bonusTechnical: 0,
    skillLevel: formatToString(source?.skillLevel) || "NONE",
    otRateNormal: formatToNumber(source?.otRateNormal),
    otRateExcess: formatToNumber(source?.otRateExcess),
  };
};

export default function ContractPanel({ open, setOpen, employee, editingContract, renewFrom }: Props) {
  const isEdit = !!editingContract;
  const isRenewal = !editingContract && !!renewFrom;
  const [isLoading, setIsLoading] = React.useState(false);

  const { createContract, updateContract } = useMutateContract();

  const form = useForm<ContractValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: buildDefaultValues(employee, editingContract, renewFrom),
    mode: "onChange",
  });

  React.useEffect(() => {
    if (open) {
      form.reset(buildDefaultValues(employee, editingContract, renewFrom));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editingContract, renewFrom]);

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({ fields: contractFields, errors: form.formState.errors });
      return;
    }

    const values = form.getValues();
    setIsLoading(true);

    const mutationOptions = {
      onSuccess: () => setOpen(false),
      onSettled: () => setIsLoading(false),
    };

    if (isEdit) {
      await updateContract({ contractId: editingContract?.id, request: values }, mutationOptions);
    } else {
      await createContract({ request: values }, mutationOptions);
    }
  };

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto px-5 py-5">
        <SheetHeader className="px-0">
          <SheetTitle>{isEdit ? "Update Contract" : isRenewal ? "Renew Contract" : "New Contract"}</SheetTitle>
          <SheetDescription>
            {isEdit ? "Update" : isRenewal ? "Renewing" : "Creating"} for{" "}
            <span className="font-medium text-foreground">{fullNameEn || "this employee"}</span>
            {employee.empCode ? ` · ${employee.empCode}` : ""}
          </SheetDescription>
          {isRenewal && (
            <p className="text-xs text-muted-foreground bg-secondary/40 rounded-md px-3 py-2 mt-1">
              We copied the salary and allowance terms from the current contract — just confirm the new dates below.
            </p>
          )}
        </SheetHeader>

        <Form {...form}>
          <div className="space-y-6 pb-20">
            <div>
              <p className="text-sm font-medium mb-3">Contract basics</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldsByKeys(basicsKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof ContractValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-3">Salary &amp; pay</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldsByKeys(salaryKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof ContractValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-3">Skill &amp; overtime</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldsByKeys(skillKeys).map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name={item.key as keyof ContractValues}
                    render={(field) => <RenderField form={{ ...item, field }} />}
                  />
                ))}
              </div>
            </div>

            <ActionButton
              setOpen={setOpen}
              handleSubmit={onSubmit}
              submitTitle={isEdit ? "Save Changes" : "Save Contract"}
              isLoading={isLoading}
              disable={isLoading}
            />
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
