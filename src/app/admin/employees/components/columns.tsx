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
import { IEmployee } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";
import { formatDate } from "@/utils/format";

export const employeeColumns = (opts?: {
  onEdit?: (row: IEmployee) => void;
  onDelete?: (row: IEmployee) => void;
}): ColumnDef<IEmployee>[] => {
  const { onDelete, onEdit } = opts ?? {};

  const cols: ColumnDef<IEmployee>[] = [
    createRowNumberColumn<IEmployee>(),
    {
      header: "Code",
      cell: ({ row }) => <div>{row.original.empCode}</div>,
    },
    {
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">
            {row.original.lastName} {row.original.firstName}
          </p>
          <span className="text-muted-foreground text-sm">
            {row.original.lastNameKh} {row.original.firstNameKh}
          </span>
        </div>
      ),
    },
    {
      header: "gender",
      cell: ({ row }) => <div>{row.original.gender}</div>,
    },
    {
      header: "Position",
      cell: ({ row }) => <div>{row.original.position}</div>,
    },

    {
      header: "Start Date",
      cell: ({ row }) => formatDate(row.original.startDate ?? ""),
    },
    {
      header: "Work Status",
      cell: ({ row }) => <div>{row.original.workStatus}</div>,
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
