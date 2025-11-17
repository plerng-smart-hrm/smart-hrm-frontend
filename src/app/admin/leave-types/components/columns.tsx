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
import { ILeaveType } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";

export const leaveTypeColumns = (opts?: {
  onEdit?: (row: ILeaveType) => void;
  onDelete?: (row: ILeaveType) => void;
}): ColumnDef<ILeaveType>[] => {
  const { onDelete, onEdit } = opts ?? {};

  const cols: ColumnDef<ILeaveType>[] = [
    createRowNumberColumn<ILeaveType>(),
    {
      header: "Leave Type",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">{row.original.name}</p>
          <span className="text-muted-foreground text-sm">
            {row.original.nameKh}
          </span>
        </div>
      ),
    },
    {
      header: "Description",
      cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
      header: "Pay Rate",
      cell: ({ row }) => <div>{row.original.payRate}</div>,
    },
    {
      header: "Default Days",
      cell: ({ row }) => <div>{row.original.defaultDays}</div>,
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
            <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
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
