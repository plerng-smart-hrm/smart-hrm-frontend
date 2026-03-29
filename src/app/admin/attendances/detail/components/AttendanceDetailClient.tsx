"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeInfoCard from "./EmployeeInfoCard";
import AttendanceTable from "./AttendanceTable";
import MonthlyTotalsCard from "./MonthlyTotalsCard";
import { IEmployeeAttendanceSummary } from "@/types/admin/attendance-summary";

// Mock data for demonstration
const mockData: IEmployeeAttendanceSummary = {
  empId: 12,
  empCode: "EMP-0001",
  firstName: "John",
  lastName: "Doe",
  firstNameKh: "ជូន",
  lastNameKh: "ដូ",
  gender: "Male",
  position: "Software Engineer",
  joinDate: "2023-01-15",
  attendanceSummary: [
    {
      date: "2025-03-01",
      day: "Sat",
      time: { fi: null, fo: null, si: null, so: null },
      lateMinutes: 0,
      workingHours: 0,
      status: "HOLIDAY",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-02",
      day: "Sun",
      time: { fi: null, fo: null, si: null, so: null },
      lateMinutes: 0,
      workingHours: 0,
      status: "HOLIDAY",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-03",
      day: "Mon",
      time: { fi: "08:00", fo: "12:00", si: "13:00", so: "17:00" },
      lateMinutes: 0,
      workingHours: 8,
      status: "PRESENT",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-04",
      day: "Tue",
      time: { fi: "08:15", fo: "12:00", si: "13:00", so: "17:00" },
      lateMinutes: 15,
      workingHours: 8,
      status: "PRESENT",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-05",
      day: "Wed",
      time: { fi: "08:00", fo: "12:00", si: "13:00", so: "20:00" },
      lateMinutes: 0,
      workingHours: 8,
      status: "PRESENT",
      reason: null,
      overtime: { ot1: 3, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-06",
      day: "Thu",
      time: { fi: null, fo: null, si: null, so: null },
      lateMinutes: 0,
      workingHours: 0,
      status: "LEAVE",
      reason: "ANNUAL_LEAVE",
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-07",
      day: "Fri",
      time: { fi: "08:00", fo: "12:00", si: "13:00", so: "17:00" },
      lateMinutes: 0,
      workingHours: 8,
      status: "PRESENT",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-08",
      day: "Sat",
      time: { fi: "08:00", fo: "12:00", si: null, so: null },
      lateMinutes: 0,
      workingHours: 4,
      status: "PRESENT",
      reason: null,
      overtime: { ot1: 0, ot2: 4 },
      adjust: "Weekend work",
    },
    {
      date: "2025-03-09",
      day: "Sun",
      time: { fi: null, fo: null, si: null, so: null },
      lateMinutes: 0,
      workingHours: 0,
      status: "HOLIDAY",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
    {
      date: "2025-03-10",
      day: "Mon",
      time: { fi: "07:00", fo: "11:00", si: "12:00", so: "20:00" },
      lateMinutes: 0,
      workingHours: 8,
      status: "PRESENT",
      reason: null,
      overtime: { ot1: 4, ot2: 0 },
      adjust: "Manual adjustment",
    },
    {
      date: "2025-03-11",
      day: "Tue",
      time: { fi: null, fo: null, si: null, so: null },
      lateMinutes: 0,
      workingHours: 0,
      status: "ABSENT",
      reason: null,
      overtime: { ot1: 0, ot2: 0 },
      adjust: null,
    },
  ],
  totals: {
    totalOt1: 7,
    totalOt2: 4,
    totalWorkingHours: 44,
    totalLateMinutes: 15,
    presentDays: 6,
    absentDays: 1,
    leaveDays: 1,
    holidayDays: 3,
  },
};

const AttendanceDetailClient = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [employeeData] = useState<IEmployeeAttendanceSummary | null>(mockData);

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Panel - Employee Info */}
          <div className="col-span-12 lg:col-span-2 border-r pr-4">
            <EmployeeInfoCard employee={employeeData} />
          </div>

          {/* Center Panel - Attendance Table */}
          <div className="col-span-12 lg:col-span-8">
            <AttendanceTable
              attendanceData={employeeData?.attendanceSummary ?? []}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />
          </div>

          {/* Right Panel - Monthly Totals */}
          <div className="col-span-12 lg:col-span-2 border-l pl-4">
            <MonthlyTotalsCard totals={employeeData?.totals ?? null} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceDetailClient;
