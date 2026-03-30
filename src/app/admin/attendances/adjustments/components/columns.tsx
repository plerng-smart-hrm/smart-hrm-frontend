"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { IAttAdjustment } from "@/types/admin/att-adjustment";

export const attAdjustmentColumns = (actions: IActions[]): ColumnDef<IAttAdjustment>[] => {
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
      header: "Date",
      cell: ({ row }) => <div>{row.original.date}</div>,
    },
    {
      header: "Field Change",
      cell: ({ row }) => <div>{row.original.fieldChanged}</div>,
    },
    {
      header: "Old Value",
      cell: ({ row }) => <div>{row.original.oldValue}</div>,
    },
    {
      header: "New Value",
      cell: ({ row }) => <div>{row.original.newValue}</div>,
    },
    {
      header: "Reason",
      cell: ({ row }) => <div>{row.original.reason}</div>,
    },
    {
      header: "Approval Status",
      cell: ({ row }) => <div>{row.original.approvalStatus}</div>,
    },
    {
      header: "Is Applied",
      cell: ({ row }) => <div>{row.original.isApplied}</div>,
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
