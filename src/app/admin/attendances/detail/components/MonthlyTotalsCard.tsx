"use client";

import {
  Clock,
  Timer,
  CalendarCheck,
  CalendarX,
  CalendarOff,
  CalendarDays,
  Zap,
  Calendar,
  CircleCheck,
} from "lucide-react";
import { IAttendanceTotals } from "@/types/admin/attendance-summary";
import { RenderView } from "@/components/shared/view/RenderView";
import { IEmployee } from "@/types/admin/employee";
import { formatToCurrency } from "@/utils/custom-format";
import { IPayrollPayment } from "@/types/admin/payroll-payment";

interface Props {
  totals: IAttendanceTotals | null;
  employee?: IEmployee | null;
  payrollPayments?: IPayrollPayment[];
}

export default function MonthlyTotalsCard({ totals, employee, payrollPayments }: Props) {
  if (!totals) {
    return (
      <div className="h-full">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          Monthly Summary
        </h3>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">No data available</div>
      </div>
    );
  }

  const formatHours = (hours: number) => {
    return `${hours}h`;
  };

  const formatMinutes = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="h-full">
      <h3 className="text-sm  mb-2 flex items-center gap-2">Monthly Summary</h3>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<Clock className="size-3" />}
            label="Working"
            value={formatHours(totals.totalWorkingHours)}
            color="text-blue-600"
            bgColor="bg-blue-50 dark:bg-blue-950"
          />
          <StatCard
            icon={<Timer className="size-3" />}
            label="Late"
            value={formatMinutes(totals.totalLateMinutes)}
            color="text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-950"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<Zap className="size-3" />}
            label="OT1"
            value={formatHours(totals.totalOt1)}
            color="text-purple-600"
            bgColor="bg-purple-50 dark:bg-purple-950"
          />
          <StatCard
            icon={<Zap className="size-3" />}
            label="OT2"
            value={formatHours(totals.totalOt2)}
            color="text-indigo-600"
            bgColor="bg-indigo-50 dark:bg-indigo-950"
          />
        </div>

        <div className="border-t pt-2 mt-2">
          <h3 className="text-sm  mb-2 flex items-center gap-2">Attendance Days</h3>
          <div className="grid grid-cols-2 gap-2">
            <DayStatRow
              icon={<CalendarCheck className="size-3" />}
              label="Present"
              value={totals.presentDays}
              color="text-green-600"
            />
            <DayStatRow
              icon={<CalendarX className="size-3" />}
              label="Absent"
              value={totals.absentDays}
              color="text-red-600"
            />
            <DayStatRow
              icon={<CalendarOff className="size-3" />}
              label="Leave"
              value={totals.leaveDays}
              color="text-orange-600"
            />
            <DayStatRow
              icon={<CalendarDays className="size-3" />}
              label="Holiday"
              value={totals.holidayDays}
              color="text-blue-600"
            />
          </div>
        </div>

        <RenderView
          className="lg:grid-cols-2 pt-2"
          fields={[
            {
              label: "Basic Salary",
              value: formatToCurrency(employee?.contract?.baseSalary),
            },
            {
              label: "Food Allowance Per Day",
              value: formatToCurrency(employee?.contract?.foodAllowancePerDay),
            },
            {
              label: "Transport Allowance",
              value: formatToCurrency(employee?.contract?.transportAllowance),
            },
            {
              label: "Attendance Bonus",
              value: formatToCurrency(employee?.contract?.attendanceBonus),
            },
            {
              label: "Skill Level",
              value: employee?.contract?.skillLevel,
            },
            {
              label: "Skill Allowance",
              value: formatToCurrency(employee?.contract?.skillAllowance),
            },
            {
              label: "OT Rate Normal",
              value: employee?.contract?.otRateNormal,
            },
            {
              label: "OT Rate Excess",
              value: employee?.contract?.otRateExcess,
            },
          ]}
        />
      </div>

      <div className="space-y-2 mt-4 pt-2 border-t">
        <h3 className="text-sm  mb-2 flex items-center gap-2">Payments</h3>

        {payrollPayments?.length === 0 ? (
          <div>
            <p className="text-center text-muted-foreground">No payment records</p>
          </div>
        ) : (
          <div className="space-y-2">
            {payrollPayments?.map((payment) => (
              <div key={payment.id} className="rounded-lg border bg-blue-500/10 px-2 py-2 text-xs space-y-1.5">
                <div className="flex items-center gap-1 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="truncate">{payment.paymentPeriod ?? "-"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 ">{formatToCurrency(payment.amount)}</div>

                  <div className="flex items-center gap-1 text-muted-foreground">{payment.paymentMethod ?? "-"}</div>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center gap-1">{payment.paymentDate ?? "-"}</div>

                  <div className="flex items-center gap-1">
                    {payment.status === "PAID" ? (
                      <CircleCheck className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                    )}

                    <span>{payment.status ?? "-"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`rounded-lg p-2 ${bgColor}`}>
      <div className={`flex items-center gap-1 ${color} mb-0.5`}>
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
      </div>
      <p className={`text-base font-bold ${color}`}>{value}</p>
    </div>
  );
}

function DayStatRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between bg-muted/50 rounded px-2 py-1">
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <span className={`font-semibold text-xs ${color}`}>{value}</span>
    </div>
  );
}
