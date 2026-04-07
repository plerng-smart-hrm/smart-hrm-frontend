import { FieldDefinition } from "@/components/shared/form/RenderField";

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
    key: "unpaidSalaryDays",
    type: "number",
    required: true,
    helper: "ថ្ងៃធ្វើការដែលបានធ្វើការប៉ុន្តែមិនទាន់បានទូទាត់ | គណនា: ប្រាក់ឈ្នួលថ្ងៃ × ចំនួនថ្ងៃ",
  },
  {
    label: "ចំនួនថ្ងៃឈប់សម្រាកប្រចាំឆ្នាំនៅសល់ (AL)",
    key: "remainingAnnualLeaveDays",
    type: "number",
    required: true,
    helper: "ថ្ងៃឈប់សម្រាកប្រចាំឆ្នាំដែលមិនទាន់ប្រើ | គណនា: ប្រាក់ឈ្នួលថ្ងៃ × ចំនួនថ្ងៃ AL",
  },
];

// Only when contract type = UDC
export const terminationUDCFields: FieldDefinition[] = [
  {
    label: "ចំនួនថ្ងៃជូនដំណឹងដែលបានផ្តល់",
    key: "noticeDaysGiven",
    type: "number",
    required: false,
    helper: "ចំនួនថ្ងៃជូនដំណឹងដែលនិយោជកបានផ្តល់ជាក់ស្តែងមុនពេលបញ្ចប់ការងារ",
  },
  {
    label: "ចំនួនថ្ងៃជូនដំណឹងដែលត្រូវការ",
    key: "requiredNoticeDays",
    type: "number",
    required: false,
    helper:
      "ចំនួនថ្ងៃជូនដំណឹងអប្បបរមាតាមកិច្ចសន្យា | ប្រសិនថ្ងៃផ្តល់ < ថ្ងៃត្រូវការ: សំណង = (ថ្ងៃត្រូវការ − ថ្ងៃផ្តល់) × ប្រាក់ឈ្នួលថ្ងៃ",
  },
];

// Only when contract type = FDC
export const terminationFDCFields: FieldDefinition[] = [
  {
    label: "ប្រាក់ខែសរុបក្នុងអំឡុងកិច្ចសន្យា FDC ($)",
    key: "totalSalaryEarnedDuringFDC",
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
