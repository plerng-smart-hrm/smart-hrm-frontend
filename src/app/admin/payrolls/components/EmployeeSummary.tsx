"use client"
import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EmployeeData {
  month: string
  name: string
  khmerName: string
  startDate: string
  department: string
  position: string
  otStatus: string
  employeeSalary: {
    base: number
    piece: number
  }
  payPerDay: {
    normal: number
    piece: number
  }
  salaryBreakdown: {
    timeSalary: number
    pieceIncentive: number
    leavePay: number
    functionBonus: number
    allowance: number
    skillBonus: number
    attendanceAllowance: number
    seniorityBonus: number
    transportPay: number
  }
  adjustments: {
    adjustment: number
    deduct: number
  }
  annualLeave: {
    days: number
    hours: number
    amount: number
  }
  bonuses: {
    fivePercent: number
    udcYearBonus: number
  }
  maternityLeave: {
    maternityleavePay: number
    dayCareAllowance: number
  }
  totalPay: number
  tax: {
    tax: number
    taxTwentyPercent: number
  }
  deductions: {
    loan: number
    unionFee: number
    pension: number
    oneToFifteenPayment: number
  }
  takeHome: number
  scanTimes: string[]
}

const EmployeeSummary: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    month: "11-2025",
    name: "MAK THAN",
    khmerName: "មាក់ ថាន់",
    startDate: "01-Nov-24",
    department: "Packing-包装",
    position: "Folding-打包",
    otStatus: "Monthly wage OT",
    employeeSalary: {
      base: 208,
      piece: 206,
    },
    payPerDay: {
      normal: 8.0,
      piece: 7.9231,
    },
    salaryBreakdown: {
      timeSalary: 0,
      pieceIncentive: 0,
      leavePay: 0,
      functionBonus: 0,
      allowance: 0,
      skillBonus: 0,
      attendanceAllowance: 0,
      seniorityBonus: 0,
      transportPay: 0,
    },
    adjustments: {
      adjustment: 0,
      deduct: 0,
    },
    annualLeave: {
      days: 0,
      hours: 0,
      amount: 0,
    },
    bonuses: {
      fivePercent: 0,
      udcYearBonus: 0,
    },
    maternityLeave: {
      maternityleavePay: 0,
      dayCareAllowance: 0,
    },
    totalPay: 0,
    tax: {
      tax: 0,
      taxTwentyPercent: 0,
    },
    deductions: {
      loan: 0,
      unionFee: 0,
      pension: 0,
      oneToFifteenPayment: 0,
    },
    takeHome: 0,
    scanTimes: ["6:50", "16:05", "11:40", "11:05"],
  })

  return (
    <div className="p-3">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-slate-900">Payroll Summary</h1>
        <p className="text-xs text-slate-600">{employeeData.month}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Left - Employee Info */}
        <EmployeeInfoCard employeeData={employeeData} setEmployeeData={setEmployeeData} />

        {/* Middle - Earnings */}
        <SalaryEarningsCard employeeData={employeeData} setEmployeeData={setEmployeeData} />

        {/* Right - Deductions */}
        <SalaryDeductionsCard employeeData={employeeData} setEmployeeData={setEmployeeData} />
      </div>

      {/* Summary Row */}
      <SalarySummaryCard employeeData={employeeData} setEmployeeData={setEmployeeData} />
    </div>
  )
}

