import { FieldDefinition } from "@/components/shared/form/RenderField";
import { IDevice } from "@/types/admin";

export const deviceFields: FieldDefinition[] = [
  {
    label: "Name",
    key: "name",
    type: "text",
    required: true,
  },
  {
    label: "Model",
    key: "model",
    type: "text",
    required: true,
  },
  {
    label: "Location",
    key: "location",
    type: "text",
    required: true,
  },
  {
    label: "IP Address",
    key: "ipAddress",
    type: "text",
    required: false,
  },
  {
    label: "Port",
    key: "port",
    type: "number",
    required: false,
  },
];

export const getDeviceValues = (device?: IDevice) => ({
  name: device?.name ?? "",
  model: device?.model ?? "",
  location: device?.location ?? "",
  ipAddress: device?.ipAddress ?? "",
  port: device?.port,
});
