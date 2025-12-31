export interface IWorkingShiftOption {
  value: number;
  label: string;
  description: string;
}

export interface IWorkingShift {
  id?: number;
  name?: string;
  description?: string;
  firstInTime?: string;
  firstOutTime?: string;
  secondInTime?: string;
  secondOutTime?: string;
  breakMinutes?: number;
  lateAllowMinutes?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
