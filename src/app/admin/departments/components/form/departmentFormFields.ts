import { IDepartment } from "@/types/admin";

export const departmentFields = [
  {
    label: "Department Name",
    key: "name",
    type: "text",
    required: true,
    placeholder: "Finance department",
  },
];

export const getDepartmentValues = (data?: IDepartment) => ({
  name: data?.name ?? "",
});
