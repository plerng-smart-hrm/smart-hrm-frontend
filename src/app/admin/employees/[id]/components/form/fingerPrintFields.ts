import { FieldDefinition } from "@/components/shared/form/RenderField";

export const getEnrollFields = (
  deviceOptions: { label: string; value: string }[],
): FieldDefinition[] => [
  {
    label: "Device",
    key: "deviceId",
    type: "select",
    required: true,
    options: deviceOptions,
  },
  {
    label: "Role",
    key: "role",
    type: "number",
    required: false,
  },
  {
    label: "Password",
    key: "password",
    type: "text",
    required: false,
  },
];
