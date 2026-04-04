"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { IAttendanceSummary } from "@/types/admin/attendance-summary";
import { formatToDate, formatToDateTime } from "@/utils/shared-format";
import { SharedBadge } from "@/components/shared/SharedBadge";

export const attendanceSummaryColumns = (actions: IActions[]): ColumnDef<IAttendanceSummary>[] => {
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
      header: "Date",
      cell: ({ row }) => <SharedBadge variant={"blue"}>{formatToDate(row.original.date)}</SharedBadge>,
    },
    {
      header: "First In",
      cell: ({ row }) => (
        <div>
          <SharedBadge variant={"yellow"}>{formatToDateTime(row.original.firstIn)}</SharedBadge>
        </div>
      ),
    },
    {
      header: "First Out",
      cell: ({ row }) => (
        <div>
          <SharedBadge variant={"yellow"}>{formatToDateTime(row.original.firstOut)}</SharedBadge>
        </div>
      ),
    },
    {
      header: "Second In",
      cell: ({ row }) => (
        <div>
          <SharedBadge variant={"green"}>{formatToDateTime(row.original.secondIn)}</SharedBadge>
        </div>
      ),
    },
    {
      header: "Second Out",
      cell: ({ row }) => (
        <div>
          <SharedBadge variant={"green"}>{formatToDateTime(row.original.secondOut)}</SharedBadge>
        </div>
      ),
    },
    {
      header: "Working Hours",
      cell: ({ row }) => (
        <div>
          <p>{row.original.workingHours}</p>
        </div>
      ),
    },
    {
      header: "OT1",
      cell: ({ row }) => (
        <div>
          <p>{row.original.overtime1}</p>
        </div>
      ),
    },
    {
      header: "OT2",
      cell: ({ row }) => (
        <div>
          <p>{row.original.overtime2}</p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Created At",
      cell: ({ row }) => <div>{formatToDate(row.original.createdAt)}</div>,
    },
    {
      header: "Updated At",
      cell: ({ row }) => <div>{formatToDate(row.original.updatedAt)}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
