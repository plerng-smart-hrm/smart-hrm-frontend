"use client";

import { Actions, IActions } from "@/components/shared/Actions";
import { IContract } from "@/types/admin/contract";
import { ColumnDef } from "@tanstack/react-table";

export const contractColumns = (actions: IActions[]): ColumnDef<IContract>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Contract Type",
      cell: ({ row }) => <div>{row.original?.contractType}</div>,
    },
    {
      header: "Start Date",
      cell: ({ row }) => <div>{row.original?.startDate}</div>,
    },
    {
      header: "End Date",
      cell: ({ row }) => <div>{row.original?.endDate}</div>,
    },
    {
      header: "Basic Salary",
      cell: ({ row }) => <div>{row.original?.baseSalary}</div>,
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
