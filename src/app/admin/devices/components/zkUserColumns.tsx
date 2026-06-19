"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IZkUser } from "@/types/admin/zk-user";
import { Actions, IActions } from "@/components/shared/Actions";

export const zkUserColumns = (actions: IActions[]): ColumnDef<IZkUser>[] => [
  {
    header: "UID",
    size: 70,
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.uid}</div>,
  },
  {
    header: "Emp Code",
    cell: ({ row }) => (
      <div className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded w-fit">{row.original.userId || "N/A"}</div>
    ),
  },
  {
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name || "N/A"}</div>,
  },
  {
    header: "Role",
    size: 80,
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    header: "Card No",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.cardno || "N/A"}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
  },
];
