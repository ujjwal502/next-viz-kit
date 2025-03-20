import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { EditingCell } from "../types";

interface ExtendedColumnDef {
  id?: string;
  accessorKey?: string;
}

interface UseTableStateOptions<T extends object> {
  columns: ColumnDef<T, unknown>[];
  enablePagination?: boolean;
  pageSize?: number;
}

export function useTableState<T extends object>({
  columns,
  enablePagination = true,
  pageSize = 10,
}: UseTableStateOptions<T>) {
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

        const id = String(column.id || "");

        if (!id && column) {
          const extendedColumn = column as unknown as ExtendedColumnDef;
          if (extendedColumn.accessorKey) {
            return String(extendedColumn.accessorKey);
          }
        }

        return id;
      })
      .filter(Boolean)
  );

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
