"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Actions, IActions } from "@/components/shared/Actions";
import { IFingerPrint } from "@/types/admin/finger-print";

export const fingerPrintColumns = (actions: IActions[]): ColumnDef<IFingerPrint>[] => [
  {
    header: "#",
    size: 50,
    cell: ({ row }) => <div className="text-muted-foreground">{row.index + 1}</div>,
  },
  {
    header: "Device",
    cell: ({ row }) => <div className="font-medium">{row.original.device?.name ?? "—"}</div>,
  },
  {
    header: "Location",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.device?.location ?? "—"}</div>,
  },
  {
    header: "Role",
    size: 80,
    cell: ({ row }) => <div>{row.original.role ?? "—"}</div>,
  },
  {
    header: "Status",
    size: 100,
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-transparent">
          Active
        </Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => <Actions row={row.original} actions={actions} />,
  },
];
