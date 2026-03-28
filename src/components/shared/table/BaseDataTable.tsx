import * as React from "react";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

import { getCommonPinningStyles } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoading from "./TableLoading";
import { usePaginationContext } from "@/components/contexts/TableContext";
import { DataTablePagination } from "./DataTablePagination";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;
  /**
   * The floating bar to render at the bottom of the table on row selection.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBar={<TasksTableFloatingBar table={table} />}
   */
  floatingBar?: React.ReactNode | null;
  isPage?: boolean;
  isCheckBox?: boolean;
  getRowEvent?: (value?: any) => void;
  removeHeight?: boolean;
}

const BaseDataTable = <TData,>({
  floatingBar = null,
  children,
  className,
  table,
  isPage = true,
  getRowEvent,
  isCheckBox = false,
  removeHeight = false,
  ...props
}: DataTableProps<TData>) => {
  const { isLoading } = usePaginationContext();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = React.useState({
    left: false,
    right: false,
  });

  if (isLoading) {
    return <TableLoading />;
  }

  const onScrollX = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    setScrolled({
      left: el.scrollLeft > 0,
      right: el.scrollLeft < max,
    });
  };

  return (
    <div
      className={cn("w-full space-y-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div
        className={cn(
          "rounded-md border overflow-y-auto",
          removeHeight
            ? ""
            : "max-h-[calc(100vh-345px)] sm:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-250px)]",
        )}
        ref={scrollRef}
        onScroll={onScrollX}
      >
        <Table>
          <TableHeader className="bg-[#006EB4]">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {isCheckBox ? (
                  <TableHead className="w-[40px] text-center">
                    <Checkbox
                      className="border border-white rounded-sm"
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                      }
                      onCheckedChange={(value) => {
                        table.toggleAllPageRowsSelected(!!value);
                        setTimeout(() => {
                          const selectedRows = table
                            .getSelectedRowModel()
                            .rows.map((r) => r.original);
                          getRowEvent?.(selectedRows);
                        }, 0);
                      }}
                      aria-label="Select all"
                    />
                  </TableHead>
                ) : null}
                {headerGroup.headers.map((header) => {
                  const pinned = header.column.getIsPinned(); // 'left' | 'right' | false
                  const isAction = header?.id === "actions" ? true : false;

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        `capitalize text-white ${isAction ? "text-center" : ((header.column.columnDef.meta as any)?.className ?? "")}`,
                        // Make pinned cells opaque so scrolled cells don't bleed through
                        pinned && "z-10 bg-background dark:bg-background ",
                        // Optional slight blur for a glassy effect (safe to remove)
                        pinned &&
                          "supports-[backdrop-filter]:backdrop-blur-sm supports-[backdrop-filter]:bg-background/90",
                        // Edge gradients appear only when there’s content underneath
                        pinned === "left" &&
                          scrolled.left &&
                          "after:absolute after:top-0 after:right-[-1px] after:h-full after:w-3 after:pointer-events-none after:bg-gradient-to-r after:from-black/10 after:to-transparent",
                        pinned === "right" &&
                          scrolled.right &&
                          "before:absolute before:top-0 before:left-[-1px] before:h-full before:w-3 before:pointer-events-none before:bg-gradient-to-l before:from-black/10 before:to-transparent",

                        // (Optional) subtle inner shadow to hint pinning
                        pinned === "left" &&
                          "shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.08)]",
                        pinned === "right" &&
                          "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.08)]",
                      )}
                      style={{
                        ...getCommonPinningStyles({
                          column: header.column,
                        }),
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* Checkbox cell */}
                  {isCheckBox ? (
                    <TableCell className="w-[40px] text-center">
                      <Checkbox
                        className="rounded-sm"
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                          row.toggleSelected(!!value);
                          setTimeout(() => {
                            const selectedRows = table
                              .getSelectedRowModel()
                              .rows.map((r) => r.original);
                            getRowEvent?.(selectedRows);
                          }, 0);
                        }}
                        aria-label="Select row"
                      />
                    </TableCell>
                  ) : null}

                  {row.getVisibleCells().map((cell) => {
                    const pinned = cell.column.getIsPinned(); // 'left' | 'right' | false
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          // Make pinned cells opaque so scrolled cells don't bleed through
                          pinned && "z-10 bg-background dark:bg-background",
                          // Optional slight blur for a glassy effect (safe to remove)
                          pinned &&
                            "supports-[backdrop-filter]:backdrop-blur-sm supports-[backdrop-filter]:bg-background/90",

                          // Edge gradients appear only when there’s content underneath
                          pinned === "left" &&
                            scrolled.left &&
                            "after:absolute after:top-0 after:right-[-1px] after:h-full after:w-3 after:pointer-events-none after:bg-gradient-to-r after:from-black/10 after:to-transparent",
                          pinned === "right" &&
                            scrolled.right &&
                            "before:absolute before:top-0 before:left-[-1px] before:h-full before:w-3 before:pointer-events-none before:bg-gradient-to-l before:from-black/10 before:to-transparent",

                          // (Optional) subtle inner shadow to hint pinning
                          pinned === "left" &&
                            "shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.08)]",
                          pinned === "right" &&
                            "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.08)]",
                        )}
                        style={{
                          ...getCommonPinningStyles({
                            column: cell.column,
                          }),
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isPage ? (
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
          {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
        </div>
      ) : null}
    </div>
  );
};

export default BaseDataTable;
