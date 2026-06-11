import { IEmployee } from "./employee";
import { IWorkingShift } from "./working-shift";

export interface IAttendanceSummary {
  id?: number;
  employee?: IEmployee;
  workingShift?: IWorkingShift;
  date?: string;
  firstIn?: string;
  firstOut?: string;
  secondIn?: string;
  secondOut?: string;
  workingHours?: string;
  overtime1?: string;
  overtime2?: string;
  lateMinutes?: number;
  leaveType?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Employee Attendance Summary Types
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LEAVE" | "HOLIDAY";

export interface IAttendanceTime {
  fi: string | null;
  fo: string | null;
  si: string | null;
  so: string | null;
}

export interface IAttendanceOvertime {
  ot1: number;
  ot2: number;
  otNight: number;
}

export interface IDailyAttendance {
  date: string;
  day: string;
  dayStatus: string;
  workStatus: string;
  time: IAttendanceTime;
  lateMinutes: number;
  normalHours?: number;
  nightHours?: number;
  leaveHours?: number;
  totalPhHours?: number;
  totalLeaveHours?: number;
  status: AttendanceStatus;
  reason: string | null;
  overtime: IAttendanceOvertime;
  adjust: string | null;
  bonusTarget?: number;
  wageNormal?: number;
  wageOT1?: number;
  wageOT2?: number;
  wageOTNight?: number;
  wagePH?: number;
  wageLeave?: number;
  wageLeavePH?: number;
  timeSalary?: number;
  total?: number;
  bonusOtFood?: number;
  bonusLunch?: number;
}

export interface IAttendanceTotals {
  totalNormalHours: number;
  totalOt1: number;
  totalOt2: number;
  totalOtNight: number;
  totalWageNormal: number;
  totalWageOT1: number;
  totalWageOT2: number;
  totalWageOTNight: number;
  totalTimeSalary: number;
  totalBonusOtFood: number;
  totalBonusLunch: number;
  totalWorkingHours: number;
  totalLateMinutes: number;
  totalBonusTarget: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  holidayDays: number;
  dayOffDays: number;
  grandTotal: number;
}

export interface IEmployeeAttendanceSummary {
  // empId: number;
  // empCode: string;
  // firstName: string;
  // lastName: string;
  // firstNameKh: string | null;
  // lastNameKh: string | null;
  // gender: string;
  // position: string;
  // joinDate: string;
  attendanceSummary: IDailyAttendance[];
  totals: IAttendanceTotals;
  employee?: IEmployee;
}

export interface ITriggerAttendanceSummaryResponse {
  date?: string;
  total?: number;
  succeeded?: number;
  failed?: number;
  failedEmployeeIds?: number[];
}
