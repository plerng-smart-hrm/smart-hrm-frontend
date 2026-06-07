import { IAudit } from "./audit-entity";

export interface ITimeShiftOption {
  value: number;
  label: string;
  fIn: string;
  fOut: string | null;
  sIn: string | null;
  sOut: string;
}

export interface ITimeShift extends IAudit {
  id?: number;
  name?: string;
  description?: string;
  fIn?: string;
  fOut?: string;
  sIn?: string;
  sOut?: string;
  breakMinutes?: number;
  graceMins?: number;
  shiftHours?: string;
  sundayIsHoliday?: boolean;
  scanMode?: string;
  wageMultiplier?: string;
}
