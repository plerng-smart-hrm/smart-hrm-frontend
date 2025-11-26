import React from "react";
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
  timeIn1: string;
  timeOut1: string;
  timeIn2: string;
  timeOut2: string;
  lateIn: string;
  lateOut: string;
  normalHrs: number | string;
  overtime1: number | string;
  overtime2: number | string;
  nightHrs: string;
  timeSalary: string;
  pieceSalary: string;
  leaveHour: string;
  leavePay: string;
  aLAdjust: string;
  foodRiel: string;
  lunchRiel: string;
  probation: boolean;
}

const PayrollsTable: React.FC<PayrollsTableProps> = ({ selectedMonth }) => {
  // Sample data - replace with your actual data from API/database
  const payrollData: PayrollRow[] = [
    {
      id: 1,
      day: 1,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: "6:30",
      timeOut1: "11:03",
      timeIn2: "1:30",
      timeOut2: "5:03",
      lateIn: "11:40",
      lateOut: "16:03",
      normalHrs: 8,
      overtime1: 8,
      overtime2: 0,
      nightHrs: "50",
      timeSalary: "$8,000",
      pieceSalary: "$200",
      leaveHour: "1",
      leavePay: "5",
      aLAdjust: "20",
      foodRiel: "4,000",
      lunchRiel: "2,000",
      probation: true,
    },
    {
      id: 2,
      day: 15,
      dayStatus: "Work",
      workStatus: "work",
      shift: 1,
      timeIn1: "6:45",
      timeOut1: "11:15",
      timeIn2: "1:30",
      timeOut2: "5:15",
      lateIn: "11:50",
      lateOut: "16:15",
      normalHrs: 8,
      overtime1: 4,
      overtime2: 0,
      nightHrs: "30",
      timeSalary: "$8,000",
      pieceSalary: "$150",
      leaveHour: "0",
      leavePay: "0",
      aLAdjust: "15",
      foodRiel: "4,000",
      lunchRiel: "2,000",
      probation: true,
    },
  ];

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
        workStatus: "work",
        shift: 1,
        timeIn1: "",
        timeOut1: "",
        timeIn2: "",
        timeOut2: "",
        lateIn: "",
        lateOut: "",
        normalHrs: "",
        overtime1: "",
        overtime2: "",
        nightHrs: "",
        timeSalary: "",
        pieceSalary: "",
        leaveHour: "",
        leavePay: "",
        aLAdjust: "",
        foodRiel: "",
        lunchRiel: "",
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
        timeIn1: existingData?.timeIn1 || "",
        timeOut1: existingData?.timeOut1 || "",
        timeIn2: existingData?.timeIn2 || "",
        timeOut2: existingData?.timeOut2 || "",
        lateIn: existingData?.lateIn || "",
        lateOut: existingData?.lateOut || "",
        normalHrs: existingData?.normalHrs || "",
        overtime1: existingData?.overtime1 || "",
        overtime2: existingData?.overtime2 || "",
        nightHrs: existingData?.nightHrs || "",
        timeSalary: existingData?.timeSalary || "",
        pieceSalary: existingData?.pieceSalary || "",
        leaveHour: existingData?.leaveHour || "",
        leavePay: existingData?.leavePay || "",
        aLAdjust: existingData?.aLAdjust || "",
        foodRiel: existingData?.foodRiel || "",
        lunchRiel: existingData?.lunchRiel || "",
        probation: existingData?.probation || false,
      });
    }

    return rows;
  };

  const monthRows = generateMonthRows();

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
          className={
            !selectedMonth ? "blur-sm pointer-events-none select-none" : ""
          }
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
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell className={`text-center border-r text-sm`}>
                  {row.day}
                </TableCell>
                <TableCell className={`text-center border-r text-sm`}>
                  {row.dayStatus}
                </TableCell>
                <TableCell className="text-center border-r">
                  <Select value={row.workStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
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
                <TableCell className={`text-center border-r text-sm`}>
                  {row.shift}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-cyan-100`}
                >
                  {row.timeIn1}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-orange-100`}
                >
                  {row.timeOut1}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-cyan-100`}
                >
                  {row.timeIn2}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-orange-100`}
                >
                  {row.timeOut2}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-pink-200`}
                >
                  {row.lateIn}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-pink-200`}
                >
                  {row.lateOut}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-yellow-200`}
                >
                  {row.normalHrs}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-green-300`}
                >
                  {row.overtime1}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-green-300`}
                >
                  {row.overtime2}
                </TableCell>
                <TableCell className="text-center border-r text-sm bg-green-300">
                  {row.nightHrs}
                </TableCell>
                <TableCell className={`text-center border-r text-sm`}>
                  {row.timeSalary}
                </TableCell>
                <TableCell className={`text-center border-r text-sm`}>
                  {row.pieceSalary}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-blue-200`}
                >
                  {row.leaveHour}
                </TableCell>
                <TableCell
                  className={`text-center border-r text-sm bg-blue-200`}
                >
                  {row.leavePay}
                </TableCell>
                <TableCell className="text-center border-r text-sm bg-blue-200">
                  {row.aLAdjust}
                </TableCell>
                <TableCell className="text-center border-r text-sm bg-green-100">
                  {row.foodRiel}
                </TableCell>
                <TableCell className="text-center border-r text-sm bg-green-100">
                  {row.lunchRiel}
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox checked={row.probation} />
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
