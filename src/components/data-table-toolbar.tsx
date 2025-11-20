"use client";

import * as React from "react";
import { Table as TanTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  IconLayoutColumns,
  IconChevronDown,
  IconPlus,
} from "@tabler/icons-react";

type Props = {
  table: TanTable<any>;
  onSearchChange?: (value: string) => void;
  selectionCount: number;
  enableColumnMenu?: boolean;
  onCreateClick?: () => void;
  createLabel?: string;
  extraAction?: React.ReactNode;
};

export function DataTableToolbar({
  table,
  onSearchChange,
  selectionCount,
  enableColumnMenu = false,
  onCreateClick,
  createLabel = "Create",
  extraAction,
}: Props) {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearchChange?.(e.target.value);
            // If you want client-side filtering by a default column:
            // table.getColumn("name")?.setFilterValue(e.target.value);
          }}
          className="w-[220px]"
        />
        {selectionCount > 0 && (
          <div className="text-sm text-muted-foreground">
            {selectionCount} selected
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {extraAction}
        {onCreateClick && (
          <Button
            onClick={onCreateClick}
            variant="default"
            className="cursor-pointer"
          >
            <IconPlus className="h-4 w-4" />
            {createLabel}
          </Button>
        )}
      </div>
      {enableColumnMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden sm:inline">Customize Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (col) =>
                  typeof col.accessorFn !== "undefined" && col.getCanHide()
              )
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(v) => col.toggleVisibility(!!v)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
