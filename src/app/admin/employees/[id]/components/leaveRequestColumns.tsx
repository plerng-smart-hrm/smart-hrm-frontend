"use client";

import { Actions, IActions } from "@/components/shared/Actions";
import { ILeaveRequest } from "@/types/admin/leave-request";
import { formatToDate } from "@/utils/custom-format";
import { ColumnDef } from "@tanstack/react-table";

export const leaveRequestColumns = (actions: IActions[]): ColumnDef<ILeaveRequest>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      header: "Leave Type",
      cell: ({ row }) => <div>{row.original?.leaveType}</div>,
    },
    {
      header: "Duration",
      cell: ({ row }) => {
        const { startDate, endDate, totalDays } = row.original;

        return (
          <div className="flex flex-col">
            <span>
              {formatToDate(startDate)} - {formatToDate(endDate)}
            </span>

            <span className="text-muted-foreground text-xs">{totalDays} day</span>
          </div>
        );
      },
    },
    {
      header: "Request Date",
      cell: ({ row }) => <div>{formatToDate(row.original?.requestDate)}</div>,
    },

    {
      header: "Status",
      cell: ({ row }) => <div>{row.original?.status}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
