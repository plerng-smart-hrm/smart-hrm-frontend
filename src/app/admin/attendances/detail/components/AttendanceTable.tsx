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
import { ChevronLeft, ChevronRight, DownloadIcon, Settings2 } from "lucide-react";
import { SharedButton } from "@/components/shared/button/SharedButton";
import { IDailyAttendance, IEmployeeAttendanceSummary } from "@/types/admin/attendance-summary";
import { cn } from "@/lib/utils";

export enum AdjustmentField {
  STATUS = "STATUS",
  F_IN = "F_IN",
  F_OUT = "F_OUT",
  S_IN = "S_IN",
  S_OUT = "S_OUT",
  OT1 = "OT1",
  OT2 = "OT2",
  BONUS_TARGET = "BONUS_TARGET",
  BONUS_LUNCH = "BONUS_LUNCH",
  BONUS_OT_FOOD = "BONUS_OT_FOOD",
}

export interface AttCellClickInfo {
  record: IDailyAttendance;
  fieldChanged: string;
  oldValue: string;
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
  | "foodLunch"
  | "foodOt"
  | "total";

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
  { key: "foodLunch", label: "Food Lunch", group: "Food", defaultVisible: true },
  { key: "foodOt", label: "Food OT", group: "Food", defaultVisible: true },
  { key: "total", label: "Total", defaultVisible: true },
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
      <span className="text-[10px] font-normal">{en}</span>
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
  "--total-body": "#ffe4b5",
  "--total-head": "#ffd07a",
  "--idcol-body": "#ffffff",
  "--idcol-head": "#f1f3f6",
  "--grid-line": "#000000",
  "--text-main": "#1a1d21",
  "--text-muted": "#9aa0a6",
  "--ph-row": "#eef2f7",
  "--ph-text": "#dc2626",
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
  | "food"
  | "total";

const headBg = (group: GroupKey): CSSProperties => ({
  backgroundColor: `var(--${group}-head)`,
  color: "var(--text-main)",
  fontWeight: 700,
});

const footerBg = (group: GroupKey): CSSProperties => ({
  backgroundColor: `color-mix(in srgb, var(--${group}-head) 85%, black 15%)`,
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

interface Props {
  attendanceData?: IEmployeeAttendanceSummary;
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  onCellClick?: (info: AttCellClickInfo) => void;
}

export default function AttendanceTable({ attendanceData, selectedMonth, onMonthChange, onCellClick }: Props) {
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

  const fullMonthData = attendanceData?.attendanceSummary ?? [];
  const totals = attendanceData?.totals ?? {
    totalNormalHours: 0,
    totalLateMinutes: 0,
    totalOt1: 0,
    totalOt2: 0,
    totalOtNight: 0,
    totalLeaveHours: 0,
    totalPhHours: 0,
    totalWageNormal: 0,
    totalWageOT1: 0,
    totalWageOT2: 0,
    totalWageOTNight: 0,
    totalWageLeavePH: 0,
    totalTimeSalary: 0,
    totalBonusTarget: 0,
    totalBonusLunch: 0,
    totalBonusOtFood: 0,
    totalWagePH: 0,
    grandTotal: 0,
  };

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
  const foodColSpan = [isVisible("foodLunch"), isVisible("foodOt")].filter(Boolean).length;
  const leftColSpan = [isVisible("day"), isVisible("weekday"), isVisible("dayStatus"), isVisible("workStatus")].filter(
    Boolean,
  ).length;
  const totalLeftSpan = leftColSpan + timeColSpan;

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

  const getDisplayWageNormal = (record: IDailyAttendance) => {
    if (record.dayStatus === "PH") {
      return record.wagePH;
    }
    return record.wageNormal;
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
            <SelectTrigger className="h-8 w-[90px] text-sm">
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
        <div className="flex gap-2">
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

          <SharedButton variant="success" size="icon" className="h-8 w-8" description="Download time sheet">
            <DownloadIcon className="h-4 w-4" />
          </SharedButton>
        </div>
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
                      className="border border-b px-2 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
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
                  {foodColSpan > 0 && (
                    <th
                      colSpan={foodColSpan}
                      style={headBg("food")}
                      className="border border-b px-2 py-1 text-center font-semibold [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ប្រាក់ថ្លៃបាយ" en="Food" />
                    </th>
                  )}
                  {isVisible("total") && (
                    <th
                      rowSpan={2}
                      style={headBg("total")}
                      className="border border-b px-2 py-1 text-center font-semibold w-12 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="សរុប" en="Total" />
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
                  {isVisible("foodLunch") && (
                    <th
                      style={headBg("food")}
                      className="border border-b px-1 py-1 text-center font-semibold w-14 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ថ្ងៃ" en="Lunch" />
                    </th>
                  )}
                  {isVisible("foodOt") && (
                    <th
                      style={headBg("food")}
                      className="border border-b px-1 py-1 text-center font-semibold w-14 [border-color:var(--grid-line)]"
                    >
                      <HeaderLabel kh="ថែមម៉ោង" en="OT" />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {fullMonthData.map((record, index) => {
                  const dayNum = parseInt(record.date.split("-")[2]);
                  const dayStatusLabel = record.dayStatus;
                  const workStatus = record.workStatus;
                  const isFutureOrEmpty = !record.time.fi && record.dayStatus !== "Sunday" && record.dayStatus !== "PH";
                  const lateHours = record.lateMinutes / 60;
                  const special = record.dayStatus === "Sunday" || record.dayStatus === "PH";
                  const cellBorder = "border [border-color:var(--grid-line)]";
                  const displayWage = getDisplayWageNormal(record);

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
                          className={cn(cellBorder, "px-2 py-1 text-start")}
                        >
                          {dayStatusLabel}
                        </td>
                      )}
                      {isVisible("workStatus") && (
                        <td
                          style={{ ...cellBg("idcol", index, special), ...getStatusTextStyle(workStatus) }}
                          className={cn(cellBorder, "px-1 py-1 text-start")}
                        >
                          {workStatus}
                        </td>
                      )}
                      {isVisible("timeIn1") && (
                        <td
                          style={cellBg("timeIn", index, special, isFutureOrEmpty)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-center font-mono",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.F_IN,
                              oldValue: record.time.fi ?? "",
                            })
                          }
                        >
                          {formatTime(record.time.fi)}
                        </td>
                      )}
                      {isVisible("timeOut1") && (
                        <td
                          style={cellBg("timeOut", index, special, isFutureOrEmpty)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-center font-mono",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.F_OUT,
                              oldValue: record.time.fo ?? "",
                            })
                          }
                        >
                          {formatTime(record.time.fo)}
                        </td>
                      )}
                      {isVisible("timeIn2") && (
                        <td
                          style={cellBg("timeIn", index, special, isFutureOrEmpty)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-center font-mono",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.S_IN,
                              oldValue: record.time.si ?? "",
                            })
                          }
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
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.S_OUT,
                              oldValue: record.time.so ?? "",
                            })
                          }
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
                          {record.normalHours && record.normalHours > 0 ? record.normalHours : ""}
                        </td>
                      )}
                      {isVisible("otX15") && (
                        <td
                          style={cellBg("overtime", index, special, isFutureOrEmpty)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-center",
                            record.overtime.ot1 > 0 && "font-bold",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.OT1,
                              oldValue: record.overtime.ot1 > 0 ? String(record.overtime.ot1) : "",
                            })
                          }
                        >
                          {formatNumber(record.overtime.ot1)}
                        </td>
                      )}
                      {isVisible("otX2") && (
                        <td
                          style={cellBg("overtime", index, special, isFutureOrEmpty)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-center",
                            record.overtime.ot2 > 0 && "font-bold",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.OT2,
                              oldValue: record.overtime.ot2 > 0 ? String(record.overtime.ot2) : "",
                            })
                          }
                        >
                          {formatNumber(record.overtime.ot2)}
                        </td>
                      )}
                      {isVisible("night") && (
                        <td
                          style={cellBg("overtime", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-center")}
                        >
                          {formatNumber(record.overtime.otNight)}
                        </td>
                      )}
                      {isVisible("paymentNormal") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {displayWage && displayWage > 0 ? `$${displayWage}` : ""}
                        </td>
                      )}
                      {isVisible("paymentOtX15") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.wageOT1 && record.wageOT1 > 0 ? `$${record.wageOT1}` : ""}
                        </td>
                      )}
                      {isVisible("paymentOtX2") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.wageOT2 && record.wageOT2 > 0 ? `$${record.wageOT2}` : ""}
                        </td>
                      )}
                      {isVisible("paymentNight") && (
                        <td
                          style={cellBg("payment", index, special)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.wageOTNight && record.wageOTNight > 0 ? `$${record.wageOTNight}` : ""}
                        </td>
                      )}
                      {isVisible("timeSalary") && (
                        <td style={cellBg("salary", index, special)} className={cn(cellBorder, "px-1 py-1 text-right")}>
                          {record.timeSalary && record.timeSalary > 0 ? `$${record.timeSalary}` : ""}
                        </td>
                      )}
                      {isVisible("pieceSalary") && (
                        <td
                          style={cellBg("piece", index, special)}
                          className={cn(
                            cellBorder,
                            "px-1 py-1 text-right",
                            onCellClick && "cursor-pointer hover:brightness-90",
                          )}
                          onClick={() =>
                            onCellClick?.({
                              record,
                              fieldChanged: AdjustmentField.BONUS_TARGET,
                              oldValue: record.bonusTarget && record.bonusTarget > 0 ? String(record.bonusTarget) : "",
                            })
                          }
                        >
                          {record.bonusTarget && record.bonusTarget > 0 ? `$${record.bonusTarget}` : ""}
                        </td>
                      )}
                      {isVisible("leaveHour") && (
                        <td style={cellBg("leave", index, special)} className={cn(cellBorder, "px-1 py-1 text-center")}>
                          {record.leaveHours && record.leaveHours > 0 ? `$${record.leaveHours}` : ""}
                        </td>
                      )}
                      {isVisible("leavePay") && (
                        <td style={cellBg("leave", index, special)} className={cn(cellBorder, "px-1 py-1 text-right")}>
                          {/* Leave pay placeholder */}
                        </td>
                      )}
                      {isVisible("foodLunch") && (
                        <td
                          style={cellBg("food", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.bonusLunch && record.bonusLunch > 0 ? `$${record.bonusLunch}` : ""}
                        </td>
                      )}
                      {isVisible("foodOt") && (
                        <td
                          style={cellBg("food", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-right")}
                        >
                          {record.bonusOtFood && record.bonusOtFood > 0 ? `$${record.bonusOtFood}` : ""}
                        </td>
                      )}
                      {isVisible("total") && (
                        <td
                          style={cellBg("total", index, special, isFutureOrEmpty)}
                          className={cn(cellBorder, "px-1 py-1 text-right font-semibold")}
                        >
                          {record.total ? `$${record.total}` : ""}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="sticky bottom-0 z-10">
                <tr style={{ color: "var(--text-main)" }}>
                  {totalLeftSpan > 0 && (
                    <td
                      colSpan={totalLeftSpan}
                      style={footerBg("idcol")}
                      className="border [border-color:var(--grid-line)] px-2 py-2 text-end font-bold"
                    >
                      Total
                    </td>
                  )}
                  {isVisible("late") && (
                    <td
                      style={footerBg("late")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                    >
                      N/A
                    </td>
                  )}
                  {isVisible("normal") && (
                    <td
                      style={footerBg("normal")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                    >
                      {totals.totalNormalHours > 0 ? `${totals.totalNormalHours}` : ""}
                    </td>
                  )}
                  {isVisible("otX15") && (
                    <td
                      style={footerBg("overtime")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                    >
                      {totals.totalOt1 > 0 ? `${totals.totalOt1}` : ""}
                    </td>
                  )}
                  {isVisible("otX2") && (
                    <td
                      style={footerBg("overtime")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                    >
                      {totals.totalOt2 > 0 ? `${totals.totalOt2}` : ""}
                    </td>
                  )}
                  {isVisible("night") && (
                    <td
                      style={footerBg("overtime")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                    >
                      {totals.totalOtNight > 0 ? `${totals.totalOtNight}` : ""}
                    </td>
                  )}
                  {isVisible("paymentNormal") && (
                    <td
                      style={footerBg("payment")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalWageNormal > 0 ? `$${totals.totalWageNormal}` : ""}
                    </td>
                  )}
                  {isVisible("paymentOtX15") && (
                    <td
                      style={footerBg("payment")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalWageOT1 > 0 ? `$${totals.totalWageOT1}` : ""}
                    </td>
                  )}
                  {isVisible("paymentOtX2") && (
                    <td
                      style={footerBg("payment")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalWageOT2 > 0 ? `$${totals.totalWageOT2}` : ""}
                    </td>
                  )}
                  {isVisible("paymentNight") && (
                    <td
                      style={footerBg("payment")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalWageOTNight > 0 ? `$${totals.totalWageOTNight}` : ""}
                    </td>
                  )}
                  {isVisible("timeSalary") && (
                    <td
                      style={footerBg("salary")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalTimeSalary > 0 ? `$${totals.totalTimeSalary}` : ""}
                    </td>
                  )}
                  {isVisible("pieceSalary") && (
                    <td
                      style={footerBg("piece")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalBonusTarget > 0 ? `$${totals.totalBonusTarget.toFixed(2)}` : "—"}
                    </td>
                  )}
                  {/* TODO: don't have backend */}
                  {isVisible("leaveHour") && (
                    <td
                      style={footerBg("leave")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-center"
                    >
                      {totals.totalBonusTarget > 0 ? `$${totals.totalBonusTarget.toFixed(2)}` : "—"}
                    </td>
                  )}
                  {/* TODO: don't have backend */}
                  {isVisible("leavePay") && (
                    <td
                      style={footerBg("leave")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {/* {totals.totalWag > 0 ? `$${totals.totalBonusTarget.toFixed(2)}` : "—"} */}
                    </td>
                  )}
                  {isVisible("foodLunch") && (
                    <td
                      style={footerBg("food")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalBonusLunch > 0 ? `$${totals.totalBonusLunch}` : ""}
                    </td>
                  )}
                  {isVisible("foodOt") && (
                    <td
                      style={footerBg("food")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.totalBonusOtFood > 0 ? `$${totals.totalBonusOtFood}` : ""}
                    </td>
                  )}
                  {isVisible("total") && (
                    <td
                      style={footerBg("total")}
                      className="border [border-color:var(--grid-line)] px-1 py-2 text-right"
                    >
                      {totals.grandTotal > 0 ? `$${totals.grandTotal}` : ""}
                    </td>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
