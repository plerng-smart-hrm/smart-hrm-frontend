"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ISection } from "@/types/admin";
import { Actions, IActions } from "@/components/shared/Actions";

export const sectionColumns = (actions: IActions[]): ColumnDef<ISection>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-base">{row.original.name}</p>
          <span className="text-muted-foreground text-sm">{row.original.description}</span>
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
      cell: ({ row }) => new Date(row.original.createdAt ?? "").toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
