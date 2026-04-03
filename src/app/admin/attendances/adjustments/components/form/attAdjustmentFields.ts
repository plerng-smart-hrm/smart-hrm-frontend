import { FieldDefinition } from "@/components/shared/form/RenderField";
import { formatToNumber, formatToString } from "@/lib/custom-format";
import { IAttAdjustment } from "@/types/admin/att-adjustment";

export const attAdjustmentFields: FieldDefinition[] = [
  {
    label: "Attendance Summary ID",
    key: "attendanceSummaryId",
    type: "number",
    required: true,
  },
  {
    label: "Employee",
    key: "employeeId",
    type: "number",
    required: true,
  },

  {
    label: "Date",
    key: "date",
    type: "date",
    required: true,
  },
  {
    label: "Field Changed",
    key: "fieldChanged",
    type: "select",
    required: true,
    options: [
      { label: "CHECK_IN", value: "CHECK_IN" },
      { label: "CHECK_OUT", value: "CHECK_OUT" },
      { label: "STATUS", value: "STATUS" },
    ],
  },
  {
    label: "Old Value",
    key: "oldValue",
    type: "text",
  },
  {
    label: "New Value",
    key: "newValue",
    type: "text",
    required: true,
  },
  {
    label: "Reason",
    key: "reason",
    type: "textarea",
    required: false,
  },
];

export const getAttAdjustmentValues = (initialData?: IAttAdjustment): any => ({
  attendanceSummaryId: formatToNumber(initialData?.attendanceSummaryId),
  employeeId: formatToNumber(initialData?.employeeId),
  date: formatToString(initialData?.date),
  fieldChanged: formatToString(initialData?.fieldChanged),
  oldValue: formatToString(initialData?.oldValue),
  newValue: formatToString(initialData?.newValue),
  reason: formatToString(initialData?.reason),
});
