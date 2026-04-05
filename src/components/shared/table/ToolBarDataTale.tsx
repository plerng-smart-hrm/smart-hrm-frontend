"use client";

import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISelectOption } from "@/types/OptionType";
import { usePaginationContext } from "@/components/contexts/TableContext";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<
  TData,
> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterValue?: ISelectOption[];
  back?: string;
  isSearch?: boolean;
  searchEvent?: (_value: string) => void;
  handleFilter?: (_value: string) => void;
  clearEvent?: () => void;
  isSearchVal?: boolean;
  isViewCol?: boolean;
  getFilter?: string;
}

export function ToolBarDataTale<TData>({
  table,
  children,
  className,
  back = "",
  isSearch = true,
  searchEvent,
  handleFilter,
  clearEvent,
  isSearchVal = true,
  filterValue = [],
  isViewCol = true,
  getFilter,
  ...props
}: DataTableToolbarProps<TData>) {
  const { handleSearch, handleRefresh, search, handleFilters } =
    usePaginationContext();

  const [inputValue, setInputValue] = React.useState(
    search && search !== "null" && isSearchVal ? search : "",
  );
  const searchParams = useSearchParams();
  const filter = String(searchParams.get("filter")) || "";

  const isReset = () => {
    if (inputValue || (filter && filter !== "null")) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
        className,
      )}
      {...props}
    >
      <div className="flex flex-2 items-center space-x-2">
        {back && (
          <div className="flex items-center justify-center">
            <Button
              variant="secondary"
              className="h-[36px]"
              onClick={() => {
                if (back) {
                  redirect(back);
                }
              }}
            >
              <ArrowLeftIcon size={18} />
            </Button>
          </div>
        )}
        {isSearch && (
          <Input
            placeholder={"Press enter key to search"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                const value = e?.target?.value;
                if (searchEvent) {
                  searchEvent?.(value);
                } else {
                  handleSearch(value);
                }
              }
            }}
            className="h-[36px] w-40 lg:w-64"
          />
        )}
        {filterValue?.length ? (
          <Select
            value={getFilter ?? filter ?? "__clear__"}
            onValueChange={(e) => {
              if (e === "__clear__") {
                handleFilter?.("");
                handleFilters?.("");
                return;
              }

              if (handleFilter) {
                handleFilter(e);
              } else {
                handleFilters(e);
              }
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder={`Select a filter`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"__clear__"} className="text-red-800">
                  Clear Filter
                </SelectItem>
              </SelectGroup>
              {filterValue.map((item, index) => {
                return (
                  <SelectGroup key={index}>
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        ) : null}
        {isReset() && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => {
              setInputValue("");
              if (clearEvent) {
                clearEvent();
              } else {
                setInputValue("");
                handleRefresh();
              }
            }}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      {isViewCol ? (
        <div className="flex items-center gap-2">
          {children}
          <DataTableViewOptions table={table} />
        </div>
      ) : null}
    </div>
  );
}
