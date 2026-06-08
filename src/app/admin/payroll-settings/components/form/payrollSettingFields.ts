import { FieldDefinition } from "@/components/shared/form/RenderField";
import { IPayrollSetting } from "@/types/admin/payroll-setting";

export const payrollSettingFields: FieldDefinition[] = [
  {
    label: "Standard Working Days",
    key: "standardWorkingDays",
    type: "number",
    required: true,
  },
  {
    label: "Standard Working Hours Per Day",
    key: "standardWorkingHoursPerDay",
    type: "number",
    required: true,
  },
  {
    label: "NSSF Pension Rate Employer",
    key: "nssfPensionRateEmployer",
    type: "number",
    required: true,
  },
  {
    label: "Half Month Pay Method",
    key: "halfMonthPayMethod",
    type: "select",
    required: true,
    options: [
      { label: "Divide By Two", value: "DIVIDE_BY_TWO" },
      { label: "Fixed Amount", value: "FIXED_AMOUNT" },
    ],
  },
  {
    label: "Fixed Half Pay Amount",
    key: "fixedHalfPayAmount",
    type: "number",
    required: false,
  },
];

export const getPayrollSettingValues = (data?: IPayrollSetting) => ({
  id: data?.id,
  standardWorkingDays: data?.standardWorkingDays ?? 26,
  standardWorkingHoursPerDay: data?.standardWorkingHoursPerDay ?? 8,
  nssfPensionRateEmployer: data?.nssfPensionRateEmployer ?? 0.02,
  halfMonthPayMethod: data?.halfMonthPayMethod ?? "DIVIDE_BY_TWO",
  fixedHalfPayAmount: data?.fixedHalfPayAmount ?? undefined,
});
