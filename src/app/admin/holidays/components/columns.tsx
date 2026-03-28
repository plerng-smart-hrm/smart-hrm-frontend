"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IHoliday } from "@/types/admin";
import { Actions, IActions } from "@/components/shared/Actions";

export const holidayColumns = (actions: IActions[]): ColumnDef<IHoliday>[] => {
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
      header: "Type",
      cell: ({ row }) => <div>{row.original.type}</div>,
    },
    {
      header: "StartDate",
      cell: ({ row }) => (
        <div>{new Date(row.original.startDate ?? "").toLocaleDateString()}</div>
      ),
    },
    {
      header: "EndDate",
      cell: ({ row }) => (
        <div>{new Date(row.original.endDate ?? "").toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
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
