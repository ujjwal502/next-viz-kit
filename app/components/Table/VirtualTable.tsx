"use client";

import React, { useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./Table.module.css";
import { TableHeader } from "./components";
import { VirtualTableProps } from "./types";
import { useTableState } from "./hooks";

/**
 * A high-performance virtualized table component for handling large datasets
 * efficiently by only rendering visible rows
 */
export function VirtualTable<T extends object>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enableColumnOrdering = true,
  height = 400,
  estimatedRowHeight = 40,
  className,
}: VirtualTableProps<T>) {
  // Use our custom hook to manage table state
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnOrder,
    setColumnOrder,
  } = useTableState<T>({
    columns,
    enablePagination: false,
  });

  // Reference to the table container for virtualization
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnOrder: enableColumnOrdering ? columnOrder : undefined,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: enableColumnOrdering ? setColumnOrder : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
  });

  const { rows } = table.getRowModel();

  // Set up virtualization
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 10,
  });

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualRows = rowVirtualizer.getVirtualItems();

  // Calculate padding to maintain proper scroll area size
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - virtualRows[virtualRows.length - 1].end
      : 0;

  return (
    <div className={`${styles.virtualTableContainer} ${className || ""}`}>
      {/* Fixed header */}
      <div>
        <table className={styles.virtualTable}>
          <TableHeader
            headerGroups={table.getHeaderGroups()}
            enableSorting={enableSorting}
            enableFiltering={enableFiltering}
            enableColumnOrdering={enableColumnOrdering}
          />
        </table>
      </div>

      {/* Virtualized scrollable body */}
      <div
        ref={tableContainerRef}
        className={styles.virtualScrollContainer}
        style={{ height }}
      >
        <table className={styles.virtualTable}>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr key={row.id} className={styles.tr}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>

        {/* No results message */}
        {rows.length === 0 && (
          <div className={styles.noResults}>No results found</div>
        )}
      </div>
    </div>
  );
}
