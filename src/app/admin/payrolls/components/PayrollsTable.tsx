import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import TimeHMInput from "./TimeHMInput";

type PayrollsTableProps = {
  selectedMonth?: string;
};

// Payroll row interface
interface PayrollRow {
  id: number;
  day: number;
  dayStatus: string;
  workStatus: "work" | "overtime";
  shift: number;
  timeIn1: Date | null;
  timeOut1: Date | null;
  timeIn2: Date | null;
  timeOut2: Date | null;
  lateIn: Date | null;
  lateOut: Date | null;
  normalHrs: number | string;
  overtime1: number | string;
  overtime2: number | string;
  nightHrs: number;
  timeSalary: number;
  pieceSalary: number;
  leaveHour: number;
  leavePay: number;
  aLAdjust: number;
  foodRiel: number;
  lunchRiel: number;
  probation: boolean;
}

const PayrollsTable: React.FC<PayrollsTableProps> = ({ selectedMonth }) => {
  // Sample data - replace with your actual data from API/database
  const initialPayrollData: PayrollRow[] = [
    {
      id: 1,
      day: 1,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 1, 6, 30),
      timeOut1: new Date(2025, 0, 1, 11, 3),
      timeIn2: new Date(2025, 0, 1, 13, 30),
      timeOut2: new Date(2025, 0, 1, 17, 3),
      lateIn: new Date(2025, 0, 1, 11, 40),
      lateOut: new Date(2025, 0, 1, 16, 3),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 2,
      day: 2,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 2, 6, 25),
      timeOut1: new Date(2025, 0, 2, 11, 5),
      timeIn2: new Date(2025, 0, 2, 13, 25),
      timeOut2: new Date(2025, 0, 2, 17, 10),
      lateIn: new Date(2025, 0, 2, 11, 35),
      lateOut: new Date(2025, 0, 2, 16, 10),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 3,
      day: 3,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 3, 6, 35),
      timeOut1: new Date(2025, 0, 3, 11, 0),
      timeIn2: new Date(2025, 0, 3, 13, 30),
      timeOut2: new Date(2025, 0, 3, 17, 5),
      lateIn: new Date(2025, 0, 3, 11, 30),
      lateOut: new Date(2025, 0, 3, 16, 5),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 4,
      day: 4,
      dayStatus: "Work",
      workStatus: "overtime",
      shift: 1,
      timeIn1: new Date(2025, 0, 4, 6, 20),
      timeOut1: new Date(2025, 0, 4, 11, 10),
      timeIn2: new Date(2025, 0, 4, 13, 20),
      timeOut2: new Date(2025, 0, 4, 20, 0),
      lateIn: new Date(2025, 0, 4, 11, 40),
      lateOut: new Date(2025, 0, 4, 19, 0),
      normalHrs: 8,
      overtime1: 4,
      overtime2: 2,
      nightHrs: 50,
      timeSalary: 14000,
      pieceSalary: 300,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 5,
      day: 5,
      dayStatus: "Sunday",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 5, 7, 0),
      timeOut1: new Date(2025, 0, 5, 11, 30),
      timeIn2: new Date(2025, 0, 5, 13, 30),
      timeOut2: new Date(2025, 0, 5, 17, 30),
      lateIn: new Date(2025, 0, 5, 12, 0),
      lateOut: new Date(2025, 0, 5, 16, 30),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 16000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 6,
      day: 8,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 8, 6, 28),
      timeOut1: new Date(2025, 0, 8, 11, 8),
      timeIn2: new Date(2025, 0, 8, 13, 28),
      timeOut2: new Date(2025, 0, 8, 17, 8),
      lateIn: new Date(2025, 0, 8, 11, 38),
      lateOut: new Date(2025, 0, 8, 16, 8),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 7,
      day: 10,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 10, 6, 40),
      timeOut1: new Date(2025, 0, 10, 11, 15),
      timeIn2: new Date(2025, 0, 10, 13, 40),
      timeOut2: new Date(2025, 0, 10, 17, 15),
      lateIn: new Date(2025, 0, 10, 11, 45),
      lateOut: new Date(2025, 0, 10, 16, 15),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 150,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 8,
      day: 12,
      dayStatus: "Sunday",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 12, 7, 15),
      timeOut1: new Date(2025, 0, 12, 11, 45),
      timeIn2: new Date(2025, 0, 12, 13, 45),
      timeOut2: new Date(2025, 0, 12, 17, 45),
      lateIn: new Date(2025, 0, 12, 12, 15),
      lateOut: new Date(2025, 0, 12, 16, 45),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 16000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 9,
      day: 15,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 15, 6, 45),
      timeOut1: new Date(2025, 0, 15, 11, 15),
      timeIn2: new Date(2025, 0, 15, 13, 30),
      timeOut2: new Date(2025, 0, 15, 17, 15),
      lateIn: new Date(2025, 0, 15, 11, 50),
      lateOut: new Date(2025, 0, 15, 16, 15),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 200,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 10,
      day: 18,
      dayStatus: "Work",
      workStatus: "overtime",
      shift: 1,
      timeIn1: new Date(2025, 0, 18, 6, 30),
      timeOut1: new Date(2025, 0, 18, 11, 0),
      timeIn2: new Date(2025, 0, 18, 13, 30),
      timeOut2: new Date(2025, 0, 18, 21, 30),
      lateIn: new Date(2025, 0, 18, 11, 30),
      lateOut: new Date(2025, 0, 18, 20, 30),
      normalHrs: 8,
      overtime1: 6,
      overtime2: 2,
      nightHrs: 120,
      timeSalary: 17000,
      pieceSalary: 400,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 11,
      day: 20,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 20, 6, 22),
      timeOut1: new Date(2025, 0, 20, 11, 2),
      timeIn2: new Date(2025, 0, 20, 13, 22),
      timeOut2: new Date(2025, 0, 20, 17, 2),
      lateIn: new Date(2025, 0, 20, 11, 32),
      lateOut: new Date(2025, 0, 20, 16, 2),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 12,
      day: 22,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 22, 6, 50),
      timeOut1: new Date(2025, 0, 22, 11, 20),
      timeIn2: new Date(2025, 0, 22, 13, 50),
      timeOut2: new Date(2025, 0, 22, 17, 20),
      lateIn: new Date(2025, 0, 22, 11, 55),
      lateOut: new Date(2025, 0, 22, 16, 20),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 250,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 13,
      day: 25,
      dayStatus: "Work",
      workStatus: "overtime",
      shift: 1,
      timeIn1: new Date(2025, 0, 25, 6, 15),
      timeOut1: new Date(2025, 0, 25, 11, 0),
      timeIn2: new Date(2025, 0, 25, 13, 15),
      timeOut2: new Date(2025, 0, 25, 19, 45),
      lateIn: new Date(2025, 0, 25, 11, 30),
      lateOut: new Date(2025, 0, 25, 18, 45),
      normalHrs: 8,
      overtime1: 3,
      overtime2: 1,
      nightHrs: 45,
      timeSalary: 12500,
      pieceSalary: 350,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 14,
      day: 27,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 27, 6, 38),
      timeOut1: new Date(2025, 0, 27, 11, 8),
      timeIn2: new Date(2025, 0, 27, 13, 38),
      timeOut2: new Date(2025, 0, 27, 17, 8),
      lateIn: new Date(2025, 0, 27, 11, 42),
      lateOut: new Date(2025, 0, 27, 16, 8),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 0,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
    {
      id: 15,
      day: 29,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: new Date(2025, 0, 29, 6, 32),
      timeOut1: new Date(2025, 0, 29, 11, 12),
      timeIn2: new Date(2025, 0, 29, 13, 32),
      timeOut2: new Date(2025, 0, 29, 17, 12),
      lateIn: new Date(2025, 0, 29, 11, 42),
      lateOut: new Date(2025, 0, 29, 16, 12),
      normalHrs: 8,
      overtime1: 0,
      overtime2: 0,
      nightHrs: 0,
      timeSalary: 8000,
      pieceSalary: 180,
      leaveHour: 0,
      leavePay: 0,
      aLAdjust: 0,
      foodRiel: 4000,
      lunchRiel: 2000,
      probation: true,
    },
  ];

  const [payrollData, setPayrollData] =
    useState<PayrollRow[]>(initialPayrollData);

  // Get number of days in selected month
  const getDaysInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split("-").map(Number);
    return new Date(year, month, 0).getDate();
  };

  // Get day of week name (Sunday, Monday, etc.)
  const getDayOfWeek = (yearMonth: string, day: number) => {
    const [year, month] = yearMonth.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const generateMonthRows = (): PayrollRow[] => {
    if (!selectedMonth) {
      return Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        day: index + 1,
        dayStatus: "",
        workStatus: "work" as const,
        shift: 1,
        timeIn1: null,
        timeOut1: null,
        timeIn2: null,
        timeOut2: null,
        lateIn: null,
        lateOut: null,
        normalHrs: "",
        overtime1: "",
        overtime2: "",
        nightHrs: 0,
        timeSalary: 0,
        pieceSalary: 0,
        leaveHour: 0,
        leavePay: 0,
        aLAdjust: 0,
        foodRiel: 0,
        lunchRiel: 0,
        probation: false,
      }));
    }

    const daysInMonth = getDaysInMonth(selectedMonth);
    const rows: PayrollRow[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const existingData = payrollData.find((data) => data.day === day);
      const dayOfWeek = getDayOfWeek(selectedMonth, day);
      const isSunday = dayOfWeek === "Sunday";

      rows.push({
        id: day,
        day,
        dayStatus: existingData?.dayStatus || (isSunday ? "Sunday" : "Work"),
        workStatus: existingData?.workStatus || "work",
        shift: existingData?.shift || 1,
        timeIn1: existingData?.timeIn1 || null,
        timeOut1: existingData?.timeOut1 || null,
        timeIn2: existingData?.timeIn2 || null,
        timeOut2: existingData?.timeOut2 || null,
        lateIn: existingData?.lateIn || null,
        lateOut: existingData?.lateOut || null,
        normalHrs: existingData?.normalHrs || "",
        overtime1: existingData?.overtime1 || "",
        overtime2: existingData?.overtime2 || "",
        nightHrs: existingData?.nightHrs || 0,
        timeSalary: existingData?.timeSalary || 0,
        pieceSalary: existingData?.pieceSalary || 0,
        leaveHour: existingData?.leaveHour || 0,
        leavePay: existingData?.leavePay || 0,
        aLAdjust: existingData?.aLAdjust || 0,
        foodRiel: existingData?.foodRiel || 0,
        lunchRiel: existingData?.lunchRiel || 0,
        probation: existingData?.probation || false,
      });
    }

    return rows;
  };

  const [monthRows, setMonthRows] = useState<PayrollRow[]>(generateMonthRows());

  const cellInputClass = `
    text-center text-xs
    border-0 bg-transparent shadow-none
    focus:ring-0 focus:ring-offset-0 focus:outline-none
    focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
  `;

  // Update monthRows when selectedMonth changes
  React.useEffect(() => {
    setMonthRows(generateMonthRows());
  }, [selectedMonth, payrollData]);

  // Handle field change
  const handleFieldChange = (
    rowId: number,
    field: keyof PayrollRow,
    value: any
  ) => {
    setMonthRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className="p-4 w-full overflow-x-auto">
      <div className="mb-4">
        {!selectedMonth ? (
          <h2 className="text-lg font-semibold">Please select a month!</h2>
        ) : (
          <h2 className="text-lg font-semibold">
            Payroll for {selectedMonth} ({monthRows.length} days)
          </h2>
        )}
      </div>
      <div className="relative border rounded-lg">
        <Table
          className={`text-xs ${
            !selectedMonth ? "blur-sm pointer-events-none select-none" : ""
          }`}
        >
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Day
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Day Status
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Work Status
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Shift
              </TableHead>
              <TableHead className="text-center font-bold border-r" colSpan={4}>
                Time
              </TableHead>
              <TableHead className="text-center font-bold border-r" colSpan={2}>
                Late
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Normal
              </TableHead>
              <TableHead className="text-center font-bold border-r" colSpan={2}>
                OverTime
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Night
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Time Salary
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Piece Salary
              </TableHead>
              <TableHead className="text-center font-bold border-r" colSpan={2}>
                Leave
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                A_L Adjust
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Food (Riels)
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Lunch (Riels)
              </TableHead>
              <TableHead className="text-center font-bold border-r" rowSpan={2}>
                Probation
              </TableHead>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center text-xs border-r">In</TableHead>
              <TableHead className="text-center text-xs border-r">
                Out
              </TableHead>
              <TableHead className="text-center text-xs border-r">In</TableHead>
              <TableHead className="text-center text-xs border-r">
                Out
              </TableHead>
              <TableHead className="text-center text-xs border-r">
                Late In
              </TableHead>
              <TableHead className="text-center text-xs border-r">
                Late Out
              </TableHead>
              <TableHead className="text-center text-xs border-r">
                OT1
              </TableHead>
              <TableHead className="text-center text-xs border-r">
                OT2
              </TableHead>
              <TableHead className="text-center text-xs border-r">
                Hour
              </TableHead>
              <TableHead className="text-center text-xs border-r">
                Pay
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthRows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50 border-black">
                <TableCell className="text-center border-x text-sm border-black">
                  {row.day}
                </TableCell>
                <TableCell className="text-center border-r text-sm border-black">
                  {row.dayStatus}
                </TableCell>

                {/* Work Status - Editable Select */}
                <TableCell className="text-center border-r p-0 border-black">
                  <Select
                    value={row.workStatus}
                    onValueChange={(value) =>
                      handleFieldChange(row.id, "workStatus", value)
                    }
                  >
                    <SelectTrigger className={`w-full ${cellInputClass}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Work Status</SelectLabel>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="overtime">OverTime</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Shift - Editable Input */}
                <TableCell className="text-center border-r p-0 border-black">
                  <Input
                    type="text"
                    value={row.shift}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "shift",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-16 text-center ${cellInputClass}`}
                  />
                </TableCell>

                {/* Time In 1 - Editable */}
                <TableCell className="text-center border-r bg-cyan-100 p-0 border-black">
                  {/* <Input
                    type="time"
                    value={formatTimeForInput(row.timeIn1)}
                    onChange={(e) =>
                      handleTimeChange(row.id, "timeIn1", e.target.value)
                    }
                    className="w-28"
                  /> */}
                  <TimeHMInput
                    value={row.timeIn1}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) =>
                      handleFieldChange(row.id, "timeIn1", date)
                    }
                  />
                </TableCell>

                {/* Time Out 1 - Editable */}
                <TableCell className="text-center border-r bg-orange-100 p-0 border-black">
                  {/* <Input
                    type="time"
                    value={formatTimeForInput(row.timeOut1)}
                    onChange={(e) =>
                      handleTimeChange(row.id, "timeOut1", e.target.value)
                    }
                    className="w-28"
                  /> */}
                  <TimeHMInput
                    value={row.timeOut1}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) =>
                      handleFieldChange(row.id, "timeOut1", date)
                    }
                  />
                </TableCell>

                {/* Time In 2 - Editable */}
                <TableCell className="text-center border-r bg-cyan-100 p-0 border-black">
                  {/* <Input
                    type="time"
                    value={formatTimeForInput(row.timeIn2)}
                    onChange={(e) =>
                      handleTimeChange(row.id, "timeIn2", e.target.value)
                    }
                    className="w-28"
                  /> */}
                  <TimeHMInput
                    value={row.timeIn2}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) =>
                      handleFieldChange(row.id, "timeIn2", date)
                    }
                  />
                </TableCell>

                {/* Time Out 2 - Editable */}
                <TableCell className="text-center border-r bg-orange-100 p-0 border-black">
                  {/* <Input
                    type="time"
                    value={formatTimeForInput(row.timeOut2)}
                    onChange={(e) =>
                      handleTimeChange(row.id, "timeOut2", e.target.value)
                    }
                    className="w-28"
                  /> */}
                  <TimeHMInput
                    value={row.timeOut2}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) =>
                      handleFieldChange(row.id, "timeOut2", date)
                    }
                  />
                </TableCell>

                {/* Late In - Editable */}
                <TableCell className="text-center border-r bg-pink-200 p-0 border-black">
                  {/* <Input
                    type="time"
                    value={formatTimeForInput(row.lateIn)}
                    onChange={(e) =>
                      handleTimeChange(row.id, "lateIn", e.target.value)
                    }
                    className="w-28"
                  /> */}
                  <TimeHMInput
                    value={row.lateIn}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) =>
                      handleFieldChange(row.id, "lateIn", date)
                    }
                  />
                </TableCell>

                {/* Late Out - Editable */}
                <TableCell className="text-center border-r bg-pink-200 p-0 border-black">
                  {/* <Input
                    type="time"
                    value={formatTimeForInput(row.lateOut)}
                    onChange={(e) =>
                      handleTimeChange(row.id, "lateOut", e.target.value)
                    }
                    className="w-28"
                  /> */}
                  <TimeHMInput
                    value={row.lateOut}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) =>
                      handleFieldChange(row.id, "lateOut", date)
                    }
                  />
                </TableCell>

                {/* Normal Hours - Editable */}
                <TableCell className="text-center border-r bg-yellow-200 p-0 border-black">
                  <Input
                    type="text"
                    value={row.normalHrs}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "normalHrs",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-16 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Overtime 1 - Editable */}
                <TableCell className="text-center border-r bg-green-300 p-0 border-black">
                  <Input
                    type="text"
                    value={row.overtime1}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "overtime1",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-16 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Overtime 2 - Editable */}
                <TableCell className="text-center border-r bg-green-300 p-0 border-black">
                  <Input
                    type="text"
                    value={row.overtime2}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "overtime2",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-16 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Night Hours - Editable (Number) */}
                <TableCell className="text-center border-r bg-green-300 p-0 border-black">
                  <Input
                    type="text"
                    value={row.nightHrs}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "nightHrs",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-20 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Time Salary - Editable (Number) */}
                <TableCell className="text-center border-r p-0 border-black">
                  <Input
                    type="text"
                    value={row.timeSalary}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "timeSalary",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-28 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Piece Salary - Editable (Number) */}
                <TableCell className="text-center border-r p-0 border-black">
                  <Input
                    type="text"
                    value={row.pieceSalary}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "pieceSalary",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-28 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Leave Hour - Editable (Number) */}
                <TableCell className="text-center border-r bg-blue-200 p-0 border-black">
                  <Input
                    type="text"
                    value={row.leaveHour}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "leaveHour",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-20 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Leave Pay - Editable (Number) */}
                <TableCell className="text-center border-r bg-blue-200 p-0 border-black">
                  <Input
                    type="text"
                    value={row.leavePay}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "leavePay",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-20 ${cellInputClass}`}
                  />
                </TableCell>

                {/* A_L Adjust - Editable (Number) */}
                <TableCell className="text-center border-r bg-blue-200 p-0 border-black">
                  <Input
                    type="text"
                    value={row.aLAdjust}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "aLAdjust",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-20 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Food Riel - Editable (Number) */}
                <TableCell className="text-center border-r bg-green-100 p-0 border-black">
                  <Input
                    type="text"
                    value={row.foodRiel}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "foodRiel",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-28 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Lunch Riel - Editable (Number) */}
                <TableCell className="text-center border-r bg-green-100 p-0 border-black">
                  <Input
                    type="text"
                    value={row.lunchRiel}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value;

                      const digitsOnly = raw.replace(/\D/g, "");
                      handleFieldChange(
                        row.id,
                        "lunchRiel",
                        digitsOnly === "" ? 0 : Number(digitsOnly)
                      );
                    }}
                    className={`w-28 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Probation - Editable Checkbox */}
                <TableCell className="text-center p-0 border-x border-black">
                  <Checkbox
                    checked={row.probation}
                    onCheckedChange={(checked) =>
                      handleFieldChange(row.id, "probation", checked)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!selectedMonth && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                Please select a month
              </p>
              <p className="text-sm text-gray-700">
                Use the month picker above to view payroll data
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollsTable;
