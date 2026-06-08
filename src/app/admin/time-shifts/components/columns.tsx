"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ITimeShift } from "@/types/admin/time-shift";
import { Actions, IActions } from "@/components/shared/Actions";

export const timeShiftColumns = (actions: IActions[]): ColumnDef<ITimeShift>[] => {
  return [
    {
      header: "ID",
      size: 50,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },

    {
      header: "T1",
      cell: ({ row }) => <div>{row.original.fIn}</div>,
    },
    {
      header: "T2",
      cell: ({ row }) => <div>{row.original.fOut}</div>,
    },
    {
      header: "T3",
      cell: ({ row }) => <div>{row.original.sIn}</div>,
    },
    {
      header: "T4",
      cell: ({ row }) => <div>{row.original.sOut}</div>,
    },
    {
      header: "Breaking Minutes",
      cell: ({ row }) => <div>{row.original.breakMinutes}</div>,
    },
    {
      header: "GraceMins",
      cell: ({ row }) => <div>{row.original.graceMins}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 50,
      cell: ({ row }) => <Actions row={row?.original ?? undefined} actions={actions} />,
    },
  ];
};
