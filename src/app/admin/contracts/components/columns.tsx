"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { IContract } from "@/types/admin/contract";

export const contractColumns = (actions: IActions[]): ColumnDef<IContract>[] => {
  const viewAction = actions.find((action) => action.name === "View")?.event;

  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => (
        <div 
          className="cursor-pointer text-primary hover:underline hover:text-primary/80 font-medium" 
          onClick={() => viewAction?.(row.original)}
        >
          {row.original.id}
        </div>
      ),
    },

    {
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-md">
            {row.original.employee?.lastName} {row.original.employee?.firstName}
          </p>
          <span className="text-muted-foreground text-sm">{row.original.employee?.position}</span>
        </div>
      ),
    },
    {
      header: "Contract Type",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
          {row.original.contractType}
        </span>
      ),
    },
    {
      header: "Start Date",
      cell: ({ row }) => <div>{row.original.startDate}</div>,
    },
    {
      header: "End Date",
      cell: ({ row }) => <div>{row.original.endDate}</div>,
    },
    {
      header: "Salary",
      cell: ({ row }) => <div>{row.original.baseSalary}</div>,
    },
    {
      header: "Created",
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
