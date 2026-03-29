"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IEmployee } from "@/types/admin/employee";
import { Actions, IActions } from "@/components/shared/Actions";

export const employeeColumns = (
  actions: IActions[],
): ColumnDef<IEmployee>[] => {
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
      cell: ({ row }) => <div>EMP-{row.original.empCode}</div>,
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
      header: "Joined Date",
      cell: ({ row }) =>
        new Date(row.original.startDate ?? "").toLocaleDateString(),
    },
    {
      header: "Status",
      cell: ({ row }) => <div>{row.original.workStatus}</div>,
    },
    {
      header: "Updated At",
      cell: ({ row }) =>
        new Date(row.original.updatedAt ?? "").toLocaleDateString(),
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
