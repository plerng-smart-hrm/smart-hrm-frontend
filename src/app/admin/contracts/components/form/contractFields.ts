import { IContract } from "@/types/admin/contract";
import { FieldDefinition } from "@/components/shared/form/RenderField";
import { formatToNumber, formatToString } from "@/lib/custom-format";

export const contractFields: FieldDefinition[] = [
  {
    label: "Employee Code",
    key: "empCode",
    type: "text",
    required: true,
  },
  {
    label: "Contract Type",
    key: "contractType",
    type: "select",
    required: true,
    options: [
      { label: "UDC", value: "UDC" },
      { label: "FDC", value: "FDC" },
    ],
  },
  {
    label: "Start Date",
    key: "startDate",
    type: "date",
    required: true,
  },
  {
    label: "End Date",
    key: "endDate",
    type: "date",
    required: false,
  },
  {
    label: "Status",
    key: "status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
    ],
  },
  {
    label: "Base Salary",
    key: "baseSalary",
    type: "number",
    required: false,
  },
  {
    label: "Food Allowance / Day",
    key: "allowanceFoodPerDay",
    type: "number",
    required: false,
  },
  {
    label: "Female Lunch Allowance / Day",
    key: "allowanceFemaleLunchPerDay",
    type: "number",
    required: false,
  },
  {
    label: "Milk Allowance (Monthly)",
    key: "allowanceMilkMonthly",
    type: "number",
    required: false,
  },
  {
    label: "Housing Allowance",
    key: "allowanceHousing",
    type: "number",
    required: false,
  },
  {
    label: "Transport Allowance",
    key: "allowanceTransport",
    type: "number",
    required: false,
  },
  {
    label: "OT Food Allowance / Hour",
    key: "allowanceOtFoodPerHour",
    type: "number",
    required: false,
  },
  {
    label: "Union Fee Allowance (Monthly)",
    key: "allowanceUnionFeeMonthly",
    type: "number",
    required: false,
  },
  {
    label: "Attendance Bonus",
    key: "bonusAttendance",
    type: "number",
    required: false,
  },
  {
    label: "Position Bonus",
    key: "bonusPosition",
    type: "number",
    required: false,
  },
  {
    label: "Technical Bonus",
    key: "bonusTechnical",
    type: "number",
    required: false,
  },
  {
    label: "Skill Level",
    key: "skillLevel",
    type: "select",
    required: true,
    options: [
      { label: "NONE", value: "NONE" },
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
    ],
  },
  {
    label: "Skill Allowance",
    key: "allowanceSkill",
    type: "number",
    required: false,
  },
  {
    label: "OT Rate Normal",
    key: "otRateNormal",
    type: "number",
    required: false,
  },
  {
    label: "OT Rate Excess",
    key: "otRateExcess",
    type: "number",
    required: false,
  },
];

export const getContractValues = (contract?: IContract): any => ({
  empCode: formatToString(contract?.empCode ?? contract?.employee?.empCode),
  contractType: formatToString(contract?.contractType),
  startDate: formatToString(contract?.startDate),
  endDate: formatToString(contract?.endDate),
  status: formatToString(contract?.status),
  baseSalary: formatToNumber(contract?.baseSalary),
  allowanceFoodPerDay: formatToNumber(contract?.allowanceFoodPerDay ?? contract?.foodAllowancePerDay),
  allowanceFemaleLunchPerDay: formatToNumber(contract?.allowanceFemaleLunchPerDay),
  allowanceMilkMonthly: formatToNumber(contract?.allowanceMilkMonthly),
  allowanceHousing: formatToNumber(contract?.allowanceHousing),
  allowanceTransport: formatToNumber(contract?.allowanceTransport ?? contract?.transportAllowance),
  allowanceOtFoodPerHour: formatToNumber(contract?.allowanceOtFoodPerHour),
  allowanceUnionFeeMonthly: formatToNumber(contract?.allowanceUnionFeeMonthly),
  allowanceSkill: formatToNumber(contract?.allowanceSkill ?? contract?.skillAllowance),
  bonusAttendance: formatToNumber(contract?.bonusAttendance ?? contract?.attendanceBonus),
  bonusPosition: formatToNumber(contract?.bonusPosition),
  bonusTechnical: formatToNumber(contract?.bonusTechnical),
  skillLevel: formatToString(contract?.skillLevel),
  otRateNormal: formatToNumber(contract?.otRateNormal),
  otRateExcess: formatToNumber(contract?.otRateExcess),
});
