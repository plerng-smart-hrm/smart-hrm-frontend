export interface IAudit {
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
