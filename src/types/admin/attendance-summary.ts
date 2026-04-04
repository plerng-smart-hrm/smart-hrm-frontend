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
}

export interface IDailyAttendance {
  date: string;
  day: string;
  time: IAttendanceTime;
  lateMinutes: number;
  workingHours: number;
  status: AttendanceStatus;
  reason: string | null;
  overtime: IAttendanceOvertime;
  adjust: string | null;
}

export interface IAttendanceTotals {
  totalOt1: number;
  totalOt2: number;
  totalWorkingHours: number;
  totalLateMinutes: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  holidayDays: number;
}

export interface IEmployeeAttendanceSummary {
  empId: number;
  empCode: string;
  firstName: string;
  lastName: string;
  firstNameKh: string | null;
  lastNameKh: string | null;
  gender: string;
  position: string;
  joinDate: string;
  attendanceSummary: IDailyAttendance[];
  totals: IAttendanceTotals;
}


export interface ITriggerAttendanceSummaryResponse {
  date?: string;
  total?: number;
  succeeded?: number; 
  failed?: number; 
  failedEmployeeIds?: number[]; 
}