function EmployeeInfoCard({ employeeData, setEmployeeData }: any) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Employee</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <FormField
          label="Month"
          value={employeeData.month}
          onChange={(value: string) => setEmployeeData({ ...employeeData, month: value })}
        />
        <FormField
          label="Name"
          value={employeeData.name}
          onChange={(value: string) => setEmployeeData({ ...employeeData, name: value })}
        />
        <FormField
          label="Khmer"
          value={employeeData.khmerName}
          onChange={(value: string) => setEmployeeData({ ...employeeData, khmerName: value })}
        />
        <FormField
          label="Start Date"
          value={employeeData.startDate}
          onChange={(value: string) => setEmployeeData({ ...employeeData, startDate: value })}
        />

        <SelectField
          label="Dept"
          value={employeeData.department}
          options={["Packing-包装", "Production", "Quality"]}
          onChange={(value: string) => setEmployeeData({ ...employeeData, department: value })}
        />

        <SelectField
          label="Position"
          value={employeeData.position}
          options={["Folding-打包", "Operator", "Supervisor"]}
          onChange={(value: string) => setEmployeeData({ ...employeeData, position: value })}
        />

        <SelectField
          label="OT Status"
          value={employeeData.otStatus}
          options={["Monthly wage OT", "Hourly OT", "No OT"]}
          onChange={(value: string) => setEmployeeData({ ...employeeData, otStatus: value })}
        />

        <div className="pt-2 border-t space-y-1">
          <Label className="text-xs font-semibold">Base</Label>
          <div className="flex gap-1">
            <Input
              type="number"
              value={employeeData.employeeSalary.base}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  employeeSalary: { ...employeeData.employeeSalary, base: Number(e.target.value) },
                })
              }
              className="h-6 text-xs flex-1"
            />
            <Input
              type="number"
              value={employeeData.employeeSalary.piece}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  employeeSalary: { ...employeeData.employeeSalary, piece: Number(e.target.value) },
                })
              }
              className="h-6 text-xs flex-1"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-2 rounded text-xs font-medium text-blue-600">
          ${employeeData.payPerDay.normal.toFixed(2)} / ${employeeData.payPerDay.piece.toFixed(4)}
        </div>

        {/* Scan Times */}
        <div className="pt-2 border-t space-y-1">
          <Label className="text-xs font-semibold">Scans</Label>
          <div className="grid grid-cols-2 gap-1">
            {employeeData.scanTimes.map((time: string, index: number) => (
              <div key={index} className="bg-purple-100 text-purple-700 text-center text-xs font-semibold py-1 rounded">
                {time}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SalaryEarningsCard({ employeeData, setEmployeeData }: any) {
  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Earnings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <CompactRow
          label="Time Salary"
          value={employeeData.salaryBreakdown.timeSalary}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, timeSalary: value },
            })
          }
        />
        <CompactRow
          label="Piece Inc."
          value={employeeData.salaryBreakdown.pieceIncentive}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, pieceIncentive: value },
            })
          }
        />
        <CompactRow
          label="Leave Pay"
          value={employeeData.salaryBreakdown.leavePay}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, leavePay: value },
            })
          }
        />
        <CompactRow
          label="Func. Bonus"
          value={employeeData.salaryBreakdown.functionBonus}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, functionBonus: value },
            })
          }
        />
        <CompactRow
          label="Allowance"
          value={employeeData.salaryBreakdown.allowance}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, allowance: value },
            })
          }
        />
        <CompactRow
          label="Skill Bonus"
          value={employeeData.salaryBreakdown.skillBonus}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, skillBonus: value },
            })
          }
        />
        <CompactRow
          label="Attend. Allow."
          value={employeeData.salaryBreakdown.attendanceAllowance}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, attendanceAllowance: value },
            })
          }
        />
        <CompactRow
          label="Senior. Bonus"
          value={employeeData.salaryBreakdown.seniorityBonus}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, seniorityBonus: value },
            })
          }
        />
        <CompactRow
          label="Transport"
          value={employeeData.salaryBreakdown.transportPay}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              salaryBreakdown: { ...employeeData.salaryBreakdown, transportPay: value },
            })
          }
        />
        <CompactRow
          label="5% Bonus"
          value={employeeData.bonuses.fivePercent}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              bonuses: { ...employeeData.bonuses, fivePercent: value },
            })
          }
        />
        <CompactRow
          label="Year Bonus"
          value={employeeData.bonuses.udcYearBonus}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              bonuses: { ...employeeData.bonuses, udcYearBonus: value },
            })
          }
        />
      </CardContent>
    </Card>
  )
}

