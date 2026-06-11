import { IAudit } from "./audit-entity";

export interface ILeaveRequest extends IAudit {
  id?: number;
  employeeId?: number;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  totalDays?: number;
  reason?: string;
  requestDate?: string;
  status?: string;
}
