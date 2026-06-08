import { FieldDefinition } from "@/components/shared/form/RenderField";

export const warningFields: FieldDefinition[] = [
  {
    label: "Type",
    key: "type",
    type: "select",
    required: true,
    options: [
      { label: "VERBAL", value: "VERBAL" },
      { label: "WRITTEN", value: "WRITTEN" },
      { label: "FINAL_WRITTEN", value: "FINAL_WRITTEN" },
      { label: "SUSPENSION", value: "SUSPENSION" },
      { label: "TERMINATION", value: "TERMINATION" },
    ],
  },
  {
    label: "Remark",
    key: "remark",
    type: "textarea",
    required: false,
  },
  {
    label: "Warning Date",
    key: "warningDate",
    type: "date",
    required: true,
  },
];
