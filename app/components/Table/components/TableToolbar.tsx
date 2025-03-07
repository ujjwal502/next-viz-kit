import React from "react";
import type { Table as TableInstance, ColumnDef } from "@tanstack/react-table";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";
import styles from "../Table.module.css";

type ExportFormat = "csv" | "excel" | "pdf";

interface TableToolbarProps<T extends object> {
  table: TableInstance<T>;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  enableExport?: boolean;
  exportFormats?: ExportFormat[];
  exportFilename?: string;
  children?: React.ReactNode;
}

export function TableToolbar<T extends object>({
  table,
  data,
  columns,
  enableExport = true,
  exportFormats = ["csv", "excel", "pdf"],
  exportFilename = "table-data",
  children,
}: TableToolbarProps<T>) {
  const handleExport = (format: ExportFormat) => {
    // it gets the current view of data (respecting sorting, filtering)
    const tableData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);

    switch (format) {
      case "csv":
        exportToCSV(tableData, columns, exportFilename);
        break;
      case "excel":
        exportToExcel(tableData, columns, exportFilename);
        break;
      case "pdf":
        exportToPDF(tableData, columns, exportFilename);
        break;
    }
  };

  return (
    <div className={styles.tableToolbar}>
      <div className={styles.tableToolbarContent}>{children}</div>

      {enableExport && (
        <div className={styles.tableToolbarExport}>
          <span className={styles.exportLabel}>Export:</span>
          {exportFormats.includes("csv") && (
            <button
              className={styles.exportButton}
              onClick={() => handleExport("csv")}
              aria-label="Export to CSV"
              title="Export to CSV"
            >
              CSV
            </button>
          )}

          {exportFormats.includes("excel") && (
            <button
              className={styles.exportButton}
              onClick={() => handleExport("excel")}
              aria-label="Export to Excel"
              title="Export to Excel"
            >
              Excel
            </button>
          )}

          {exportFormats.includes("pdf") && (
            <button
              className={styles.exportButton}
              onClick={() => handleExport("pdf")}
              aria-label="Export to PDF"
              title="Export to PDF"
            >
              PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
}
