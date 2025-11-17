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
import { ISection } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";

export const sectionColumns = (opts?: {
  onEdit?: (row: ISection) => void;
  onDelete?: (row: ISection) => void;
}): ColumnDef<ISection>[] => {
  const { onDelete, onEdit } = opts ?? {};

  const cols: ColumnDef<ISection>[] = [
    createRowNumberColumn<ISection>(),
    {
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">{row.original.name}</p>
          <span className="text-muted-foreground text-sm">
            {row.original.description}
          </span>
        </div>
      ),
    },
    {
      header: "Department",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
          {row.original.department?.name}
        </span>
      ),
    },
    {
      header: "Total Employees",
      cell: () => (
        <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
          0
        </span>
      ),
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
