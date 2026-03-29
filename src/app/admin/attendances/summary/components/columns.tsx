"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { IAttendanceSummary } from "@/types/admin/attendance-summary";

export const attendanceSummaryColumns = (
  actions: IActions[],
): ColumnDef<IAttendanceSummary>[] => {
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
      header: "Date",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
          {row.original.date}
        </span>
      ),
    },
    {
      header: "First In",
      cell: ({ row }) => (
        <div>
          <p>{row.original.firstIn}</p>
        </div>
      ),
    },
    {
      header: "First Out",
      cell: ({ row }) => (
        <div>
          <p>{row.original.firstOut}</p>
        </div>
      ),
    },
    {
      header: "Second In",
      cell: ({ row }) => (
        <div>
          <p>{row.original.firstIn}</p>
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
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => (
        <Actions row={row?.original ?? undefined} actions={actions} />
      ),
    },
  ];
};
