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
import { IWorkingShift } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";

export const workingShiftColumns = (opts?: {
  onEdit?: (row: IWorkingShift) => void;
  onDelete?: (row: IWorkingShift) => void;
}): ColumnDef<IWorkingShift>[] => {
  const { onDelete, onEdit } = opts ?? {};

  const cols: ColumnDef<IWorkingShift>[] = [
    createRowNumberColumn<IWorkingShift>(),
    {
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      header: "Breaking Minutes",
      cell: ({ row }) => <div>{row.original.breakMinutes}</div>,
    },
    {
      header: "Start Time",
      cell: ({ row }) => <div>{row.original.startTime?.slice(0, 5)}</div>,
    },
    {
      header: "End Time",
      cell: ({ row }) => <div>{row.original.endTime?.slice(0, 5)}</div>,
    },
    {
      header: "Overtime Start",
      cell: ({ row }) => <div>{row.original.overtimeStart?.slice(0, 5)}</div>,
    },
    {
      header: "Overtime End",
      cell: ({ row }) => <div>{row.original.overtimeEnd?.slice(0, 5)}</div>,
    },
    {
      header: "Created At",
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
