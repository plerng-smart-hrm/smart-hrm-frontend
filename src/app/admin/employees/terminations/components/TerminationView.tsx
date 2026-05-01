"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Hash, FileText, ClipboardList, Calculator } from "lucide-react";
import { ITermination } from "@/types/admin/termination";
import { RenderView, Section } from "@/components/shared/view/RenderView";
import { formatToDate } from "@/utils/shared-format";
import EmployeeHeader from "@/components/shared/EmployeeHeader";

interface Props {
  termination: ITermination | null;
}

const TERMINATION_TYPE_LABELS: Record<string, string> = {
  misconduct: "ឈប់ដោយកំហុស (Misconduct)",
  without_misconduct: "ឈប់ដោយគ្មានកំហុស (Without Misconduct)",
  normal_end: "បញ្ចប់កិច្ចសន្យា (Normal End)",
};

const CONTRACT_TYPE_LABELS: Record<string, string> = {
  FDC: "FDC — កិច្ចសន្យាកំណត់រយៈពេល",
  UDC: "UDC — កិច្ចសន្យាមិនកំណត់រយៈពេល",
};

const terminationTypeColor = (type?: string) => {
  switch (type) {
    case "misconduct":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    case "without_misconduct":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "normal_end":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function TerminationView({ termination }: Props) {
  if (!termination) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">No termination data available</div>
    );
  }

  return (
    <div className="space-y-6 pr-4 pb-10">
      {/* ── Employee header ── */}
      <EmployeeHeader employee={termination.employee} />

      {/* Termination type badges */}
      <div className="flex flex-wrap gap-2 -mt-2">
        {termination.contractType && (
          <Badge variant="outline" className="font-normal">
            {CONTRACT_TYPE_LABELS[termination.contractType] ?? termination.contractType}
          </Badge>
        )}
        {termination.terminationType && (
          <Badge className={`font-normal ${terminationTypeColor(termination.terminationType)}`}>
            {TERMINATION_TYPE_LABELS[termination.terminationType] ?? termination.terminationType}
          </Badge>
        )}
      </div>

      <Separator />

      {/* ── Input fields ── */}
      <Section title="ព័ត៌មានបញ្ចូល (Input)" icon={<ClipboardList className="h-4 w-4" />}>
        <RenderView
          className="grid-cols-2 lg:grid-cols-4"
          fields={[
            {
              label: "ប្រាក់ខែមូលដ្ឋាន (Basic Salary)",
              value: termination.basicSalary,
            },
            {
              label: "ថ្ងៃប្រាក់ខែនៅសល់ (Unpaid Days)",
              value: termination.unpaidSalary?.toString(),
            },
            {
              label: "ថ្ងៃ AL នៅសល់ (Annual Leave Days)",
              value: termination.remainingAnnualLeave?.toString(),
            },
            {
              label: "ថ្ងៃជូនដំណឹង (Notice Days Given)",
              value: termination.noticeDays?.toString(),
            },
            {
              label: "ប្រាក់ខែ FDC សរុប (Total FDC Salary)",
              value: termination.salaryEarnedFdc,
            },
            {
              label: "ប្រាក់បន្ថែម (Other Allowance)",
              value: termination.other,
            },
            {
              label: "ការកាត់ប្រាក់ (Deduction)",
              value: termination.deduction,
            },
            { label: "សំណងខូចខាត (Damages)", value: termination.damages },
          ]}
        />
      </Section>

      <Separator />

      {/* ── Calculation breakdown ── */}
      <Section title="សង្ខេបការគណនា (Calculation)" icon={<Calculator className="h-4 w-4" />}>
        <RenderView
          className="grid-cols-2 lg:grid-cols-4"
          fields={[
            { label: "ប្រាក់ឈ្នួលថ្ងៃ (Daily Wage)", value: termination.dailyWage },
            { label: "ប្រាក់ខែនៅសល់ (Unpaid Salary)", value: termination.unpaidSalaryAmount },
            { label: "សំណង AL (Annual Leave Payment)", value: termination.annualLeaveAmount },
            { label: "សំណងជូនដំណឹង (Notice Compensation)", value: termination.noticeCompensation },
            { label: "FDC 5% Indemnity", value: termination.fdcIndemnity5Per },
          ]}
        />

        {/* Final total row */}
        <div className="mt-3 rounded-md bg-primary/10 px-4 py-3 flex justify-between items-center">
          <span className="text-sm font-semibold text-primary">សរុបចុងក្រោយ (Final Total Payout)</span>
          <span className="text-lg font-bold text-primary">{termination.finalTotal}</span>
        </div>
      </Section>

      {/* ── Remark ── */}
      {termination.remark && (
        <>
          <Separator />
          <Section title="ចំណាំ (Remark)" icon={<FileText className="h-4 w-4" />}>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{termination.remark}</p>
          </Section>
        </>
      )}

      <Separator />

      {/* ── System info ── */}
      <Section title="System Information" icon={<Hash className="h-4 w-4" />}>
        <RenderView
          fields={[
            { icon: <Hash className="h-4 w-4" />, label: "Termination ID", value: termination.id?.toString() },
            { icon: <Calendar className="h-4 w-4" />, label: "Created At", value: formatToDate(termination.createdAt) },
            { icon: <Calendar className="h-4 w-4" />, label: "Updated At", value: formatToDate(termination.updatedAt) },
          ]}
        />
      </Section>
    </div>
  );
}
