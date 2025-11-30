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
import { IAttendanceLog } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";
import { formatScanTime } from "@/utils/time";

export const attendanceLogColumns = (opts?: {
  onEdit?: (row: IAttendanceLog) => void;
  onDelete?: (row: IAttendanceLog) => void;
}): ColumnDef<IAttendanceLog>[] => {
  const { onDelete } = opts ?? {};

  const cols: ColumnDef<IAttendanceLog>[] = [
    createRowNumberColumn<IAttendanceLog>(),
    {
      header: "Code",
      cell: ({ row }) => <div>{row.original.employee?.empCode}</div>,
    },
    {
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">
            {row.original.employee?.lastName} {row.original.employee?.firstName}
          </p>
          <span className="text-muted-foreground text-sm">
            {row.original.employee?.lastNameKh}{" "}
            {row.original.employee?.firstNameKh}
          </span>
        </div>
      ),
    },
    {
      header: "Position",
      cell: ({ row }) => <div>{row.original.employee?.position}</div>,
    },
    {
      header: "ScanTime",
      cell: ({ row }) => <div>{formatScanTime(row.original.scanTime)}</div>,
    },
    {
      header: "Action",
      cell: ({ row }) => <div>{row.original.actionType}</div>,
    },
    {
      header: "Device",
      cell: ({ row }) => <div>{row.original.device?.name}</div>,
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
