"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { IHoliday } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";

export const holidayColumns = (opts?: {
  onEdit?: (row: IHoliday) => void;
  onDelete?: (row: IHoliday) => void;
}): ColumnDef<IHoliday>[] => {
  const { onDelete, onEdit } = opts ?? {};

  const cols: ColumnDef<IHoliday>[] = [
    createRowNumberColumn<IHoliday>(),
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
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEdit?.(row.original)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete?.(row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return cols;
};
