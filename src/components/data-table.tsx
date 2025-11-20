"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

// (Optional) dnd for row reordering
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataTableToolbar } from "./data-table-toolbar";

type WithId = { id?: string | number };

/**
 * Creates a reusable row number column definition that continues counting across pages
 * @example
 * const cols: ColumnDef<MyType>[] = [
 *   createRowNumberColumn(),
 *   { accessorKey: "name", header: "Name" },
 *   ...
 * ];
 */
export function createRowNumberColumn<TData = any>(): ColumnDef<TData> {
  return {
    id: "rowNumber",
    header: "NO",
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      const rowNumber = pageIndex * pageSize + row.index + 1;
      return <div className="font-medium">{rowNumber}</div>;
    },
    size: 50,
    enableSorting: false,
    enableHiding: false,
  };
}

export type DataTableProps<TData extends WithId> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];

  /** Optional – show selection checkboxes */
  enableRowSelection?: boolean;
  enableColumnMenu?: boolean;
  createLabel?: string;
  onCreateClick?: () => void;
  extractAction?: React.ReactNode;
  /** Optional – enable dnd row reordering */
  enableRowReordering?: boolean;
  /** Notify parent when rows are reordered (client-only) */
  onReorder?: (newData: TData[]) => void;

  /** Optional – controlled server mode flags */
  serverMode?: boolean;
  pageCount?: number; // required if serverMode = true
  onPaginationChange?: (updater: {
    pageIndex: number;
    pageSize: number;
  }) => void;

  /** Optional search handler (for toolbar) */
  onSearchChange?: (value: string) => void;

  /** Optional default page size */
  initialPageSize?: number;

  /** Optional default page index (0-based) */
  initialPageIndex?: number;

  /** Optional unique row id accessor (defaults to "id") */
  getRowId?: (row: TData) => string;
};

function DraggableRow<TData extends WithId>({ row }: { row: any }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell: any) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable<TData extends WithId>({
  columns,
  data: initialData,
  enableRowSelection = false,
  enableRowReordering = false,
  enableColumnMenu = false,
  createLabel,
  onCreateClick,
  extractAction,
  onReorder,
  serverMode = false,
  pageCount,
  onPaginationChange,
  onSearchChange,
  initialPageSize = 10,
  initialPageIndex = 0,
  getRowId,
}: DataTableProps<TData>) {
  const [data, setData] = React.useState<TData[]>(initialData);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  // Sync internal state with incoming data changes
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Sync pagination state with initial values (important for server-side pagination)
  React.useEffect(() => {
    setPagination({
      pageIndex: initialPageIndex,
      pageSize: initialPageSize,
    });
  }, [initialPageIndex, initialPageSize]);

  // dnd sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // ids for dnd
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () =>
      serverMode
        ? []
        : data.map((d) => (getRowId ? getRowId(d) : String(d.id))),
    [data, serverMode, getRowId]
  );

  const table = useReactTable({
    data: serverMode ? initialData : data,
    columns: [
      // Selection column (optional)
      ...(enableRowSelection
        ? ([
            {
              id: "__select",
              header: ({ table }) => (
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={
                      table.getIsAllPageRowsSelected() ||
                      (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(v) =>
                      table.toggleAllPageRowsSelected(!!v)
                    }
                    aria-label="Select all"
                  />
                </div>
              ),
              cell: ({ row }: any) => (
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(v) => row.toggleSelected(!!v)}
                    aria-label="Select row"
                  />
                </div>
              ),
              size: 32,
              enableSorting: false,
              enableHiding: false,
            },
          ] as ColumnDef<TData>[])
        : []),
      ...columns,
    ],
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => (getRowId ? getRowId(row) : String((row as any).id)),
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      if (serverMode && onPaginationChange) {
        onPaginationChange(newPagination);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // server mode pagination
    manualPagination: serverMode,
    pageCount: serverMode ? pageCount : undefined,
  });

  function handleDragEnd(e: DragEndEvent) {
    if (!enableRowReordering || serverMode) return;

    const { active, over } = e;
    if (!active || !over || active.id === over.id) return;

    setData((prev) => {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;

      const next = prev.slice();
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      onReorder?.(next);
      return next;
    });
  }

  const tableElement = (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="relative"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
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
  );

  const dndTableElement =
    enableRowReordering && !serverMode ? (
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => <DraggableRow key={row.id} row={row} />)
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
        </SortableContext>
      </DndContext>
    ) : (
      tableElement
    );

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar
        table={table}
        onSearchChange={onSearchChange}
        selectionCount={table.getFilteredSelectedRowModel().rows.length}
        enableColumnMenu={enableColumnMenu}
        createLabel={createLabel}
        extraAction={extractAction}
        onCreateClick={onCreateClick}
      />

      <div className="overflow-hidden rounded-lg border">{dndTableElement}</div>

      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm font-medium">Rows per page</span>
            <select
              className="h-8 w-20 rounded-md border bg-background px-2 text-sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(parseInt(e.target.value, 10))}
            >
              {[10, 20, 30, 40, 50].map((ps) => (
                <option key={ps} value={ps}>
                  {ps}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>

            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>

            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>

            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
