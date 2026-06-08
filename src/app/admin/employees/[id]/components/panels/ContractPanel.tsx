"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import SharedSheet from "@/components/shared/SharedSheet";
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

const fieldsByKeys = (keys: string[]) =>
  keys.map((key) => contractFields.find((f) => f.key === key)).filter(Boolean) as typeof contractFields;

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: IEmployee;
  /** Existing contract being edited (update mode) */
  editingContract?: IContract;
  /** Reference contract to copy salary/allowance terms from when starting a renewal (create mode) */
  renewFrom?: IContract;
}

const buildDefaultValues = (
  employee: IEmployee,
  editingContract?: IContract,
  renewFrom?: IContract,
): ContractValues => {
  const source = editingContract ?? renewFrom;
  const isRenewal = !editingContract && !!renewFrom;

  return {
    empCode: employee.empCode ?? "",
    contractType: formatToString(source?.contractType),
    startDate: isRenewal ? "" : formatToString(source?.startDate),
    endDate: isRenewal ? "" : formatToString(source?.endDate),
    status: formatToString(source?.status) || "ACTIVE",
    baseSalary: formatToNumber(source?.baseSalary),
    allowanceFoodPerDay: formatToNumber(source?.allowanceFoodPerDay ?? source?.foodAllowancePerDay),
    allowanceFemaleLunchPerDay: formatToNumber(source?.allowanceFemaleLunchPerDay),
    allowanceMilkMonthly: formatToNumber(source?.allowanceMilkMonthly),
    allowanceHousing: formatToNumber(source?.allowanceHousing),
    allowanceTransport: formatToNumber(source?.allowanceTransport ?? source?.transportAllowance),
    allowanceOtFoodPerHour: formatToNumber(source?.allowanceOtFoodPerHour),
    allowanceUnionFeeMonthly: formatToNumber(source?.allowanceUnionFeeMonthly),
    allowanceSkill: formatToNumber(source?.allowanceSkill ?? source?.skillAllowance),
    bonusAttendance: formatToNumber(source?.bonusAttendance ?? source?.attendanceBonus),
    bonusPosition: formatToNumber(source?.bonusPosition),
    bonusTechnical: formatToNumber(source?.bonusTechnical),
    skillLevel: formatToString(source?.skillLevel) || "NONE",
    otRateNormal: formatToNumber(source?.otRateNormal),
    otRateExcess: formatToNumber(source?.otRateExcess),
  };
};

export default function ContractPanel({ open, setOpen, employee, editingContract, renewFrom }: Props) {
  const isEdit = !!editingContract;
  const isRenewal = !editingContract && !!renewFrom;
  const [isLoading, setIsLoading] = React.useState(false);

  const { createContract, updateContract, renewContract } = useMutateContract();

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
      updateContract({ contractId: editingContract?.id, request: values }, mutationOptions);
    } else if (isRenewal) {
      const { empCode: _, ...renewValues } = values;
      renewContract({ contractId: renewFrom?.id, request: renewValues }, mutationOptions);
    } else {
      createContract({ request: values }, mutationOptions);
    }
  };

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  return (
    <SharedSheet
      open={open}
      setOpen={setOpen}
      title={isEdit ? "Update Contract" : isRenewal ? "Renew Contract" : "New Contract"}
      desc={`${isEdit ? "Update" : isRenewal ? "Renewing" : "Creating"} for ${fullNameEn || "this employee"}${employee.empCode ? ` · ${employee.empCode}` : ""}`}
      width="42rem"
    >
      {isRenewal && (
        <p className="text-xs text-muted-foreground bg-secondary/40 rounded-md px-3 py-2 mb-4">
          We copied the salary and allowance terms from the current contract — just confirm the new dates below.
        </p>
      )}

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
    </SharedSheet>
  );
}
