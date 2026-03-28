"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { IDevice } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";
import { BadgeCheckIcon, XCircleIcon } from "lucide-react";
import { Actions, IActions } from "@/components/shared/Actions";

export const deviceColumns = (actions: IActions[]): ColumnDef<IDevice>[] => {
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
      header: "location",
      cell: ({ row }) => <div>{row.original.location}</div>,
    },
    {
      header: "IpAddress",
      cell: ({ row }) => <div>{row.original.ipAddress}</div>,
    },
    {
      header: "Port",
      cell: ({ row }) => <div>{row.original.port}</div>,
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isOffline = status === "OFFLINE";
        return (
          <Badge
            variant="secondary"
            className={
              isOffline
                ? "bg-red-500 text-white dark:bg-red-600"
                : "bg-blue-500 text-white dark:bg-blue-600"
            }
          >
            {isOffline ? (
              <XCircleIcon className="h-4 w-4" />
            ) : (
              <BadgeCheckIcon className="h-4 w-4" />
            )}
            {status}
          </Badge>
        );
      },
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
