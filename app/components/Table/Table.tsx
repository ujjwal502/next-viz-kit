"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import styles from "./Table.module.css";
import {
  TableHeader,
  TableBody,
  TablePagination,
  TableToolbar,
} from "./components";
import { TableProps } from "./types";
import { useTableState } from "./hooks";

/**
 * A feature-rich table component with sorting, filtering, pagination,
 * column ordering, data export, and cell editing capabilities
 */
export function Table<T extends object>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableColumnOrdering = true,
  enableExport = true,
  enableEditing = false,
  onCellValueChange,
  exportFormats,
  exportFilename,
  pageSize = 10,
  className,
}: TableProps<T>) {
  // Use our custom hook to manage table state
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    columnOrder,
    setColumnOrder,
    editingCell,
    setEditingCell,
  } = useTableState<T>({
    columns,
    enablePagination,
    pageSize,
  });

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
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

  // Handle cell value change
  const handleCellValueChange = (
    rowIndex: number,
    columnId: string,
    value: unknown
  ) => {
    if (onCellValueChange) {
      onCellValueChange(rowIndex, columnId, value);
    }
    setEditingCell(null);
  };

  return (
    <div className={`${styles.tableContainer} ${className || ""}`}>
      {/* Table toolbar with export options */}
      {enableExport && (
        <TableToolbar
          table={table}
          columns={columns}
          enableExport={enableExport}
          exportFormats={exportFormats}
          exportFilename={exportFilename}
        />
      )}

      {/* Main table */}
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
          enableEditing={enableEditing}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          onCellValueChange={handleCellValueChange}
        />
      </table>

      {/* Pagination controls */}
      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}
