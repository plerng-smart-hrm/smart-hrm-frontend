"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { IPayroll } from "@/types/admin/payroll";
import { EmployeeColumn } from "@/components/shared/EmployeeColumn";

export const payrollColumns = (actions: IActions[]): ColumnDef<IPayroll>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Employee",

      cell: ({ row }) => <EmployeeColumn employee={row.original.employee} />,
    },
    {
      header: "Payroll Month",
      cell: ({ row }) => <div>{row.original?.payrollMonth}</div>,
    },
    {
      header: "Working Days",
      cell: ({ row }) => <div>{row.original?.workingDays}</div>,
    },
    {
      header: "Normal Days",
      cell: ({ row }) => <div>{row.original?.normalDays}</div>,
    },
    {
      header: "Base Salary",
      cell: ({ row }) => <div>{row.original?.baseSalary}</div>,
    },
    {
      header: "Net Salary",
      cell: ({ row }) => <div>{row.original?.netSalary}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
