"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import styles from "./Table.module.css";
import {
  TableHeader,
  TableBody,
  TablePagination,
  TableToolbar,
} from "./components";

export type TableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableColumnOrdering?: boolean;
  enableExport?: boolean;
  exportFormats?: Array<"csv" | "excel" | "pdf">;
  exportFilename?: string;
  pageSize?: number;
  className?: string;
};

export function Table<T extends object>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableColumnOrdering = true,
  enableExport = true,
  exportFormats,
  exportFilename,
  pageSize = 10,
  className,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns
      .map((column) => {
        if (typeof column.id === "string") return column.id;

        return String(column.id || "");
      })
      .filter(Boolean)
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: enablePagination ? pagination : undefined,
      columnOrder: enableColumnOrdering ? columnOrder : undefined,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnOrderChange: enableColumnOrdering ? setColumnOrder : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
  });

  return (
    <div className={`${styles.tableContainer} ${className || ""}`}>
      {enableExport && (
        <TableToolbar
          table={table}
          columns={columns}
          enableExport={enableExport}
          exportFormats={exportFormats}
          exportFilename={exportFilename}
        />
      )}

      <table className={styles.table}>
        <TableHeader
          headerGroups={table.getHeaderGroups()}
          enableSorting={enableSorting}
          enableFiltering={enableFiltering}
          enableColumnOrdering={enableColumnOrdering}
        />

        <TableBody
          rows={table.getRowModel().rows}
          columnsLength={columns.length}
        />
      </table>

      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}
