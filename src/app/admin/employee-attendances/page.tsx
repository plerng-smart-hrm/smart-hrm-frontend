"use client"
import { useState } from "react"
import PositionSidebar from "./components/PositionSidebar"
import AttendanceTable from "./components/AttendanceTable"

export default function EmployeeAttendancesPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployee(employeeId)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar - Position List */}
      <PositionSidebar 
        selectedPosition={selectedPosition} 
        selectedEmployee={selectedEmployee}
        onSelectPosition={setSelectedPosition}
        onSelectEmployee={handleSelectEmployee}
      />

      {/* Right Section - Attendance Detail Table */}
      <AttendanceTable selectedEmployee={selectedEmployee} />
    </div>
  )
}