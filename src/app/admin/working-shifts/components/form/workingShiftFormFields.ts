import { IWorkingShift } from "@/types/admin/working-shift";

// Helper function to convert from HH:mm:ss to HH:mm for input
function toShortTime(t: string | undefined) {
  if (!t) return "";
  return t.substring(0, 5); // HH:mm:ss → HH:mm
}

export const basicInfoFields = [
  {
    label: "Name",
    key: "name",
    type: "text",
    required: true,
    placeholder: "Office Morning Shift",
  },
  {
    label: "Description",
    key: "description",
    type: "textarea",
    required: false,
    placeholder: "Standard office working hours",
  },
];

export const timePolicyFields = [
  {
    label: "Break Minutes",
    key: "breakMinutes",
    type: "number",
    required: true,
    placeholder: "60",
  },
  {
    label: "Late Allow Minutes",
    key: "lateAllowMinutes",
    type: "number",
    required: true,
    placeholder: "10",
  },
];

export const morningSessionFields = [
  {
    label: "First In Time",
    key: "firstInTime",
    type: "time",
    required: true,
    placeholder: "08:00",
  },
  {
    label: "First Out Time",
    key: "firstOutTime",
    type: "time",
    required: true,
    placeholder: "12:00",
  },
];

export const afternoonSessionFields = [
  {
    label: "Second In Time",
    key: "secondInTime",
    type: "time",
    required: true,
    placeholder: "13:00",
  },
  {
    label: "Second Out Time",
    key: "secondOutTime",
    type: "time",
    required: true,
    placeholder: "17:00",
  },
];

// Flat array for validation
export const workingShiftFields = [
  ...basicInfoFields,
  ...timePolicyFields,
  ...morningSessionFields,
  ...afternoonSessionFields,
];

export const getWorkingShiftValues = (data?: IWorkingShift) => ({
  name: data?.name ?? "",
  description: data?.description ?? "",
  firstInTime: toShortTime(data?.firstInTime),
  firstOutTime: toShortTime(data?.firstOutTime),
  secondInTime: toShortTime(data?.secondInTime),
  secondOutTime: toShortTime(data?.secondOutTime),
  breakMinutes: data?.breakMinutes ?? 60,
  lateAllowMinutes: data?.lateAllowMinutes ?? 10,
});
