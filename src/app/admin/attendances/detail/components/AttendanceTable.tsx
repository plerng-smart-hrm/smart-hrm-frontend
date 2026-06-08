"use client";

import { CSSProperties, useState } from "react";
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
import { IDailyAttendance } from "@/types/admin/attendance-summary";
import { cn } from "@/lib/utils";

export interface AttCellClickInfo {
  record: IDailyAttendance;
  fieldChanged: string;
  oldValue: string;
}

interface AttendanceTableProps {
  attendanceData: IDailyAttendance[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  onCellClick?: (info: AttCellClickInfo) => void;
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

const getStatusTextStyle = (label: string): React.CSSProperties => {
  if (label === "PH" || label === "Sunday") return { color: "var(--ph-text)", fontWeight: 700 };
  if (label === "Absent") return { color: "var(--absent-text)", fontWeight: 700 };
  if (label === "Work") return { color: "var(--work-text)", fontWeight: 600 };
  return { color: "var(--text-main)" };
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

// Vivid Excel-style color tokens — one hue per cell FUNCTION
const tableColorVars = {
  "--time-in-body": "#b3ecff",
  "--time-in-head": "#99e0f7",
  "--time-out-body": "#ffcc99",
  "--time-out-head": "#ffba80",
  "--late-body": "#ff9ed6",
  "--late-head": "#ff85cc",
  "--normal-body": "#fff34d",
  "--normal-head": "#ffe924",
  "--overtime-body": "#33dd33",
  "--overtime-head": "#1fd11f",
  "--payment-body": "#ffffff",
  "--payment-head": "#f1f3f6",
  "--salary-body": "#ffffff",
  "--salary-head": "#f1f3f6",
  "--piece-body": "#ffffff",
  "--piece-head": "#f1f3f6",
  "--leave-body": "#b3ecff",
  "--leave-head": "#99e0f7",
  "--food-body": "#ccffcc",
  "--food-head": "#b3f5b3",
  "--idcol-body": "#ffffff",
  "--idcol-head": "#f1f3f6",
  "--grid-line": "#000000",
  "--text-main": "#1a1d21",
  "--text-muted": "#9aa0a6",
  "--ph-row": "#eef2f7",
  "--ph-text": "#1d4ed8",
  "--work-text": "#1d4ed8",
  "--absent-text": "#dc2626",
} as unknown as CSSProperties;

type GroupKey =
  | "idcol"
  | "timeIn"
  | "timeOut"
  | "late"
  | "normal"
  | "overtime"
  | "payment"
  | "salary"
  | "piece"
  | "leave"
  | "food";

const headBg = (group: GroupKey): CSSProperties => ({
  backgroundColor: `var(--${group}-head)`,
  color: "var(--text-main)",
  fontWeight: 700,
});

// Body cell background: group wash, muted toward the PH/Sunday row tint when the
// row carries that meaning, with a subtle zebra overlay blended in on alternate rows
const cellBg = (group: GroupKey, rowIndex: number, special: boolean, emphasize = false): CSSProperties => {
  const base = `var(--${group}-${emphasize ? "head" : "body"})`;
  const color = special ? `color-mix(in srgb, ${base} 30%, var(--ph-row) 70%)` : base;
  return { backgroundColor: rowIndex % 2 === 1 ? `color-mix(in srgb, black 2.5%, ${color})` : color };
};

export default function AttendanceTable({ attendanceData, selectedMonth, onMonthChange, onCellClick }: AttendanceTableProps) {
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

  const fullMonthData = attendanceData;

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
    <div className="h-full flex flex-col" style={tableColorVars}>
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

      <div
        className="flex-1 overflow-hidden flex flex-col"
        style={{ borderColor: "var(--grid-line)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <ScrollArea className="flex-1">
          <div>
            <table className="w-full border-collapse text-xs" style={{ color: "var(--text-main)" }}>
              <thead className="sticky top-0 z-10">
                <tr>
                  {dateColSpan > 0 && (
                    <th
                      colSpan={dateColSpan}
                      rowSpan={2}
                      style={headBg("idcol")}
                      className="border border-b px-2 py-1 text-center font-semibold [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ថ្ងៃទី" en="Date" />
                    </th>
                  )}
                  {isVisible("dayStatus") && (
                    <th
                      rowSpan={2}
                      style={headBg("idcol")}
                      className="border border-b px-2 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ប្រភេទថ្ងៃ" en="DayStatus" />
                    </th>
                  )}
                  {isVisible("workStatus") && (
                    <th
                      rowSpan={2}
                      style={headBg("idcol")}
                      className="border border-b px-2 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ថ្ងៃធ្វើការ" en="WorkStatus" />
                    </th>
                  )}
                  {timeColSpan > 0 && (
                    <th
                      colSpan={timeColSpan}
                      style={headBg("idcol")}
                      className="border border-b px-2 py-1 text-center font-semibold [border-color:var(--grid-line)]"
                    >
                      Time
                    </th>
                  )}
                  {isVisible("late") && (
                    <th
                      rowSpan={2}
                      style={headBg("late")}
                      className="border border-b px-2 py-1 text-center font-semibold w-14 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="យឺត" en="Late" />
                    </th>
                  )}
                  {isVisible("normal") && (
                    <th
                      rowSpan={2}
                      style={headBg("normal")}
                      className="border border-b px-2 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      Nor
                      <br />
                      mal
                    </th>
                  )}
                  {overtimeColSpan > 0 && (
                    <th
                      colSpan={overtimeColSpan}
                      style={headBg("overtime")}
                      className="border border-b px-2 py-1 text-center font-semibold [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ម៉ោងថែម" en="OverTime" />
                    </th>
                  )}
                  {paymentColSpan > 0 && (
                    <th
                      colSpan={paymentColSpan}
                      style={headBg("payment")}
                      className="border border-b px-2 py-1 text-center font-semibold [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ប្រាក់ឈ្នួល" en="Payment" />
                    </th>
                  )}
                  {isVisible("timeSalary") && (
                    <th
                      rowSpan={2}
                      style={headBg("salary")}
                      className="border border-b px-2 py-1 text-center font-semibold w-20 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ប្រាក់សរុប" en="Time Salary" />
                    </th>
                  )}
                  {isVisible("pieceSalary") && (
                    <th
                      rowSpan={2}
                      style={headBg("piece")}
                      className="border border-b px-2 py-1 text-center font-semibold w-20 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ប្រាក់ថ្ងៃបុក" en="Piece Salary" />
                    </th>
                  )}
                  {leaveColSpan > 0 && (
                    <th
                      colSpan={leaveColSpan}
                      style={headBg("leave")}
                      className="border border-b px-2 py-1 text-center font-semibold [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ឈប់" en="Leave" />
                    </th>
                  )}
                  {isVisible("food") && (
                    <th
                      rowSpan={2}
                      style={headBg("food")}
                      className="border border-b px-2 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ប្រាក់ថ្លៃបាយ" en="Food" />
                    </th>
                  )}
                </tr>
                <tr>
                  {isVisible("timeIn1") && (
                    <th
                      style={headBg("timeIn")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      In
                    </th>
                  )}
                  {isVisible("timeOut1") && (
                    <th
                      style={headBg("timeOut")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      Out
                    </th>
                  )}
                  {isVisible("timeIn2") && (
                    <th
                      style={headBg("timeIn")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      In
                    </th>
                  )}
                  {isVisible("timeOut2") && (
                    <th
                      style={headBg("timeOut")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      Out
                    </th>
                  )}
                  {isVisible("otX15") && (
                    <th
                      style={headBg("overtime")}
                      className="border border-b px-1 py-1 text-center font-semibold w-14 [border-color:var(--grid-line)]"
                    >
                      OT x 1.5
                    </th>
                  )}
                  {isVisible("otX2") && (
                    <th
                      style={headBg("overtime")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      OT x 2
                    </th>
                  )}
                  {isVisible("night") && (
                    <th
                      style={headBg("overtime")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      Night
                    </th>
                  )}
                  {isVisible("paymentNormal") && (
                    <th
                      style={headBg("payment")}
                      className="border border-b px-1 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ធម្មតា" en="Normal" />
                    </th>
                  )}
                  {isVisible("paymentOtX15") && (
                    <th
                      style={headBg("payment")}
                      className="border border-b px-1 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      OT x 1.5
                    </th>
                  )}
                  {isVisible("paymentOtX2") && (
                    <th
                      style={headBg("payment")}
                      className="border border-b px-1 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      OT x 2
                    </th>
                  )}
                  {isVisible("paymentNight") && (
                    <th
                      style={headBg("payment")}
                      className="border border-b px-1 py-1 text-center font-semibold w-16 [border-color:var(--grid-line)]"
                    >
                      Night
                    </th>
                  )}
                  {isVisible("leaveHour") && (
                    <th
                      style={headBg("leave")}
                      className="border border-b px-1 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ម៉ោង" en="Hour" />
                    </th>
                  )}
                  {isVisible("leavePay") && (
                    <th
                      style={headBg("leave")}
                      className="border border-b px-1 py-1 text-center font-semibold w-14 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ទឹកប្រាក់" en="Pay" />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {fullMonthData.map((record, index) => {
                  const dayNum = parseInt(record.date.split("-")[2]);
                  const dayStatusLabel = record.dayStatus;
                  const workStatus = record.workStatus;
                  const hasData = record.time.fi !== null;
                  const isFutureOrEmpty = !record.time.fi && record.dayStatus !== "Sunday" && record.dayStatus !== "PH";
                  const lateHours = record.lateMinutes / 60;
                  const special = record.dayStatus === "Sunday" || record.dayStatus === "PH";
                  const cellBorder = "border [border-color:var(--grid-line)]";

                  return (
                    <tr key={index} className="hover:brightness-[0.97]">
                      {isVisible("day") && (
                        <td
                          style={cellBg("idcol", index, special)}
                          className={cn(cellBorder, "px-2 py-1 text-center font-medium")}
                        >
                          {dayNum.toString().padStart(2, "0")}
                        </td>
                      )}
                      {isVisible("weekday") && (
                        <td
                          style={cellBg("idcol", index, special)}
                          className={cn(cellBorder, "px-2 py-1 text-center font-medium")}
                        >
                          {record.day}
                        </td>
                      )}
                      {isVisible("dayStatus") && (
                        <td
                          style={{ ...cellBg("idcol", index, special), ...getStatusTextStyle(dayStatusLabel) }}
                          className={cn(cellBorder, "px-2 py-1 text-center")}
                        >
                          {dayStatusLabel}
                        </td>
                      )}
                      {isVisible("workStatus") && (
                        <td
                          style={{ ...cellBg("idcol", index, special), ...getStatusTextStyle(workStatus) }}
                          className={cn(cellBorder, "px-1 py-1 text-center")}
                        >
                          {workStatus}
                        </td>
                      )}
                      {isVisible("timeIn1") && (
                        <td
                          style={cellBg("timeIn", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center font-mono", onCellClick && "cursor-pointer hover:brightness-90")}
                          onClick={() => onCellClick?.({ record, fieldChanged: "F_IN", oldValue: record.time.fi ?? "" })}
                        >
                          {formatTime(record.time.fi)}
                        </td>
                      )}
                      {isVisible("timeOut1") && (
                        <td
                          style={cellBg("timeOut", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center font-mono", onCellClick && "cursor-pointer hover:brightness-90")}
                          onClick={() => onCellClick?.({ record, fieldChanged: "F_OUT", oldValue: record.time.fo ?? "" })}
                        >
                          {formatTime(record.time.fo)}
                        </td>
                      )}
                      {isVisible("timeIn2") && (
                        <td
                          style={cellBg("timeIn", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center font-mono", onCellClick && "cursor-pointer hover:brightness-90")}
                          onClick={() => onCellClick?.({ record, fieldChanged: "S_IN", oldValue: record.time.si ?? "" })}
                        >
                          {formatTime(record.time.si)}
                        </td>
                      )}
                      {isVisible("timeOut2") && (
                        <td
                          style={cellBg("timeOut", index, special, isFutureOrEmpty)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-center font-mono",
                            record.overtime.ot1 > 0 && "font-bold",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() => onCellClick?.({ record, fieldChanged: "S_OUT", oldValue: record.time.so ?? "" })}
                        >
                          {formatTime(record.time.so)}
                        </td>
                      )}
                      {isVisible("late") && (
                        <td
                          style={cellBg("late", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center")}
                        >
                          {lateHours > 0 ? lateHours.toFixed(2) : ""}
                        </td>
                      )}
                      {isVisible("normal") && (
                        <td
                          style={cellBg("normal", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center font-medium")}
                        >
                          {record.workingHours > 0 ? record.workingHours : ""}
                        </td>
                      )}
                      {isVisible("otX15") && (
                        <td
                          style={cellBg("overtime", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center", record.overtime.ot1 > 0 && "font-bold", onCellClick && "cursor-pointer hover:brightness-90")}
                          onClick={() => onCellClick?.({ record, fieldChanged: "OT1", oldValue: record.overtime.ot1 > 0 ? String(record.overtime.ot1) : "" })}
                        >
                          {formatNumber(record.overtime.ot1)}
                        </td>
                      )}
                      {isVisible("otX2") && (
                        <td
                          style={cellBg("overtime", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center", record.overtime.ot2 > 0 && "font-bold", onCellClick && "cursor-pointer hover:brightness-90")}
                          onClick={() => onCellClick?.({ record, fieldChanged: "OT2", oldValue: record.overtime.ot2 > 0 ? String(record.overtime.ot2) : "" })}
                        >
                          {formatNumber(record.overtime.ot2)}
                        </td>
                      )}
                      {isVisible("night") && (
                        <td
                          style={cellBg("overtime", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center")}
                        >
                          {/* Night overtime hours — not yet provided by the API */}
                        </td>
                      )}
                      {isVisible("paymentNormal") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.workingHours > 0 ? `$${(record.workingHours * 1).toFixed(2)}` : ""}
                        </td>
                      )}
                      {isVisible("paymentOtX15") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.overtime.ot1 > 0 ? `$${(record.overtime.ot1 * 1.5).toFixed(2)}` : ""}
                        </td>
                      )}
                      {isVisible("paymentOtX2") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.overtime.ot2 > 0 ? `$${(record.overtime.ot2 * 2).toFixed(2)}` : ""}
                        </td>
                      )}
                      {isVisible("paymentNight") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {/* Night overtime payment — not yet provided by the API */}
                        </td>
                      )}
                      {isVisible("timeSalary") && (
                        <td style={cellBg("salary", index, special)} className={cn(cellBorder, "px-1 py-1 text-right")}>
                          {record.workingHours > 0 ? `$${(record.workingHours * 1).toFixed(3)}` : ""}
                        </td>
                      )}
                      {isVisible("pieceSalary") && (
                        <td style={cellBg("piece", index, special)} className={cn(cellBorder, "px-1 py-1 text-right")}>
                          {/* Piece-rate salary — not yet provided by the API */}
                        </td>
                      )}
                      {isVisible("leaveHour") && (
                        <td style={cellBg("leave", index, special)} className={cn(cellBorder, "px-1 py-1 text-center")}>
                          {record.status === "LEAVE" ? "8" : ""}
                        </td>
                      )}
                      {isVisible("leavePay") && (
                        <td style={cellBg("leave", index, special)} className={cn(cellBorder, "px-1 py-1 text-right")}>
                          {/* Leave pay placeholder */}
                        </td>
                      )}
                      {isVisible("food") && (
                        <td
                          style={cellBg("food", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
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
        <div className="flex-shrink-0  overflow-hidden" style={{ borderColor: "var(--grid-line)" }}>
          <table className="w-full border-collapse text-xs">
            <tfoot>
              <tr className="font-semibold" style={{ color: "var(--text-main)" }}>
                {(isVisible("day") || isVisible("weekday")) && (
                  <td
                    colSpan={
                      [isVisible("day"), isVisible("weekday"), isVisible("dayStatus"), isVisible("workStatus")].filter(
                        Boolean,
                      ).length
                    }
                    style={headBg("idcol")}
                    className="border [border-color:var(--grid-line)] px-2 py-2 text-center"
                  >
                    Total
                  </td>
                )}
                {!isVisible("day") && !isVisible("weekday") && isVisible("dayStatus") && (
                  <td
                    colSpan={[isVisible("dayStatus"), isVisible("workStatus")].filter(Boolean).length}
                    style={headBg("idcol")}
                    className="border [border-color:var(--grid-line)] px-2 py-2 text-center"
                  >
                    Total
                  </td>
                )}
                {timeColSpan > 0 && (
                  <td
                    colSpan={timeColSpan}
                    style={headBg("idcol")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                  >
                    {/* Time totals */}
                  </td>
                )}
                {isVisible("late") && (
                  <td
                    style={headBg("late")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center w-14"
                  >
                    {totalLateHours > 0 ? totalLateHours.toFixed(2) : ""}
                  </td>
                )}
                {isVisible("normal") && (
                  <td
                    style={headBg("normal")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center w-12"
                  >
                    {totals.normalHours}
                  </td>
                )}
                {isVisible("otX15") && (
                  <td
                    style={headBg("overtime")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center w-14"
                  >
                    {formatNumber(totals.otX15)}
                  </td>
                )}
                {isVisible("otX2") && (
                  <td
                    style={headBg("overtime")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center w-12"
                  >
                    {formatNumber(totals.otX2)}
                  </td>
                )}
                {isVisible("night") && (
                  <td
                    style={headBg("overtime")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center w-12"
                  >
                    {/* Night total */}
                  </td>
                )}
                {isVisible("paymentNormal") && (
                  <td
                    style={headBg("payment")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-16"
                  >
                    ${(totals.normalHours * 1).toFixed(2)}
                  </td>
                )}
                {isVisible("paymentOtX15") && (
                  <td
                    style={headBg("payment")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-16"
                  >
                    ${(totals.otX15 * 1.5).toFixed(2)}
                  </td>
                )}
                {isVisible("paymentOtX2") && (
                  <td
                    style={headBg("payment")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-16"
                  >
                    ${(totals.otX2 * 2).toFixed(2)}
                  </td>
                )}
                {isVisible("paymentNight") && (
                  <td
                    style={headBg("payment")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-16"
                  >
                    {/* Night payment total */}
                  </td>
                )}
                {isVisible("timeSalary") && (
                  <td
                    style={headBg("salary")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-20"
                  >
                    ${totals.normalHours.toFixed(2)}
                  </td>
                )}
                {isVisible("pieceSalary") && (
                  <td
                    style={headBg("piece")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-20"
                  >
                    {/* Piece salary total */}
                  </td>
                )}
                {isVisible("leaveHour") && (
                  <td
                    style={headBg("leave")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-center w-12"
                  >
                    {/* Leave hour total */}
                  </td>
                )}
                {isVisible("leavePay") && (
                  <td
                    style={headBg("leave")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-14"
                  >
                    {/* Leave pay total */}
                  </td>
                )}
                {isVisible("food") && (
                  <td
                    style={headBg("food")}
                    className="border [border-color:var(--grid-line)] px-1 py-2 text-right w-16"
                  >
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
