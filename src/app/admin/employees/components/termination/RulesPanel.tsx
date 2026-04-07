const ALL_RULES = [
  {
    title: "១. ឈប់ដោយកំហុស (Misconduct)",
    color: "border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800",
    titleColor: "text-red-700 dark:text-red-400",
    items: [
      "បង់ប្រាក់ខែដែលនៅសល់ (Unpaid Salary)",
      "បង់ AL ដែលនៅសល់ (Annual Leave)",
      "សំណងជូនដំណឹង = 0",
      "FDC 5% indemnity = 0",
      "សំណងខូចខាត = 0",
      "សរុប = ប្រាក់ខែ + AL + ប្រាក់បន្ថែម − កាត់ប្រាក់",
    ],
  },
  {
    title: "២. ឈប់ដោយគ្មានកំហុស (Without Misconduct)",
    color: "border-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-800",
    titleColor: "text-yellow-700 dark:text-yellow-500",
    items: [
      "បង់ប្រាក់ខែដែលនៅសល់ + AL",
      "UDC: បន្ថែមសំណងជូនដំណឹង (ប្រសិនថ្ងៃផ្តល់ < ថ្ងៃត្រូវការ)",
      "FDC: បន្ថែម 5% indemnity + សំណងខូចខាត (ប្រសិនមាន)",
      "សរុប = ប្រាក់ខែ + AL + សំណងជូនដំណឹង + 5% + ប្រាក់បន្ថែម + ខូចខាត − កាត់",
    ],
  },
  {
    title: "៣. បញ្ចប់កិច្ចសន្យា FDC (Normal End)",
    color: "border-green-300 bg-green-50 dark:bg-green-950/30 dark:border-green-800",
    titleColor: "text-green-700 dark:text-green-400",
    items: [
      "FDC តែប៉ុណ្ណោះ",
      "បង់ប្រាក់ខែដែលនៅសល់ + AL",
      "បន្ថែម 5% នៃប្រាក់ខែសរុបក្នុងកិច្ចសន្យា",
      "សំណងជូនដំណឹង = 0",
      "សរុប = ប្រាក់ខែ + AL + 5% + ប្រាក់បន្ថែម − កាត់ប្រាក់",
    ],
  },
];

export default function RulesPanel() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">វិធាននៃការទូទាត់ (Payment Rules)</p>
      <div className="flex gap-3">
        {ALL_RULES.map((rule, i) => (
          <div key={i} className={`flex-1 rounded-md border p-3 space-y-1.5 ${rule.color}`}>
            <p className={`text-[12px] font-semibold ${rule.titleColor}`}>{rule.title}</p>
            <ul className="space-y-0.5">
              {rule.items.map((item, j) => (
                <li key={j} className="flex gap-1.5 text-[12px] text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
