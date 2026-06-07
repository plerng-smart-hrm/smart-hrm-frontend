"use client";

import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Hash } from "lucide-react";
import { format, parseISO } from "date-fns";
import { IEmployee } from "@/types/admin/employee";
import { RenderView, Section } from "@/components/shared/view/RenderView";

interface Props {
  employee: IEmployee;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    return format(parseISO(dateStr), "dd MMM yyyy");
  } catch {
    return dateStr;
  }
};

export default function JobTab({ employee }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Work Information">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          fields={[
            { icon: <Hash className="h-4 w-4" />, label: "Position", value: employee.position },
            { icon: <Clock className="h-4 w-4" />, label: "Employee Type", value: employee.employeeType },
            { icon: <Clock className="h-4 w-4" />, label: "Work Status", value: employee.workStatus },
            { icon: <Calendar className="h-4 w-4" />, label: "Start Date", value: formatDate(employee.startDate) },
            { icon: <Calendar className="h-4 w-4" />, label: "End Date", value: formatDate(employee.endDate) },
            { icon: <Clock className="h-4 w-4" />, label: "Working Shift", value: employee.timeShiftId?.toString() },
          ]}
        />
      </Section>

      <Separator />

      <Section title="System Information" icon={<Hash className="h-4 w-4" />}>
        <RenderView
          fields={[
            { icon: <Hash className="h-4 w-4" />, label: "Employee ID", value: employee.id?.toString() },
            { icon: <Calendar className="h-4 w-4" />, label: "Created At", value: formatDate(employee.createdAt) },
            { icon: <Calendar className="h-4 w-4" />, label: "Updated At", value: formatDate(employee.updatedAt) },
          ]}
        />
      </Section>
    </div>
  );
}
