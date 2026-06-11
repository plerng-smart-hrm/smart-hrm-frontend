"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions, IActions } from "@/components/shared/Actions";
import { IPayrollReport } from "@/types/admin/payroll-report";

export const payrollReportColumns = (actions: IActions[]): ColumnDef<IPayrollReport>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => (
        <div className="cursor-pointer text-primary hover:underline hover:text-primary/80 font-medium">
          {row.original.id}
        </div>
      ),
    },
    {
      header: "Payroll Month",
      cell: ({ row }) => <div>{row.original.payrollMonth}</div>,
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
      header: "Total Employees",
      cell: ({ row }) => <div>{row.original.totalEmployees}</div>,
    },
    {
      header: "Total Advance Salary",
      cell: ({ row }) => <div>{row.original.totalSalaryAdvance}</div>,
    },
    {
      header: "Total Balance Salary",
      cell: ({ row }) => <div>{row.original.totalSalaryBalance}</div>,
    },
    {
      header: "Total NetSalary",
      cell: ({ row }) => <div>{row.original.totalNetSalary}</div>,
    },
    {
      header: "Total Paid",
      cell: ({ row }) => <div>{row.original.totalPaid}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
