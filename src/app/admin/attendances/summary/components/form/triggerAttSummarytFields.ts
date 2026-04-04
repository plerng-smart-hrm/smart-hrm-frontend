import { FieldDefinition } from "@/components/shared/form/RenderField";
import { formatToTodayDate } from "@/utils/shared-format";

export const triggerAttSummaryFields: FieldDefinition[] = [
  {
    label: "Date",
    key: "date",
    type: "date",
    required: true,
  },
];

export const getTriggerAttSummaryValues = (): any => ({
  date: formatToTodayDate(),
});
