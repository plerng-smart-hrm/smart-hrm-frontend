import { IContract } from "@/types/admin/contract";
import { FieldDefinition } from "@/components/shared/form/RenderField";
import { formatToNumber, formatToString } from "@/lib/custom-format";

export const contractFields: FieldDefinition[] = [
  {
    label: "Employee",
    key: "employeeId",
    type: "number",
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
  {
    label: "Base Salary",
    key: "baseSalary",
    type: "number",
    required: false,
  },
  {
    label: "Food Allowance Per Day",
    key: "foodAllowancePerDay",
    type: "number",
    required: false,
  },
  {
    label: "Transport Allowance",
    key: "transportAllowance",
    type: "number",
    required: false,
  },
  {
    label: "Attendance Bonus",
    key: "attendanceBonus",
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
    key: "skillAllowance",
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
  employeeId: formatToString(contract?.employeeId),
  contractType: formatToString(contract?.contractType),
  startDate: formatToString(contract?.startDate),
  endDate: formatToString(contract?.endDate),
  status: formatToString(contract?.status),
  baseSalary: formatToNumber(contract?.baseSalary),
  foodAllowancePerDay: formatToNumber(contract?.foodAllowancePerDay),
  transportAllowance: formatToNumber(contract?.transportAllowance),
  attendanceBonus: formatToNumber(contract?.attendanceBonus),
  skillLevel: formatToString(contract?.skillLevel),
  skillAllowance: formatToNumber(contract?.skillAllowance),
  otRateNormal: formatToNumber(contract?.otRateNormal),
  otRateExcess: formatToNumber(contract?.otRateExcess),
});
