import React from "react";
import type { Table as TableInstance, ColumnDef } from "@tanstack/react-table";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";
import styles from "../Table.module.css";

type ExportFormat = "csv" | "excel" | "pdf";

interface TableToolbarProps<T extends object> {
  table: TableInstance<T>;
  columns: ColumnDef<T, unknown>[];
  enableExport?: boolean;
  exportFormats?: ExportFormat[];
  exportFilename?: string;
  children?: React.ReactNode;
}

export function TableToolbar<T extends object>({
  table,
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M8 13h2"></path>
                <path d="M8 17h2"></path>
                <path d="M14 13h2"></path>
                <path d="M14 17h2"></path>
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
}