function SalaryDeductionsCard({ employeeData, setEmployeeData }: any) {
  return (
    <Card className="border-l-4 border-l-red-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Deductions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <CompactRow
          label="Tax"
          value={employeeData.tax.tax}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              tax: { ...employeeData.tax, tax: value },
            })
          }
        />
        <CompactRow
          label="Tax (20%)"
          value={employeeData.tax.taxTwentyPercent}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              tax: { ...employeeData.tax, taxTwentyPercent: value },
            })
          }
        />
        <CompactRow
          label="Union Fee"
          value={employeeData.deductions.unionFee}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              deductions: { ...employeeData.deductions, unionFee: value },
            })
          }
        />
        <CompactRow
          label="Pension"
          value={employeeData.deductions.pension}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              deductions: { ...employeeData.deductions, pension: value },
            })
          }
        />
        <CompactRow
          label="Loan"
          value={employeeData.deductions.loan}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              deductions: { ...employeeData.deductions, loan: value },
            })
          }
        />
        <CompactRow
          label="1-15 Payment"
          value={employeeData.deductions.oneToFifteenPayment}
          onChange={(value: number) =>
            setEmployeeData({
              ...employeeData,
              deductions: { ...employeeData.deductions, oneToFifteenPayment: value },
            })
          }
        />
        <div className="pt-2 border-t space-y-1">
          <Label className="text-xs font-semibold">Adjustments</Label>
          <div className="flex gap-1">
            <Input
              type="number"
              value={employeeData.adjustments.adjustment}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  adjustments: { ...employeeData.adjustments, adjustment: Number(e.target.value) },
                })
              }
              className="h-6 text-xs flex-1 text-green-600"
              placeholder="Adj"
            />
            <Input
              type="number"
              value={employeeData.adjustments.deduct}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  adjustments: { ...employeeData.adjustments, deduct: Number(e.target.value) },
                })
              }
              className="h-6 text-xs flex-1 text-red-600"
              placeholder="Ded"
            />
          </div>
        </div>
        <div className="pt-2 border-t space-y-1">
          <Label className="text-xs font-semibold">Leave</Label>
          <div className="flex gap-1">
            <Input
              type="number"
              value={employeeData.annualLeave.days}
              className="h-6 text-xs flex-1"
              placeholder="Days"
            />
            <Input
              type="number"
              value={employeeData.annualLeave.hours}
              className="h-6 text-xs flex-1"
              placeholder="Hrs"
            />
            <Input
              type="number"
              value={employeeData.annualLeave.amount}
              className="h-6 text-xs flex-1"
              placeholder="Amt"
            />
          </div>
        </div>
        <div className="pt-2 border-t space-y-1">
          <Label className="text-xs font-semibold">Maternity</Label>
          <div className="flex gap-1">
            <Input
              type="number"
              value={employeeData.maternityLeave.maternityleavePay}
              className="h-6 text-xs flex-1"
              placeholder="Pay"
            />
            <Input
              type="number"
              value={employeeData.maternityLeave.dayCareAllowance}
              className="h-6 text-xs flex-1"
              placeholder="Care"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SalarySummaryCard({ employeeData, setEmployeeData }: any) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent>
          <p className="text-xs text-slate-600">Total Pay</p>
          <p className="text-lg font-bold text-blue-700">${employeeData.totalPay.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <CardContent>
          <p className="text-xs text-slate-600">Take Home</p>
          <p className="text-lg font-bold text-green-700">${employeeData.takeHome.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper Components
function FormField({ label, value, onChange }: any) {
  return (
    <div className="space-y-0.5">
      <Label className="text-xs font-medium text-slate-700">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-6 text-xs" />
    </div>
  )
}

function SelectField({ label, value, options, onChange }: any) {
  return (
    <div className="space-y-0.5">
      <Label className="text-xs font-medium text-slate-700">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-6 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function CompactRow({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-xs text-slate-600 flex-1">{label}</span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-6 text-xs w-16"
      />
    </div>
  )
}

export default EmployeeSummary
