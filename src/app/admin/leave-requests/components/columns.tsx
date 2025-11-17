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
import { ILeaveRequest } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";

export const leaveRequestColumns = (opts?: {
  onEdit?: (row: ILeaveRequest) => void;
  onDelete?: (row: ILeaveRequest) => void;
}): ColumnDef<ILeaveRequest>[] => {
  const { onDelete, onEdit } = opts ?? {};

  const cols: ColumnDef<ILeaveRequest>[] = [
    createRowNumberColumn<ILeaveRequest>(),
    {
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">
            {row.original.employee?.lastName} {row.original.employee?.firstName}
          </p>
          <span className="text-muted-foreground text-sm">
            {row.original.employee?.position}
          </span>
        </div>
      ),
    },
    {
      header: "Leave Type",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">{row.original.leaveType?.name}</p>
          <span className="text-muted-foreground text-sm">
            {row.original.leaveType?.nameKh}
          </span>
        </div>
      ),
    },
    {
      header: "Reason",
      cell: ({ row }) => <div>{row.original.reason}</div>,
    },
    {
      header: "Start Date",
      cell: ({ row }) =>
        new Date(row.original.startDate ?? "").toLocaleDateString(),
    },
    {
      header: "End Date",
      cell: ({ row }) =>
        new Date(row.original.endDate ?? "").toLocaleDateString(),
    },
    {
      header: "Status",
      cell: ({ row }) => <div>{row.original.status}</div>,
    },
    {
      header: "Request At",
      cell: ({ row }) =>
        new Date(row.original.requestDate ?? "").toLocaleDateString(),
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
