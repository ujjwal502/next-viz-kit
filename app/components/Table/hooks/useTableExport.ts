import { useCallback } from "react";
import { Table as ReactTable, ColumnDef } from "@tanstack/react-table";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";

type ExportFormat = "csv" | "excel" | "pdf";

interface UseTableExportOptions<T extends object> {
  table: ReactTable<T>;
  columns: ColumnDef<T, unknown>[];
  filename?: string;
  formats?: ExportFormat[];
}

/**
 * A custom hook to handle table exports to different formats
 */
export function useTableExport<T extends object>({
  table,
  columns,
  filename = "table-data",
  formats = ["csv", "excel", "pdf"],
}: UseTableExportOptions<T>) {
  // Extract the data from the table in the format required by the export functions
  const getDataForExport = useCallback(() => {
    // Get all data rows from the table
    return table.getRowModel().rows.map((row) => row.original);
  }, [table]);

  // Export to CSV function
  const handleExportCSV = useCallback(() => {
    if (!formats.includes("csv")) return;

    // Call exportToCSV with the right parameters based on its signature
    const tableData = getDataForExport();
    exportToCSV(tableData, columns, filename);
  }, [getDataForExport, columns, filename, formats]);

  // Export to Excel function
  const handleExportExcel = useCallback(() => {
    if (!formats.includes("excel")) return;

    // Call exportToExcel with the right parameters based on its signature
    const tableData = getDataForExport();
    exportToExcel(tableData, columns, filename);
  }, [getDataForExport, columns, filename, formats]);

  // Export to PDF function
  const handleExportPDF = useCallback(() => {
    if (!formats.includes("pdf")) return;

    // Call exportToPDF with the right parameters based on its signature
    const tableData = getDataForExport();
    exportToPDF(tableData, columns, filename);
  }, [getDataForExport, columns, filename, formats]);

  return {
    exportToCSV: handleExportCSV,
    exportToExcel: handleExportExcel,
    exportToPDF: handleExportPDF,
    availableFormats: formats,
  };
}
