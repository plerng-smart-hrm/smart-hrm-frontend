"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ICompany } from "@/types/admin";
import { Actions, IActions } from "@/components/shared/Actions";

export const companyColumns = (actions: IActions[]): ColumnDef<ICompany>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Company",
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
      header: "Location",
      cell: ({ row }) => <div>{row.original.location}</div>,
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
