"use client";

import React, { useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./Table.module.css";
import { TableHeader } from "./components";

export type VirtualTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  height?: number;
  estimatedRowHeight?: number;
  className?: string;
};

export function VirtualTable<T extends object>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  height = 400,
  estimatedRowHeight = 40,
  className,
}: VirtualTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 10,
  });

  // Get the total size of all rows
  const totalSize = rowVirtualizer.getTotalSize();

  // Get the virtualized rows
  const virtualRows = rowVirtualizer.getVirtualItems();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - virtualRows[virtualRows.length - 1].end
      : 0;

  return (
    <div className={`${styles.virtualTableContainer} ${className || ""}`}>
      <div>
        <table className={styles.virtualTable}>
          <TableHeader
            headerGroups={table.getHeaderGroups()}
            enableSorting={enableSorting}
            enableFiltering={enableFiltering}
          />
        </table>
      </div>

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

        {rows.length === 0 && (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
