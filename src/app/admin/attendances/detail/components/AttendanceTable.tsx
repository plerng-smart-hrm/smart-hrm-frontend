"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { IDailyAttendance, AttendanceStatus } from "@/types/admin/attendance-summary";
import { cn } from "@/lib/utils";

interface AttendanceTableProps {
  attendanceData: IDailyAttendance[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

// Column configuration
type ColumnKey =
  | "day"
  | "weekday"
  | "dayStatus"
  | "workStatus"
  | "timeIn1"
  | "timeOut1"
  | "timeIn2"
  | "timeOut2"
  | "late"
  | "normal"
  | "otX15"
  | "otX2"
  | "night"
  | "paymentNormal"
  | "paymentOtX15"
  | "paymentOtX2"
  | "paymentNight"
  | "timeSalary"
  | "pieceSalary"
  | "leaveHour"
  | "leavePay"
  | "food";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
  group?: string;
  defaultVisible: boolean;
}

const columnConfigs: ColumnConfig[] = [
  { key: "day", label: "Date", group: "Date", defaultVisible: true },
  { key: "weekday", label: "Weekday", group: "Date", defaultVisible: true },
  { key: "dayStatus", label: "Day Status", defaultVisible: true },
  { key: "workStatus", label: "Work Status", defaultVisible: true },
  { key: "timeIn1", label: "Time In 1", group: "Time", defaultVisible: true },
  { key: "timeOut1", label: "Time Out 1", group: "Time", defaultVisible: true },
  { key: "timeIn2", label: "Time In 2", group: "Time", defaultVisible: true },
  { key: "timeOut2", label: "Time Out 2", group: "Time", defaultVisible: true },
  { key: "late", label: "Late", defaultVisible: true },
  { key: "normal", label: "Normal Hours", defaultVisible: true },
  { key: "otX15", label: "OT x 1.5", group: "Overtime", defaultVisible: true },
  { key: "otX2", label: "OT x 2", group: "Overtime", defaultVisible: true },
  { key: "night", label: "Night", group: "Overtime", defaultVisible: true },
  { key: "paymentNormal", label: "Payment Normal", group: "Payment", defaultVisible: true },
  { key: "paymentOtX15", label: "Payment OT x 1.5", group: "Payment", defaultVisible: true },
  { key: "paymentOtX2", label: "Payment OT x 2", group: "Payment", defaultVisible: true },
  { key: "paymentNight", label: "Payment Night", group: "Payment", defaultVisible: true },
  { key: "timeSalary", label: "Time Salary", defaultVisible: true },
  { key: "pieceSalary", label: "Piece Salary", defaultVisible: true },
  { key: "leaveHour", label: "Leave Hour", group: "Leave", defaultVisible: true },
  { key: "leavePay", label: "Leave Pay", group: "Leave", defaultVisible: true },
  { key: "food", label: "Food", defaultVisible: true },
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateMonthDays = (month: Date): IDailyAttendance[] => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });

  return days.map((date) => {
    const dayOfWeek = getDay(date);
    const isSunday = dayOfWeek === 0;

    return {
      date: format(date, "yyyy-MM-dd"),
      day: dayNames[dayOfWeek],
      time: { fi: null, fo: null, si: null, so: null },
      lateMinutes: 0,
      workingHours: 0,
      status: isSunday ? "HOLIDAY" : "PRESENT",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    } as IDailyAttendance;
  });
};

const mergeAttendanceData = (monthDays: IDailyAttendance[], attendanceData: IDailyAttendance[]): IDailyAttendance[] => {
  const attendanceMap = new Map(attendanceData.map((item) => [item.date, item]));

  return monthDays.map((day) => {
    const existingData = attendanceMap.get(day.date);
    return existingData || day;
  });
};

const getRowBackground = (status: AttendanceStatus, day: string) => {
  if (status === "HOLIDAY") return "bg-blue-100 dark:bg-blue-900/40";
  if (day === "Sun") return "bg-orange-50 dark:bg-orange-900/20";
  if (day === "Sat") return "bg-amber-50 dark:bg-amber-900/20";
  return "bg-yellow-50 dark:bg-yellow-900/20";
};

const getDayStatusStyle = (status: AttendanceStatus, day: string) => {
  if (status === "HOLIDAY") return "text-blue-700 dark:text-blue-300 font-semibold";
  if (day === "Sun" || day === "Sat") return "text-red-600 dark:text-red-400 font-semibold";
  return "text-gray-700 dark:text-gray-300";
};

