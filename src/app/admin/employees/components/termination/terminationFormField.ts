import { FieldDefinition } from "@/components/shared/form/RenderField";
import { formatToNumber, formatToString } from "@/lib/custom-format";
import { ITermination } from "@/types/admin/termination";

export const TERMINATION_TYPE_OPTIONS = [
  { label: "ឈប់ដោយកំហុស (Serious Misconduct)", value: "misconduct" },
  { label: "ឈប់ដោយគ្មានកំហុស (Without Misconduct)", value: "without_misconduct" },
  { label: "បញ្ចប់កិច្ចសន្យា (End of Contract)", value: "normal_end" },
];

export const CONTRACT_TYPE_OPTIONS = [
  { label: "កិច្ចសន្យាកំណត់រយៈពេល (FDC)", value: "FDC" },
  { label: "កិច្ចសន្យាមិនកំណត់រយៈពេល (UDC)", value: "UDC" },
];

export const terminationBaseFields: FieldDefinition[] = [
  {
    label: "ប្រភេទកិច្ចសន្យា (Contract Type)",
    key: "contractType",
    type: "select",
    required: true,
    options: CONTRACT_TYPE_OPTIONS,
    helper: "FDC = កិច្ចសន្យាកំណត់រយៈពេល | UDC = កិច្ចសន្យាមិនកំណត់រយៈពេល",
  },
  {
    label: "ប្រភេទការបញ្ចប់ការងារ (Termination Type)",
    key: "terminationType",
    type: "select",
    required: true,
    options: TERMINATION_TYPE_OPTIONS,
    helper:
      "ឈប់ដោយកំហុស: បង់តែប្រាក់ខែ + AL | ឈប់ដោយគ្មានកំហុស: បន្ថែមសំណងជូនដំណឹង ឬ 5% FDC | បញ្ចប់កិច្ចសន្យា FDC: បន្ថែម 5% indemnity",
  },
];

export const terminationSalaryFields: FieldDefinition[] = [
  {
    label: "ប្រាក់ខែមូលដ្ឋាន ($)",
    key: "basicSalary",
    type: "number",
    required: true,
    helper: "ប្រាក់ខែប្រចាំខែ | គណនា: ប្រាក់ឈ្នួលថ្ងៃ = ប្រាក់ខែ ÷ 26",
  },
  {
    label: "ចំនួនថ្ងៃប្រាក់ខែដែលនៅសល់",
    key: "unpaidSalary",
    type: "number",
    required: true,
    helper: "ថ្ងៃធ្វើការដែលបានធ្វើការប៉ុន្តែមិនទាន់បានទូទាត់ | គណនា: ប្រាក់ឈ្នួលថ្ងៃ × ចំនួនថ្ងៃ",
  },
  {
    label: "ចំនួនថ្ងៃឈប់សម្រាកប្រចាំឆ្នាំនៅសល់ (AL)",
    key: "remainingAnnualLeave",
    type: "number",
    required: true,
    helper: "ថ្ងៃឈប់សម្រាកប្រចាំឆ្នាំដែលមិនទាន់ប្រើ | គណនា: ប្រាក់ឈ្នួលថ្ងៃ × ចំនួនថ្ងៃ AL",
  },
];

const REQUIRED_NOTICE_OPTIONS = [
  { label: "តិចជាង 6 ខែ (< 6 months) — 7 ថ្ងៃ", value: 7 },
  { label: "6 ខែ – 2 ឆ្នាំ (6 months – 2 years) — 15 ថ្ងៃ", value: 15 },
  { label: "2 – 5 ឆ្នាំ (2 – 5 years) — 1 ខែ (30 ថ្ងៃ)", value: 30 },
  { label: "5 – 10 ឆ្នាំ (5 – 10 years) — 2 ខែ (60 ថ្ងៃ)", value: 60 },
  { label: "លើសពី 10 ឆ្នាំ (> 10 years) — 3 ខែ (90 ថ្ងៃ)", value: 90 },
];

// Only when contract type = UDC
export const terminationUDCFields: FieldDefinition[] = [
  {
    label: "ចំនួនថ្ងៃជូនដំណឹងដែលបានផ្តល់",
    key: "noticeDays",
    type: "number",
    required: false,
    helper: "ចំនួនថ្ងៃជូនដំណឹងដែលនិយោជកបានផ្តល់ជាក់ស្តែងមុនពេលបញ្ចប់ការងារ",
  },
  {
    label: "អាយុការងារ → ថ្ងៃជូនដំណឹងដែលត្រូវការ",
    key: "requiredNoticeDays",
    type: "select",
    dataType: "number",
    required: false,
    options: REQUIRED_NOTICE_OPTIONS,
    helper: "ជ្រើសរើសតាមអាយុការងារ។ ប្រើសម្រាប់គណនាសំណងជូនដំណឹងប៉ុណ្ណោះ — មិនបញ្ជូនទៅ backend។",
  },
];

// Only when contract type = FDC
export const terminationFDCFields: FieldDefinition[] = [
  {
    label: "ប្រាក់ខែសរុបក្នុងអំឡុងកិច្ចសន្យា FDC ($)",
    key: "salaryEarnedFdc",
    type: "number",
    required: false,
    helper: "ប្រាក់ខែសរុបដែលទទួលបានក្នុងអំឡុងកិច្ចសន្យា FDC ទាំងមូល | គណនា: 5% indemnity = ប្រាក់ខែសរុប × 5%",
  },
];

export const terminationAllowanceFields: FieldDefinition[] = [
  {
    label: "ប្រាក់បន្ថែមផ្សេងៗ ($)",
    key: "otherAllowance",
    type: "number",
    required: false,
    helper: "ប្រាក់បន្ថែមណាមួយដែលត្រូវបន្ថែមក្នុងការទូទាត់ចុងក្រោយ ឧ. ថ្លៃធ្វើដំណើរ ថ្លៃជួល",
  },
  {
    label: "ការកាត់ប្រាក់ ($)",
    key: "deduction",
    type: "number",
    required: false,
    helper: "ចំនួនទឹកប្រាក់ត្រូវកាត់ចេញពីការទូទាត់ចុងក្រោយ ឧ. ប្រាក់កក់ ប្រាក់កម្ចី",
  },
  {
    label: "ចំណាំ",
    key: "remark",
    type: "textarea",
    required: false,
  },
];

// Only when contract type = FDC + termination = without misconduct
export const terminationDamagesFields: FieldDefinition[] = [
  {
    label: "សំណងខូចខាត ($) — ជម្រើសបន្ថែម",
    key: "damages",
    type: "number",
    required: false,
    helper: "សំណងខូចខាតជម្រើសសម្រាប់ FDC បញ្ចប់មុនកំណត់ដោយគ្មានកំហុស | ដាក់ 0 ប្រសិនមិនអនុវត្ត",
  },
];

export const getTerminationValues = (data?: ITermination): any => ({
  employeeId: formatToNumber(data?.employeeId),
  contractType: formatToString(data?.contractType),
  terminationType: formatToString(data?.terminationType),
  basicSalary: formatToNumber(data?.basicSalary),
  unpaidSalary: formatToNumber(data?.unpaidSalary),
  remainingAnnualLeave: formatToNumber(data?.remainingAnnualLeave),
  noticeDays: formatToNumber(data?.noticeDays),
  requiredNoticeDays: 0,
  salaryEarnedFdc: formatToNumber(data?.salaryEarnedFdc),
  other: formatToNumber(data?.other),
  deduction: formatToNumber(data?.deduction),
  damages: formatToNumber(data?.damages),
  remark: formatToString(data?.remark),
});
