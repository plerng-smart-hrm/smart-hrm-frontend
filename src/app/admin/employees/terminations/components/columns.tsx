"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { ITermination } from "@/types/admin/termination";
import { formatToDate } from "@/utils/shared-format";

export const terminationColumns = (actions: IActions[]): ColumnDef<ITermination>[] => {
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
      header: "Code",
      cell: ({ row }) => <div>{row.original.employee?.empCode}</div>,
    },
    {
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-base">
            {row.original.employee?.lastName} {row.original.employee?.firstName}
          </p>
          <span className="text-muted-foreground text-sm">
            {row.original.employee?.lastNameKh} {row.original.employee?.firstNameKh}
          </span>
        </div>
      ),
    },
    {
      header: "Contract",
      cell: ({ row }) => <div>{row.original.contractType}</div>,
    },

    {
      header: "Termination Type",
      cell: ({ row }) => <div>{row.original.terminationType}</div>,
    },

    {
      header: "Basic Salary",
      cell: ({ row }) => <div>${row.original.basicSalary ? row.original.basicSalary : 0}</div>,
    },

    {
      header: "AL Days",
      cell: ({ row }) => <div>{row.original.remainingAnnualLeave}</div>,
    },

    {
      header: "Notice Days",
      cell: ({ row }) => <div>{row.original.noticeDays}</div>,
    },
    {
      header: "FDC 5%",
      cell: ({ row }) => <div>${row.original.fdcIndemnity5Per}</div>,
    },
    {
      header: "Final Total",
      cell: ({ row }) => <div className="font-semibold text-primary">${row.original.finalTotal}</div>,
    },
    {
      header: "Status",
      cell: ({ row }) => <div className="text-sm">{row.original.status}</div>,
    },
    {
      header: "Created At",
      cell: ({ row }) => <div>{formatToDate(row.original.createdAt)}</div>,
    },
    {
      header: "Updated At",
      cell: ({ row }) => <div>{formatToDate(row.original.updatedAt)}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
