"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IAttendanceLog } from "@/types/admin/attendance-log";

export const attendanceLogsColumns = (): ColumnDef<IAttendanceLog>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">{row.original.employee?.firstNameKh}</p>
          <span className="text-muted-foreground text-sm">
            {row.original.employee?.lastNameKh}
          </span>
        </div>
      ),
    },
    {
      header: "Scan Time",
      cell: ({ row }) => (
        <div>
          <p>{row.original.scanTime}</p>
        </div>
      ),
    },
    {
      header: "Action Type",
      cell: ({ row }) => (
        <div>
          <p>{row.original.actionType}</p>
        </div>
      ),
    },
    {
      header: "Device",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
          {row.original.device?.name}
        </span>
      ),
    },
    {
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.original.createdAt ?? "").toLocaleDateString(),
    },
  ];
};
