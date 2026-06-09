"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IEmployee } from "@/types/admin/employee";
import { Actions, IActions } from "@/components/shared/Actions";
import { EmployeeColumn } from "@/components/shared/EmployeeColumn";
import { formatToDate } from "@/utils/custom-format";
import { ClipboardClock, MapIcon, MapPinIcon, NotepadText, PhoneIcon } from "lucide-react";

export const employeeColumns = (actions: IActions[]): ColumnDef<IEmployee>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
    },
    {
      header: "Employee",
      cell: ({ row }) => <EmployeeColumn employee={row.original} />,
    },
    {
      header: "Position",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <NotepadText className="h-3 w-3" /> <span>{row.original.position ?? "N/A"}</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <span>
              {row.original.section?.department?.name} {row.original.section?.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Contact Info",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <PhoneIcon className="h-3 w-3" />
            <span>{row.original.phone ?? "-"}</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPinIcon className="h-3 w-3" />
            <span>{row.original.currentAddress || "N/A"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Joined Date",
      cell: ({ row }) => formatToDate(row.original.startDate),
    },
    {
      header: "Status",
      cell: ({ row }) => <div>{row.original.workStatus}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
