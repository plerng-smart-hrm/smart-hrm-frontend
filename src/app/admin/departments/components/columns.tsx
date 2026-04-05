"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IDepartment } from "@/types/admin";
import { Actions, IActions } from "@/components/shared/Actions";

export const departmentColumns = (
  actions: IActions[],
): ColumnDef<IDepartment>[] => {
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
