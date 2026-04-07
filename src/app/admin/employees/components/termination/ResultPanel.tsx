import { Separator } from "@/components/ui/separator";
import { CalculationResult } from "./TerminationForm";

export default function ResultPanel({
  result,
  isFDC,
  isWithoutMisconduct,
}: {
  result?: CalculationResult;
  isFDC: boolean;
  isWithoutMisconduct: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm  text-gray-700 dark:text-gray-200">សង្ខេបការទូទាត់ (Result Breakdown)</p>
      <div className="rounded-md border p-3 space-y-0.5">
        <ResultRow label="ប្រាក់ឈ្នួលថ្ងៃ (Daily Wage)" value={result?.dailyWage} />
        <ResultRow label="ប្រាក់ខែនៅសល់ (Unpaid Salary)" value={result?.unpaidSalary} />
        <ResultRow label="សំណង AL (Annual Leave)" value={result?.annualLeavePayment} />
        <ResultRow
          label="សំណងជូនដំណឹង (Notice Compensation)"
          value={result?.noticeCompensation}
          dimmed={result?.noticeCompensation === 0}
        />
        <ResultRow label="FDC 5% Indemnity" value={result?.fdcIndemnity} dimmed={result?.fdcIndemnity === 0} />
        <ResultRow label="ប្រាក់បន្ថែម (Other)" value={result?.other} />
        {isFDC && isWithoutMisconduct && (
          <ResultRow label="សំណងខូចខាត (Damages)" value={result?.damages} dimmed={result?.damages === 0} />
        )}
        <ResultRow label="កាត់ប្រាក់ (Deduction)" value={result?.deduction} />
        <Separator className="my-1" />
        <ResultRow label="សរុបចុងក្រោយ (Final Total)" value={result?.finalTotal} highlight />
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
  dimmed = false,
}: {
  label?: string;
  value?: number;
  highlight?: boolean;
  dimmed?: boolean;
}) {
  return (
    <div
      className={`flex justify-between py-1.5 px-2 rounded text-sm ${
        highlight ? "bg-primary/10 font-semibold" : ""
      } ${dimmed ? "opacity-40" : ""}`}
    >
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <span className={highlight ? "text-primary" : ""}>${value ? value.toFixed(2) : 0}</span>
    </div>
  );
}
