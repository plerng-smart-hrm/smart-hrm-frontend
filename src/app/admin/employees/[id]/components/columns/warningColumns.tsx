"use client";

import { Actions, IActions } from "@/components/shared/Actions";
import { IWarning } from "@/types/admin/warning";
import { formatToDate } from "@/utils/custom-format";
import { ColumnDef } from "@tanstack/react-table";

export const warningColumns = (actions: IActions[]): ColumnDef<IWarning>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Type",
      cell: ({ row }) => <div>{row.original?.type}</div>,
    },
    {
      header: "Remark",
      cell: ({ row }) => <div>{row.original?.remark}</div>,
    },
    {
      header: "Warning Date",
      cell: ({ row }) => <div>{formatToDate(row.original?.warningDate)}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
