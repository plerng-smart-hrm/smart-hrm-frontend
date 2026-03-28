"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IWorkingShift } from "@/types/admin/working-shift";
import { Actions, IActions } from "@/components/shared/Actions";

export const workingShiftColumns = (
  actions: IActions[],
): ColumnDef<IWorkingShift>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      header: "Breaking Minutes",
      cell: ({ row }) => <div>{row.original.breakMinutes}</div>,
    },
    {
      header: "Late Allow Minutes",
      cell: ({ row }) => <div>{row.original.lateAllowMinutes}</div>,
    },
    {
      header: "Start Time",
      cell: ({ row }) => <div>{row.original.firstInTime?.slice(0, 5)}</div>,
    },
    {
      header: "End Time",
      cell: ({ row }) => <div>{row.original.firstOutTime?.slice(0, 5)}</div>,
    },
    {
      header: "Overtime Start",
      cell: ({ row }) => <div>{row.original.secondInTime?.slice(0, 5)}</div>,
    },
    {
      header: "Overtime End",
      cell: ({ row }) => <div>{row.original.secondOutTime?.slice(0, 5)}</div>,
    },
    {
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.original.createdAt ?? "").toLocaleDateString(),
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
