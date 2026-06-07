import { IAudit } from "./audit-entity";

export interface IHoliday extends IAudit {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export interface ICalendar extends IAudit {
  date?: string;
  day?: string;
  dayStatus?: string;
}
