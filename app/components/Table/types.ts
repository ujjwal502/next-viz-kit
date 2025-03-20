import {
  ColumnDef,
  HeaderGroup,
  Row,
  Table as ReactTable,
} from "@tanstack/react-table";

/**
 * Props for the standard Table component
 */
export interface TableProps<T extends object> {
  /** Data array to display in the table */
  data: T[];
  /** Column definitions for the table */
  columns: ColumnDef<T, unknown>[];
  /** Enable sorting functionality */
  enableSorting?: boolean;
  /** Enable filtering functionality */
  enableFiltering?: boolean;
  /** Enable pagination */
  enablePagination?: boolean;
  /** Enable column reordering */
  enableColumnOrdering?: boolean;
  /** Enable export functionality */
  enableExport?: boolean;
  /** Enable inline cell editing */
  enableEditing?: boolean;
  /** Callback for cell value changes when editing */
  onCellValueChange?: (
    rowIndex: number,
    columnId: string,
    value: unknown
  ) => void;
  /** Available export formats */
  exportFormats?: Array<"csv" | "excel" | "pdf">;
  /** Base filename for exports (without extension) */
  exportFilename?: string;
  /** Number of rows per page */
  pageSize?: number;
  /** Additional CSS class for the table container */
  className?: string;
}

/**
 * Props for the VirtualTable component
 */
export interface VirtualTableProps<T extends object> {
  /** Data array to display in the table */
  data: T[];
  /** Column definitions for the table */
  columns: ColumnDef<T, unknown>[];
  /** Enable sorting functionality */
  enableSorting?: boolean;
  /** Enable filtering functionality */
  enableFiltering?: boolean;
  /** Enable column reordering */
  enableColumnOrdering?: boolean;
  /** Height of the table container */
  height?: number;
  /** Estimated height of each row */
  estimatedRowHeight?: number;
  /** Additional CSS class for the table container */
  className?: string;
}

/**
 * Interface for the editable cell state
 */
export interface EditingCell {
  rowIndex: number;
  columnId: string;
}

/**
 * Props for the TableHeader component
 */
export interface TableHeaderProps<T extends object> {
  headerGroups: HeaderGroup<T>[];
  enableSorting: boolean;
  enableFiltering: boolean;
  enableColumnOrdering: boolean;
}

/**
 * Props for the TableBody component
 */
export interface TableBodyProps<T extends object> {
  rows: Row<T>[];
  columnsLength: number;
  enableEditing?: boolean;
  editingCell: EditingCell | null;
  setEditingCell: (cell: EditingCell | null) => void;
  onCellValueChange?: (
    rowIndex: number,
    columnId: string,
    value: unknown
  ) => void;
}

/**
 * Props for the TablePagination component
 */
export interface TablePaginationProps<T extends object> {
  table: ReactTable<T>;
}

/**
 * Props for the TableToolbar component
 */
export interface TableToolbarProps<T extends object> {
  table: ReactTable<T>;
  columns: ColumnDef<T, unknown>[];
  enableExport: boolean;
  exportFormats?: Array<"csv" | "excel" | "pdf">;
  exportFilename?: string;
}
