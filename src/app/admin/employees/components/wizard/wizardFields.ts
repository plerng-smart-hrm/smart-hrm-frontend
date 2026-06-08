import { FieldDefinition } from "@/components/shared/form/RenderField";
import { employeeFields } from "../form/employeeFormField";

/** Pulls field definitions out of the existing employeeFields config, in the given order. */
export const pickEmployeeFields = (keys: string[]): FieldDefinition[] =>
  keys
    .map((key) => employeeFields.find((field) => field.key === key))
    .filter((field): field is FieldDefinition => Boolean(field));

export const contractStepFields: FieldDefinition[] = [
  {
    label: "Contract Type",
    key: "contractType",
    type: "select",
    required: true,
    helper: "FDC = Fixed-Duration Contract (has an end date). UDC = Undetermined-Duration Contract (ongoing).",
    options: [
      { label: "UDC — Undetermined Duration", value: "UDC" },
      { label: "FDC — Fixed Duration", value: "FDC" },
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
    required: true,
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
];

export const salaryFields: FieldDefinition[] = [
  {
    label: "Base Salary ($ / month)",
    key: "baseSalary",
    type: "number",
    required: true,
  },
  {
    label: "Food Allowance ($ / day)",
    key: "allowanceFoodPerDay",
    type: "number",
    required: false,
  },
  {
    label: "Female Lunch Allowance ($ / day)",
    key: "allowanceFemaleLunchPerDay",
    type: "number",
    required: false,
  },
  {
    label: "Milk Allowance ($ / month)",
    key: "allowanceMilkMonthly",
    type: "number",
    required: false,
  },
  {
    label: "Housing Allowance ($)",
    key: "allowanceHousing",
    type: "number",
    required: false,
  },
  {
    label: "Transport Allowance ($)",
    key: "allowanceTransport",
    type: "number",
    required: false,
  },
  {
    label: "OT Food Allowance ($ / hr)",
    key: "allowanceOtFoodPerHour",
    type: "number",
    required: false,
  },
  {
    label: "Union Fee Allowance ($ / month)",
    key: "allowanceUnionFeeMonthly",
    type: "number",
    required: false,
  },
  {
    label: "Attendance Bonus ($)",
    key: "bonusAttendance",
    type: "number",
    required: false,
  },
  {
    label: "Position Bonus ($)",
    key: "bonusPosition",
    type: "number",
    required: false,
  },
  {
    label: "Technical Bonus ($)",
    key: "bonusTechnical",
    type: "number",
    required: false,
  },
];

export const skillOvertimeFields: FieldDefinition[] = [
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
    label: "Skill Allowance ($)",
    key: "allowanceSkill",
    type: "number",
    required: false,
  },
  {
    label: "OT Rate — Normal ($ / hr)",
    key: "otRateNormal",
    type: "number",
    required: false,
  },
  {
    label: "OT Rate — Excess ($ / hr)",
    key: "otRateExcess",
    type: "number",
    required: false,
  },
];
