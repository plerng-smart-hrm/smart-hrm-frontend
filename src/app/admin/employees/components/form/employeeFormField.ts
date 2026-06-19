import { FieldDefinition } from "@/components/shared/form/RenderField";
import { EmployeeStatus } from "@/enums/employeeStatus";
import { EmployeeType } from "@/enums/employeeType";
import { Gender } from "@/enums/gender";
import { MaritalStatus } from "@/enums/maritalStatus";
import { WorkStatus } from "@/enums/workStatus";

export const employeeFields: FieldDefinition[] = [
  {
    label: "Emp Code",
    key: "empCode",
    type: "text",
    required: true,
  },
  {
    label: "First Name",
    key: "firstName",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    key: "lastName",
    type: "text",
    required: true,
  },
  {
    label: "First Name (KH)",
    key: "firstNameKh",
    type: "text",
    required: false,
  },
  {
    label: "Last Name (KH)",
    key: "lastNameKh",
    type: "text",
    required: false,
  },
  {
    label: "Gender",
    key: "gender",
    type: "select",
    required: true,
    options: [
      { label: "Male", value: Gender.M },
      { label: "Female", value: Gender.F },
    ],
  },
  {
    label: "Date Of Birth",
    key: "dateOfBirth",
    type: "date",
    required: true,
  },
  {
    label: "Place Of Birth",
    key: "placeOfBirth",
    type: "text",
    required: false,
  },
  {
    label: "Nationality",
    key: "nationality",
    type: "text",
    required: false,
  },
  {
    label: "race",
    key: "race",
    type: "text",
    required: false,
  },
  {
    label: "Marital Status",
    key: "maritalStatus",
    type: "select",
    required: true,
    options: [
      { label: "Single", value: MaritalStatus.SINGLE },
      { label: "Married", value: MaritalStatus.MARRIED },
      { label: "Divorced", value: MaritalStatus.DIVORCED },
      { label: "Widowed", value: MaritalStatus.WIDOWED },
    ],
  },
  {
    label: "Children Number",
    key: "childrenNumber",
    type: "number",
    required: false,
  },
  {
    label: "Phone",
    key: "phone",
    type: "phone",
    required: false,
  },
  {
    label: "Current Address",
    key: "currentAddress",
    type: "textarea",
    required: false,
  },
  {
    label: "Education",
    key: "education",
    type: "text",
    required: false,
  },
  {
    label: "Employee Type",
    key: "employeeType",
    type: "select",
    required: true,
    options: [
      { label: "Single", value: EmployeeType.SINGLE },
      { label: "Married", value: EmployeeType.MARRIED },
      { label: "Divorced", value: EmployeeType.DIVORCED },
      { label: "Widowed", value: EmployeeType.WIDOWED },
    ],
  },
  {
    label: "Work Status",
    key: "workStatus",
    type: "select",
    required: true,
    options: [
      { label: "Work", value: WorkStatus.WORK },
      { label: "Resigned", value: WorkStatus.RESIGNED },
    ],
  },
  {
    label: "Employee Status",
    key: "employeeStatus",
    type: "select",
    required: true,
    options: [
      { label: "Probation", value: EmployeeStatus.PROBATION },
      { label: "Contract", value: EmployeeStatus.CONTRACT },
      { label: "Permanent", value: EmployeeStatus.PERMANENT },
    ],
  },
  {
    label: "Start",
    key: "start",
    type: "date",
    required: true,
  },
  {
    label: "Position",
    key: "position",
    type: "text",
    required: true,
  },
  {
    label: "Start Sate",
    key: "startDate",
    type: "date",
    required: true,
  },
  {
    label: "End Date",
    key: "endDate",
    type: "date",
    required: false,
  },
  {
    label: "Labor book no",
    key: "laborBookNo",
    type: "text",
    required: false,
  },
  {
    label: "ID Card No",
    key: "idCardNo",
    type: "text",
    required: false,
  },
  {
    label: "NSSF Register No",
    key: "nssfRegisterNo",
    type: "text",
    required: false,
  },
  {
    label: "Working Shift",
    key: "timeShiftId",
    type: "select",
    required: true,
  },
];
