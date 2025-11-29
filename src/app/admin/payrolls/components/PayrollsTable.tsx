"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import TimeHMInput from "./TimeHMInput"

type PayrollsTableProps = {
  selectedMonth?: string
}

// Payroll row interface
interface PayrollRow {
  id: number
  day: number
  dayStatus: string
  workStatus: "work" | "overtime"
  shift: number
  timeIn1: Date | null
  timeOut1: Date | null
  timeIn2: Date | null
  timeOut2: Date | null
  lateIn: Date | null
  lateOut: Date | null
  normalHrs: number | string
  overtime1: number | string
  overtime2: number | string
  nightHrs: number
  timeSalary: number
  pieceSalary: number
  leaveHour: number
  leavePay: number
  aLAdjust: number
  foodRiel: number
  lunchRiel: number
  probation: boolean
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
      probation: false,
    },
  ]

  const [payrollData, setPayrollData] = useState<PayrollRow[]>(initialPayrollData)

  // Get number of days in selected month
  const getDaysInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split("-").map(Number)
    return new Date(year, month, 0).getDate()
  }

  // Get day of week name (Sunday, Monday, etc.)
  const getDayOfWeek = (yearMonth: string, day: number) => {
    const [year, month] = yearMonth.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[date.getDay()]
  }

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
      }))
    }

    const daysInMonth = getDaysInMonth(selectedMonth)
    const rows: PayrollRow[] = []

    for (let day = 1; day <= daysInMonth; day++) {
      const existingData = payrollData.find((data) => data.day === day)
      const dayOfWeek = getDayOfWeek(selectedMonth, day)
      const isSunday = dayOfWeek === "Sunday"

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
      })
    }

    return rows
  }

  const [monthRows, setMonthRows] = useState<PayrollRow[]>(generateMonthRows())

  const cellInputClass = `
    text-center text-xs
    border-0 bg-transparent shadow-none
    focus:ring-0 focus:ring-offset-0 focus:outline-none
    focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
    p-0
  `

  // Update monthRows when selectedMonth changes
  React.useEffect(() => {
    setMonthRows(generateMonthRows())
  }, [selectedMonth, payrollData])

  // Handle field change
  const handleFieldChange = (rowId: number, field: keyof PayrollRow, value: any) => {
    setMonthRows((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)))
  }

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
        <Table className={`text-xs ${!selectedMonth ? "blur-sm pointer-events-none select-none" : ""}`}>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center font-bold border-r p-2" rowSpan={2}>
                Day
              </TableHead>
              <TableHead className="text-center font-bold border-r p-2" rowSpan={2}>
                Day Status
              </TableHead>
              <TableHead className="text-center font-bold border-r p-2" rowSpan={2}>
                Work Status
              </TableHead>
              <TableHead className="text-center font-bold border-r p-2" rowSpan={2}>
                Shift
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" colSpan={4}>
                Time
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" colSpan={2}>
                Late
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                Normal
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" colSpan={2}>
                OverTime
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                Night
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                Time Salary
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                Piece Salary
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" colSpan={2}>
                Leave
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                A_L Adjust
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                Food (Riels)
              </TableHead>
              <TableHead className="text-center font-bold border-r p-0" rowSpan={2}>
                Lunch (Riels)
              </TableHead>
              <TableHead className="text-center font-bold border-r p-2" rowSpan={2}>
                Probation
              </TableHead>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center text-xs border-r p-0">In</TableHead>
              <TableHead className="text-center text-xs border-r p-0">Out</TableHead>
              <TableHead className="text-center text-xs border-r p-0">In</TableHead>
              <TableHead className="text-center text-xs border-r p-0">Out</TableHead>
              <TableHead className="text-center text-xs border-r p-0">Late In</TableHead>
              <TableHead className="text-center text-xs border-r p-0">Late Out</TableHead>
              <TableHead className="text-center text-xs border-r p-0">OT1</TableHead>
              <TableHead className="text-center text-xs border-r p-0">OT2</TableHead>
              <TableHead className="text-center text-xs border-r p-0">Hour</TableHead>
              <TableHead className="text-center text-xs border-r p-0">Pay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthRows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50 border-black">
                <TableCell className={`text-center border-x border-black p-0`}>{row.day}</TableCell>
                <TableCell
                  className={`text-center border-r border-black p-0 ${row.dayStatus == "Sunday" ? "text-red-500" : ""}`}
                >
                  {row.dayStatus}
                </TableCell>

                {/* Work Status - Editable Select */}
                <TableCell className="text-center border-r py-2 border-black">
                  <Select
                    value={row.workStatus}
                    onValueChange={(value) => handleFieldChange(row.id, "workStatus", value)}
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "shift", digitsOnly === "" ? 0 : Number(digitsOnly))
                    }}
                    className={`w-16 text-center ${cellInputClass}`}
                  />
                </TableCell>

                {/* Time In 1 - Editable */}
                <TableCell className="text-center border-r bg-cyan-100 p-0 border-black">
                  <TimeHMInput
                    value={row.timeIn1}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) => handleFieldChange(row.id, "timeIn1", date)}
                  />
                </TableCell>

                {/* Time Out 1 - Editable */}
                <TableCell className="text-center border-r bg-orange-100 p-0 border-black">
                  <TimeHMInput
                    value={row.timeOut1}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) => handleFieldChange(row.id, "timeOut1", date)}
                  />
                </TableCell>

                {/* Time In 2 - Editable */}
                <TableCell className="text-center border-r bg-cyan-100 p-0 border-black">
                  <TimeHMInput
                    value={row.timeIn2}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) => handleFieldChange(row.id, "timeIn2", date)}
                  />
                </TableCell>

                {/* Time Out 2 - Editable */}
                <TableCell className="text-center border-r bg-orange-100 p-0 border-black">
                  <TimeHMInput
                    value={row.timeOut2}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) => handleFieldChange(row.id, "timeOut2", date)}
                  />
                </TableCell>

                {/* Late In - Editable */}
                <TableCell className="text-center border-r bg-pink-200 p-0 border-black">
                  <TimeHMInput
                    value={row.lateIn}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) => handleFieldChange(row.id, "lateIn", date)}
                  />
                </TableCell>

                {/* Late Out - Editable */}
                <TableCell className="text-center border-r bg-pink-200 p-0 border-black">
                  <TimeHMInput
                    value={row.lateOut}
                    selectedMonth={selectedMonth}
                    day={row.day}
                    disabled={!selectedMonth}
                    onChange={(date) => handleFieldChange(row.id, "lateOut", date)}
                  />
                </TableCell>

                {/* Normal Hours - Editable */}
                <TableCell className="text-center border-r bg-yellow-200 p-0 border-black">
                  <Input
                    type="text"
                    value={row.normalHrs}
                    inputMode="numeric"
                    onChange={(e) => {
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "normalHrs", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "overtime1", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "overtime2", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "nightHrs", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "timeSalary", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "pieceSalary", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "leaveHour", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "leavePay", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "aLAdjust", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "foodRiel", digitsOnly === "" ? 0 : Number(digitsOnly))
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
                      const raw = e.target.value

                      const digitsOnly = raw.replace(/\D/g, "")
                      handleFieldChange(row.id, "lunchRiel", digitsOnly === "" ? 0 : Number(digitsOnly))
                    }}
                    className={`w-28 ${cellInputClass}`}
                  />
                </TableCell>

                {/* Probation - Editable Checkbox */}
                <TableCell className="text-center p-0 border-x border-black">
                  <Checkbox
                    checked={row.probation}
                    onCheckedChange={(checked) => handleFieldChange(row.id, "probation", checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="text-right bg-red-400 font-bold border border-black p-4" colSpan={8}>
                Total
              </TableCell>
              <TableCell className="text-center border border-black bg-pink-200 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-pink-200 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-yellow-200 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-green-300 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-green-300 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-green-300 p-0">0</TableCell>
              <TableCell className="text-center border border-black p-0">0</TableCell>
              <TableCell className="text-center border border-black p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-blue-200 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-blue-200 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-blue-200 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-green-100 p-0">0</TableCell>
              <TableCell className="text-center border border-black bg-green-100 p-0">0</TableCell>
              <TableCell className="text-center border border-black p-0"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {!selectedMonth && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Please select a month</p>
              <p className="text-sm text-gray-700">Use the month picker above to view payroll data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PayrollsTable
