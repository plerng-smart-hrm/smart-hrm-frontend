import { FieldDefinition } from "@/components/shared/form/RenderField";
import { formatToNumber, formatToString } from "@/lib/custom-format";
import { IAttAdjustment } from "@/types/admin/att-adjustment";
import { formatToTodayDate } from "@/utils/shared-format";

const TIME_FIELDS = ["FIRST_IN", "FIRST_OUT", "SECOND_IN", "SECOND_OUT"];

export const getAttAdjustmentFields = (fieldChanged?: string): FieldDefinition[] => {
  const isTimeField = TIME_FIELDS.includes(fieldChanged ?? "");
  const valueType = isTimeField ? "time" : "text";

  return [
    {
      label: "Attendance Summary ID",
      key: "attendanceSummaryId",
      type: "number",
      required: true,
    },
    {
      label: "Employee Code",
      key: "empCode",
      type: "text",
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
        { label: "FIRST_IN", value: "FIRST_IN" },
        { label: "FIRST_OUT", value: "FIRST_OUT" },
        { label: "SECOND_IN", value: "SECOND_IN" },
        { label: "SECOND_OUT", value: "SECOND_OUT" },
        { label: "STATUS", value: "STATUS" },
      ],
    },
    {
      label: "Old Value",
      key: "oldValue",
      type: valueType,
    },
    {
      label: "New Value",
      key: "newValue",
      type: valueType,
      required: true,
    },
    {
      label: "Reason",
      key: "reason",
      type: "textarea",
      required: false,
    },
  ];
};

export const attAdjustmentFields = getAttAdjustmentFields();

export const getAttAdjustmentValues = (initialData?: IAttAdjustment): any => ({
  attendanceSummaryId: formatToNumber(initialData?.attendanceSummaryId),
  empCode: formatToString(initialData?.employee?.empCode),
  date: formatToString(initialData?.date) || formatToTodayDate(),
  fieldChanged: formatToString(initialData?.fieldChanged),
  oldValue: formatToString(initialData?.oldValue),
  newValue: formatToString(initialData?.newValue),
  reason: formatToString(initialData?.reason),
});
