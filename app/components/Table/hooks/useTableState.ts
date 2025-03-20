import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { EditingCell } from "../types";

// Define a column interface that might have an accessorKey
interface ExtendedColumnDef {
  id?: string;
  accessorKey?: string;
}

interface UseTableStateOptions<T extends object> {
  columns: ColumnDef<T, unknown>[];
  enablePagination?: boolean;
  pageSize?: number;
}

/**
 * A custom hook to manage table state
 * This centralizes state management for both standard and virtual tables
 */
export function useTableState<T extends object>({
  columns,
  enablePagination = true,
  pageSize = 10,
}: UseTableStateOptions<T>) {
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  // Filtering state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // Column order state
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns
      .map((column) => {
        if (typeof column.id === "string") return column.id;

        // Handle id extraction from column definition
        // This works for both stringified and accessor-based columns
        const id = String(column.id || "");

        // If id is empty, try to extract id from the column definition object
        if (!id && column) {
          // Cast to interface with accessorKey
          const extendedColumn = column as unknown as ExtendedColumnDef;
          if (extendedColumn.accessorKey) {
            return String(extendedColumn.accessorKey);
          }
        }

        return id;
      })
      .filter(Boolean)
  );

  // Editing cell state
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);

  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination: enablePagination ? pagination : undefined,
    setPagination,
    columnOrder,
    setColumnOrder,
    editingCell,
    setEditingCell,
  };
}
