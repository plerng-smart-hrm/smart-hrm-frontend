import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export interface ICustomPagination {
  perPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<string>>;
  total: number;
  isLoading?: boolean;
}
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  customPage?: ICustomPagination;
}

export function CustomDataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  customPage,
}: DataTablePaginationProps<TData>) {
  const perPage = customPage?.perPage ?? 10;
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const totalPages = customPage?.total
    ? Math.ceil(customPage?.total / perPage)
    : 0;

  const handleChangePage = (lastPage?: number | undefined) => {
    if (lastPage) {
      customPage?.setPage(lastPage);
    } else {
      setCurrentPage(pre => {
        const page = pre + 1;
        return page;
      });
      customPage?.setPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(pre => {
        const page = pre - 1;
        return page;
      });
      customPage?.setPage(currentPage - 1);
    }
  };

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-2 sm:flex-row sm:gap-8 lg:gap-10 justify-between w-full">
        <div className="flex">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">
              Rows per page
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={value => {
                table.setPageSize(Number(value));
                customPage?.setPageSize?.(value);
              }}
            >
              <SelectTrigger className="h-8 w-[4.5rem]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex-1" />
        {/* This adds flexible space between elements */}
        <div>
          <div className="flex gap-2">
            <div className="flex items-center justify-center text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                aria-label="Go to first page"
                variant="outline"
                className="hidden size-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to previous page"
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => handlePrevious()}
                disabled={currentPage === 1 || customPage?.isLoading}
              >
                <ChevronLeftIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to next page"
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => {
                  handleChangePage();
                }}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => handleChangePage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
