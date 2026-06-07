"use client";

import React from "react";
import { parseAsString, useQueryState } from "nuqs";
import { CalendarCheck, CalendarClock, CalendarDays, CalendarOff, CalendarX, Clock, Timer, Zap } from "lucide-react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { RenderView, Section } from "@/components/shared/view/RenderView";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { attendanceSummaryKeys } from "@/service/util/query-keys/attendance-summary";
import { formatToYYYYMM } from "@/utils/shared-format";
import { IEmployeeAttendanceSummary } from "@/types/admin/attendance-summary";
import { IEmployee } from "@/types/admin/employee";
import AttendanceTable from "@/app/admin/attendances/detail/components/AttendanceTable";

interface Props {
  employee: IEmployee;
}

const formatHours = (hours?: number) => `${hours ?? 0}h`;

const formatMinutes = (minutes?: number) => {
  const value = minutes ?? 0;
  if (value >= 60) {
    return `${Math.floor(value / 60)}h ${value % 60}m`;
  }
  return `${value}m`;
};

export default function AttendanceTab({ employee }: Props) {
  const [yearMonth, setYearMonth] = useQueryState("yearMonth", parseAsString.withDefault(formatToYYYYMM()));
  const [selectedMonth, setSelectedMonth] = React.useState(() => new Date(`${formatToYYYYMM()}-01`));

  const { data, isFetching } = useQueryShared({
    url: `/v1/att-summaries/employee`,
    key: `${attendanceSummaryKeys.summary_by_employee}_${employee?.id}_${yearMonth}`,
    param: { employeeId: employee?.id, yearMonth },
    enable: !!employee.id,
  });

  const attSummary = (data?.data as IEmployeeAttendanceSummary) ?? undefined;
  const totals = attSummary?.totals;

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
    setYearMonth(formatToYYYYMM(date));
  };

  return (
    <div className="relative">
      <LoadingOverlay isLoading={isFetching} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <Section title="Attendance Calendar" icon={<CalendarClock className="h-4 w-4" />}>
            <AttendanceTable
              attendanceData={attSummary?.attendanceSummary ?? []}
              selectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
            />
          </Section>
        </div>

        <div className="lg:col-span-3 lg:border-l lg:pl-6">
          <Section title="Monthly Summary" icon={<Clock className="h-4 w-4" />}>
            <RenderView
              className="grid grid-cols-1 gap-4"
              fields={[
                {
                  icon: <Clock className="h-4 w-4" />,
                  label: "Working Hours",
                  value: formatHours(totals?.totalWorkingHours),
                },
                {
                  icon: <Timer className="h-4 w-4" />,
                  label: "Late Minutes",
                  value: formatMinutes(totals?.totalLateMinutes),
                },
                { icon: <Zap className="h-4 w-4" />, label: "OT1", value: formatHours(totals?.totalOt1) },
                { icon: <Zap className="h-4 w-4" />, label: "OT2", value: formatHours(totals?.totalOt2) },
                { icon: <CalendarCheck className="h-4 w-4" />, label: "Present Days", value: totals?.presentDays },
                { icon: <CalendarX className="h-4 w-4" />, label: "Absent Days", value: totals?.absentDays },
                { icon: <CalendarOff className="h-4 w-4" />, label: "Leave Days", value: totals?.leaveDays },
                { icon: <CalendarDays className="h-4 w-4" />, label: "Holiday Days", value: totals?.holidayDays },
              ]}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}