const getDayStatusLabel = (status: AttendanceStatus, day: string) => {
  if (day === "Sun") return "Sunday";
  if (status === "HOLIDAY") return "PH";
  return "Work";
};

const getWorkStatusLabel = (status: AttendanceStatus) => {
  switch (status) {
    case "HOLIDAY":
      return "PH";
    case "LEAVE":
      return "Leave";
    case "ABSENT":
      return "Absent";
    default:
      return "Work";
  }
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

// Bilingual header label — Khmer above, English below
function HeaderLabel({ kh, en }: { kh: string; en: string }) {
  return (
    <span className="flex flex-col leading-tight">
      <span>{kh}</span>
      <span className="text-[10px] font-normal text-muted-foreground">{en}</span>
    </span>
  );
}

const formatNumber = (value: number) => (value > 0 ? value : "");

export default function AttendanceTable({ attendanceData, selectedMonth, onMonthChange }: AttendanceTableProps) {
  // Initialize visible columns from config
  const [visibleColumns, setVisibleColumns] = useState<Set<ColumnKey>>(() => {
    const initial = new Set<ColumnKey>();
    columnConfigs.forEach((col) => {
      if (col.defaultVisible) initial.add(col.key);
    });
    return initial;
  });

  const toggleColumn = (key: ColumnKey) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const isVisible = (key: ColumnKey) => visibleColumns.has(key);

  const formatTime = (time: string | null) => {
    if (!time) return "";
    return time;
  };

  const monthDays = generateMonthDays(selectedMonth);
  const fullMonthData = mergeAttendanceData(monthDays, attendanceData);

  const totals = fullMonthData.reduce(
    (acc, record) => ({
      normalHours: acc.normalHours + record.workingHours,
      lateMinutes: acc.lateMinutes + record.lateMinutes,
      otX15: acc.otX15 + record.overtime.ot1,
      otX2: acc.otX2 + record.overtime.ot2,
    }),
    { normalHours: 0, lateMinutes: 0, otX15: 0, otX2: 0 },
  );
  const totalLateHours = totals.lateMinutes / 60;

  // Calculate colSpan for each group
  const dateColSpan = [isVisible("day"), isVisible("weekday")].filter(Boolean).length;

  const timeColSpan = [isVisible("timeIn1"), isVisible("timeOut1"), isVisible("timeIn2"), isVisible("timeOut2")].filter(
    Boolean,
  ).length;

  const overtimeColSpan = [isVisible("otX15"), isVisible("otX2"), isVisible("night")].filter(Boolean).length;

  const paymentColSpan = [
    isVisible("paymentNormal"),
    isVisible("paymentOtX15"),
    isVisible("paymentOtX2"),
    isVisible("paymentNight"),
  ].filter(Boolean).length;

  const leaveColSpan = [isVisible("leaveHour"), isVisible("leavePay")].filter(Boolean).length;

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(parseInt(month));
    onMonthChange(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(parseInt(year));
    onMonthChange(newDate);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="pb-2 flex-shrink-0 flex items-center justify-between">
        {/* Month Selector */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handlePreviousMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Select value={selectedMonth.getMonth().toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-8 w-[120px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth.getFullYear().toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="h-8 w-[80px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={() => onMonthChange(new Date())} className="h-8 text-xs ml-1">
            Today
          </Button>
        </div>

        {/* Column Visibility Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Settings2 className="h-3.5 w-3.5 mr-1.5" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {columnConfigs.map((col) => (
                <button
                  type="button"
                  key={col.key}
                  className="flex items-center space-x-2 px-2 py-1.5 hover:bg-muted rounded-sm cursor-pointer"
                  onClick={() => toggleColumn(col.key)}
                >
                  <Checkbox
                    id={col.key}
                    checked={isVisible(col.key)}
                    onCheckedChange={() => toggleColumn(col.key)}
                    className="h-3.5 w-3.5"
                  />
                  <label htmlFor={col.key} className="text-xs cursor-pointer flex-1">
                    {col.label}
                  </label>
                </button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div>
            <table className="w-full border-collapse text-xs">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-200 dark:bg-slate-800">
                  {dateColSpan > 0 && (
                    <th
                      colSpan={dateColSpan}
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold"
                    >
                      <HeaderLabel kh="ថ្ងៃទី" en="Date" />
                    </th>
                  )}
                  {isVisible("dayStatus") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold w-16"
                    >
                      <HeaderLabel kh="ប្រភេទថ្ងៃ" en="DayStatus" />
                    </th>
                  )}
                  {isVisible("workStatus") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold w-16"
                    >
                      <HeaderLabel kh="ថ្ងៃធ្វើការ" en="WorkStatus" />
                    </th>
                  )}
                  {timeColSpan > 0 && (
                    <th
                      colSpan={timeColSpan}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold bg-slate-100 dark:bg-slate-700"
                    >
                      Time
                    </th>
                  )}
                  {isVisible("late") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold bg-cyan-100 dark:bg-cyan-900 w-14"
                    >
                      <HeaderLabel kh="យឺត" en="Late" />
                    </th>
                  )}
                  {isVisible("normal") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold bg-green-100 dark:bg-green-900 w-12"
                    >
                      Nor
                      <br />
                      mal
                    </th>
                  )}
                  {overtimeColSpan > 0 && (
                    <th
                      colSpan={overtimeColSpan}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold bg-pink-100 dark:bg-pink-900"
                    >
                      <HeaderLabel kh="ម៉ោងថែម" en="OverTime" />
                    </th>
                  )}
                  {paymentColSpan > 0 && (
                    <th
                      colSpan={paymentColSpan}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold bg-amber-100 dark:bg-amber-900"
                    >
                      <HeaderLabel kh="ប្រាក់ឈ្នួល" en="Payment" />
                    </th>
                  )}
                  {isVisible("timeSalary") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold w-20"
                    >
                      <HeaderLabel kh="ប្រាក់សរុប" en="Time Salary" />
                    </th>
                  )}
                  {isVisible("pieceSalary") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold w-20"
                    >
                      <HeaderLabel kh="ប្រាក់ថ្ងៃបុក" en="Piece Salary" />
                    </th>
                  )}
                  {leaveColSpan > 0 && (
                    <th
                      colSpan={leaveColSpan}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold"
                    >
                      <HeaderLabel kh="ឈប់" en="Leave" />
                    </th>
                  )}
                  {isVisible("food") && (
                    <th
                      rowSpan={2}
                      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-semibold bg-orange-100 dark:bg-orange-900 w-16"
                    >
                      <HeaderLabel kh="ប្រាក់ថ្លៃបាយ" en="Food" />
                    </th>
                  )}
                </tr>
                <tr className="bg-slate-200 dark:bg-slate-800">
                  {isVisible("timeIn1") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-slate-100 dark:bg-slate-700 w-12">
                      In
                    </th>
                  )}
                  {isVisible("timeOut1") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-slate-100 dark:bg-slate-700 w-12">
                      Out
                    </th>
                  )}
                  {isVisible("timeIn2") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-slate-100 dark:bg-slate-700 w-12">
                      In
                    </th>
                  )}
                  {isVisible("timeOut2") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-slate-100 dark:bg-slate-700 w-12">
                      Out
                    </th>
                  )}
                  {isVisible("otX15") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-pink-100 dark:bg-pink-900 w-14">
                      OT x 1.5
                    </th>
                  )}
                  {isVisible("otX2") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-pink-100 dark:bg-pink-900 w-12">
                      OT x 2
                    </th>
                  )}
                  {isVisible("night") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-pink-100 dark:bg-pink-900 w-12">
                      Night
                    </th>
                  )}
                  {isVisible("paymentNormal") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-amber-50 dark:bg-amber-900/40 w-16">
                      <HeaderLabel kh="ធម្មតា" en="Normal" />
                    </th>
                  )}
                  {isVisible("paymentOtX15") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-amber-50 dark:bg-amber-900/40 w-16">
                      OT x 1.5
                    </th>
                  )}
                  {isVisible("paymentOtX2") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-amber-50 dark:bg-amber-900/40 w-16">
                      OT x 2
                    </th>
                  )}
                  {isVisible("paymentNight") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold bg-amber-50 dark:bg-amber-900/40 w-16">
                      Night
                    </th>
                  )}
                  {isVisible("leaveHour") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold w-12">
                      <HeaderLabel kh="ម៉ោង" en="Hour" />
                    </th>
                  )}
                  {isVisible("leavePay") && (
                    <th className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-semibold w-14">
                      <HeaderLabel kh="ទឹកប្រាក់" en="Pay" />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {fullMonthData.map((record, index) => {
                  const dayNum = parseInt(record.date.split("-")[2]);
                  const rowBg = getRowBackground(record.status, record.day);
                  const dayStatusStyle = getDayStatusStyle(record.status, record.day);
                  const dayStatusLabel = getDayStatusLabel(record.status, record.day);
                  const workStatus = getWorkStatusLabel(record.status);
                  const hasData = record.status === "PRESENT" || record.status === "LEAVE";
                  const isFutureOrEmpty = !record.time.fi && record.status !== "HOLIDAY" && record.status !== "LEAVE";
                  const lateHours = record.lateMinutes / 60;

                  return (
                    <tr key={index} className={cn(rowBg, "hover:brightness-95")}>
                      {isVisible("day") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-medium">
                          {dayNum.toString().padStart(2, "0")}
                        </td>
                      )}
                      {isVisible("weekday") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-medium">
                          {record.day}
                        </td>
                      )}
                      {isVisible("dayStatus") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-2 py-1 text-center",
                            dayStatusStyle,
                          )}
                        >
                          {dayStatusLabel}
                        </td>
                      )}
                      {isVisible("workStatus") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center">
                          <span
                            className={cn(
                              "text-xs",
                              record.status === "ABSENT" && "text-red-600 font-semibold",
                              record.status === "LEAVE" && "text-orange-600 font-semibold",
                            )}
                          >
                            {workStatus}
                          </span>
                        </td>
                      )}
                      {isVisible("timeIn1") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-mono",
                            isFutureOrEmpty && "bg-green-200 dark:bg-green-800",
                          )}
                        >
                          {formatTime(record.time.fi)}
                        </td>
                      )}
                      {isVisible("timeOut1") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-mono",
                            isFutureOrEmpty && "bg-green-200 dark:bg-green-800",
                          )}
                        >
                          {formatTime(record.time.fo)}
                        </td>
                      )}
                      {isVisible("timeIn2") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-mono",
                            isFutureOrEmpty && "bg-green-200 dark:bg-green-800",
                          )}
                        >
                          {formatTime(record.time.si)}
                        </td>
                      )}
                      {isVisible("timeOut2") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-mono",
                            isFutureOrEmpty && "bg-green-200 dark:bg-green-800",
                            record.overtime.ot1 > 0 && "text-red-600 font-bold",
                          )}
                        >
                          {formatTime(record.time.so)}
                        </td>
                      )}
                      {isVisible("late") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center bg-cyan-50 dark:bg-cyan-900/30",
                            isFutureOrEmpty && "bg-green-200 dark:bg-green-800",
                          )}
                        >
                          {lateHours > 0 ? lateHours.toFixed(2) : ""}
                        </td>
                      )}
                      {isVisible("normal") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center font-medium bg-green-100 dark:bg-green-900/30",
                            isFutureOrEmpty && "bg-green-200 dark:bg-green-800",
                          )}
                        >
                          {record.workingHours > 0 ? record.workingHours : ""}
                        </td>
                      )}
                      {isVisible("otX15") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center bg-pink-50 dark:bg-pink-900/30",
                            record.overtime.ot1 > 0 && "font-bold",
                            isFutureOrEmpty && "bg-pink-200 dark:bg-pink-800",
                          )}
                        >
                          {formatNumber(record.overtime.ot1)}
                        </td>
                      )}
                      {isVisible("otX2") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center bg-pink-50 dark:bg-pink-900/30",
                            record.overtime.ot2 > 0 && "font-bold",
                            isFutureOrEmpty && "bg-pink-200 dark:bg-pink-800",
                          )}
                        >
                          {formatNumber(record.overtime.ot2)}
                        </td>
                      )}
                      {isVisible("night") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-center bg-pink-50 dark:bg-pink-900/30",
                            isFutureOrEmpty && "bg-pink-200 dark:bg-pink-800",
                          )}
                        >
                          {/* Night overtime hours — not yet provided by the API */}
                        </td>
                      )}
                      {isVisible("paymentNormal") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right bg-amber-50 dark:bg-amber-900/20">
                          {record.workingHours > 0 ? `$${(record.workingHours * 1).toFixed(2)}` : ""}
                        </td>
                      )}
                      {isVisible("paymentOtX15") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right bg-amber-50 dark:bg-amber-900/20">
                          {record.overtime.ot1 > 0 ? `$${(record.overtime.ot1 * 1.5).toFixed(2)}` : ""}
                        </td>
                      )}
                      {isVisible("paymentOtX2") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right bg-amber-50 dark:bg-amber-900/20">
                          {record.overtime.ot2 > 0 ? `$${(record.overtime.ot2 * 2).toFixed(2)}` : ""}
                        </td>
                      )}
                      {isVisible("paymentNight") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right bg-amber-50 dark:bg-amber-900/20">
                          {/* Night overtime payment — not yet provided by the API */}
                        </td>
                      )}
                      {isVisible("timeSalary") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right">
                          {record.workingHours > 0 ? `$${(record.workingHours * 1).toFixed(3)}` : ""}
                        </td>
                      )}
                      {isVisible("pieceSalary") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right">
                          {/* Piece-rate salary — not yet provided by the API */}
                        </td>
                      )}
                      {isVisible("leaveHour") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-center">
                          {record.status === "LEAVE" ? "8" : ""}
                        </td>
                      )}
                      {isVisible("leavePay") && (
                        <td className="border border-slate-300 dark:border-slate-600 px-1 py-1 text-right">
                          {/* Leave pay placeholder */}
                        </td>
                      )}
                      {isVisible("food") && (
                        <td
                          className={cn(
                            "border border-slate-300 dark:border-slate-600 px-1 py-1 text-right bg-orange-50 dark:bg-orange-900/30",
                            isFutureOrEmpty && "bg-orange-200 dark:bg-orange-800",
                          )}
                        >
                          {hasData ? "$1.000" : ""}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Sticky Footer Totals */}
        <div className="flex-shrink-0 border-t-2 border-slate-400">
          <table className="w-full border-collapse text-xs">
            <tfoot>
              <tr className="bg-slate-300 dark:bg-slate-700 font-semibold">
                {(isVisible("day") || isVisible("weekday")) && (
                  <td
                    colSpan={
                      [
                        isVisible("day"),
                        isVisible("weekday"),
                        isVisible("dayStatus"),
                        isVisible("workStatus"),
                      ].filter(Boolean).length
                    }
                    className="border border-slate-400 dark:border-slate-500 px-2 py-2 text-center w-[calc(10px+16px+16px+12px)]"
                  >
                    Total
                  </td>
                )}
                {!isVisible("day") && !isVisible("weekday") && isVisible("dayStatus") && (
                  <td
                    colSpan={
                      [isVisible("dayStatus"), isVisible("workStatus")].filter(Boolean).length
                    }
                    className="border border-slate-400 dark:border-slate-500 px-2 py-2 text-center"
                  >
                    Total
                  </td>
                )}
                {timeColSpan > 0 && (
                  <td
                    colSpan={timeColSpan}
                    className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center"
                  >
                    {/* Time totals */}
                  </td>
                )}
                {isVisible("late") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center bg-cyan-100 dark:bg-cyan-900 w-14">
                    {totalLateHours > 0 ? totalLateHours.toFixed(2) : ""}
                  </td>
                )}
                {isVisible("normal") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center bg-green-200 dark:bg-green-800 font-bold w-12">
                    {totals.normalHours}
                  </td>
                )}
                {isVisible("otX15") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center bg-pink-200 dark:bg-pink-800 font-bold w-14">
                    {formatNumber(totals.otX15)}
                  </td>
                )}
                {isVisible("otX2") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center bg-pink-200 dark:bg-pink-800 font-bold w-12">
                    {formatNumber(totals.otX2)}
                  </td>
                )}
                {isVisible("night") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center bg-pink-200 dark:bg-pink-800 font-bold w-12">
                    {/* Night total */}
                  </td>
                )}
                {isVisible("paymentNormal") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right bg-amber-200 dark:bg-amber-800 font-bold w-16">
                    ${(totals.normalHours * 1).toFixed(2)}
                  </td>
                )}
                {isVisible("paymentOtX15") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right bg-amber-200 dark:bg-amber-800 font-bold w-16">
                    ${(totals.otX15 * 1.5).toFixed(2)}
                  </td>
                )}
                {isVisible("paymentOtX2") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right bg-amber-200 dark:bg-amber-800 font-bold w-16">
                    ${(totals.otX2 * 2).toFixed(2)}
                  </td>
                )}
                {isVisible("paymentNight") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right bg-amber-200 dark:bg-amber-800 font-bold w-16">
                    {/* Night payment total */}
                  </td>
                )}
                {isVisible("timeSalary") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right font-bold w-20">
                    ${totals.normalHours.toFixed(2)}
                  </td>
                )}
                {isVisible("pieceSalary") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right font-bold w-20">
                    {/* Piece salary total */}
                  </td>
                )}
                {isVisible("leaveHour") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-center w-12">
                    {/* Leave hour total */}
                  </td>
                )}
                {isVisible("leavePay") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right w-14">
                    {/* Leave pay total */}
                  </td>
                )}
                {isVisible("food") && (
                  <td className="border border-slate-400 dark:border-slate-500 px-1 py-2 text-right bg-orange-200 dark:bg-orange-800 font-bold w-16">
                    {/* Food total */}
                  </td>
                )}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
