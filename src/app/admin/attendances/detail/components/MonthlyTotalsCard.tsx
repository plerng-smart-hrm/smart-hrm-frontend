"use client";

import {
  Clock,
  Timer,
  CalendarCheck,
  CalendarX,
  CalendarOff,
  CalendarDays,
  Zap,
} from "lucide-react";
import { IAttendanceTotals } from "@/types/admin/attendance-summary";

interface MonthlyTotalsCardProps {
  totals: IAttendanceTotals | null;
}

export default function MonthlyTotalsCard({ totals }: MonthlyTotalsCardProps) {
  if (!totals) {
    return (
      <div className="h-full">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          Monthly Summary
        </h3>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          No data available
        </div>
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
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        Monthly Summary
      </h3>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<Clock className="h-3.5 w-3.5" />}
            label="Working"
            value={formatHours(totals.totalWorkingHours)}
            color="text-blue-600"
            bgColor="bg-blue-50 dark:bg-blue-950"
          />
          <StatCard
            icon={<Timer className="h-3.5 w-3.5" />}
            label="Late"
            value={formatMinutes(totals.totalLateMinutes)}
            color="text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-950"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<Zap className="h-3.5 w-3.5" />}
            label="OT1"
            value={formatHours(totals.totalOt1)}
            color="text-purple-600"
            bgColor="bg-purple-50 dark:bg-purple-950"
          />
          <StatCard
            icon={<Zap className="h-3.5 w-3.5" />}
            label="OT2"
            value={formatHours(totals.totalOt2)}
            color="text-indigo-600"
            bgColor="bg-indigo-50 dark:bg-indigo-950"
          />
        </div>

        <div className="border-t pt-3 mt-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Attendance Days
          </p>
          <div className="grid grid-cols-2 gap-2">
            <DayStatRow
              icon={<CalendarCheck className="h-3 w-3" />}
              label="Present"
              value={totals.presentDays}
              color="text-green-600"
            />
            <DayStatRow
              icon={<CalendarX className="h-3 w-3" />}
              label="Absent"
              value={totals.absentDays}
              color="text-red-600"
            />
            <DayStatRow
              icon={<CalendarOff className="h-3 w-3" />}
              label="Leave"
              value={totals.leaveDays}
              color="text-orange-600"
            />
            <DayStatRow
              icon={<CalendarDays className="h-3 w-3" />}
              label="Holiday"
              value={totals.holidayDays}
              color="text-blue-600"
            />
          </div>
        </div>
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
