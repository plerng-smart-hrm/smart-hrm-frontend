"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IAttendanceLog } from "@/types/admin/attendance-log";
import { SharedBadge } from "@/components/shared/SharedBadge";
import { formatToDate, formatToDateTime } from "@/utils/shared-format";

export const attendanceLogsColumns = (): ColumnDef<IAttendanceLog>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Code",
      cell: ({ row }) => <div>{row.original.employee?.empCode}</div>,
    },
    {
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">
            {row.original.employee?.lastName} {row.original.employee?.firstName}
          </p>
          <span className="text-muted-foreground text-sm">
            {row.original.employee?.lastNameKh} {row.original.employee?.firstNameKh}
          </span>
        </div>
      ),
    },
    {
      header: "Scan Time",
      cell: ({ row }) => (
        <div>
          <SharedBadge variant={"blue"}>{formatToDateTime(row.original.scanTime)}</SharedBadge>
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
      cell: ({ row }) => <div>{formatToDate(row.original.createdAt)}</div>,
    },
  ];
};
