import { ISection } from "@/types/admin";

export const sectionFields = [
  {
    label: "Name",
    key: "name",
    type: "text",
    required: true,
    placeholder: "Section Name",
  },
  {
    label: "Description",
    key: "description",
    type: "textarea",
    required: false,
    placeholder: "Section Description",
  },
];

export const getSectionValues = (data?: ISection) => ({
  name: data?.name ?? "",
  description: data?.description ?? "",
  departmentId: data?.departmentId ?? 0,
});
