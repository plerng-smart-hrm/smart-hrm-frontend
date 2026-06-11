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
import AttendanceTable, { AttCellClickInfo } from "@/app/admin/attendances/detail/components/AttendanceTable";
import PayrollSummaryTable from "@/app/admin/attendances/detail/components/PayrollSummaryTable";
import AttPanel, { AttCellInfo } from "../panels/AttPanel";
import { IPayroll } from "@/types/admin/payroll";

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
  const selectedMonth = new Date(`${yearMonth}-01`);
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [cellInfo, setCellInfo] = React.useState<AttCellInfo | null>(null);

  const { data, isFetching } = useQueryShared({
    url: `/v1/att-summaries/employee`,
    key: `${attendanceSummaryKeys.summary_by_employee}_${employee?.id}_${yearMonth}`,
    param: { employeeId: employee?.id, yearMonth },
    enable: !!employee.id,
  });

  const { data: payrollData, isLoading: isPayrollDataLoading } = useQueryShared({
    url: `/v1/payrolls/employee`,
    key: `${attendanceSummaryKeys.summary_by_employee}_${employee?.id}_${yearMonth}`,
    param: { employeeId: employee?.id, payrollMonth: yearMonth },
    enable: !!employee.id,
  });

  console.log("payrollData", payrollData);

  const payroll = (payrollData?.data as IPayroll) ?? undefined;

  const attSummary = (data?.data as IEmployeeAttendanceSummary) ?? undefined;
  const totals = attSummary?.totals;

  const handleMonthChange = (date: Date) => {
    setYearMonth(formatToYYYYMM(date));
  };

  const handleCellClick = ({ record, fieldChanged, oldValue }: AttCellClickInfo) => {
    setCellInfo({ record, fieldChanged, oldValue });
    setPanelOpen(true);
  };

  return (
    <div className="relative">
      <LoadingOverlay isLoading={isFetching} />

      <AttPanel open={panelOpen} setOpen={setPanelOpen} employeeId={employee.id!} cellInfo={cellInfo} />

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <Section title="Attendance Calendar" icon={<CalendarClock className="h-4 w-4" />}>
            <AttendanceTable
              attendanceData={attSummary}
              selectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
              onCellClick={handleCellClick}
            />
          </Section>
        </div>

        <div className="lg:col-span-3 lg:border-l lg:pl-6 mt-10">
          <Section title="Payroll Summary" icon={<CalendarClock className="h-4 w-4" />}>
            <PayrollSummaryTable payroll={payroll} />
          </Section>
        </div>
      </div>
    </div>
  );
}
