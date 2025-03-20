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

export function useTableExport<T extends object>({
  table,
  columns,
  filename = "table-data",
  formats = ["csv", "excel", "pdf"],
}: UseTableExportOptions<T>) {
  const getDataForExport = useCallback(() => {
    return table.getRowModel().rows.map((row) => row.original);
  }, [table]);

  const handleExportCSV = useCallback(() => {
    if (!formats.includes("csv")) return;

    const tableData = getDataForExport();
    exportToCSV(tableData, columns, filename);
  }, [getDataForExport, columns, filename, formats]);

  const handleExportExcel = useCallback(() => {
    if (!formats.includes("excel")) return;

    const tableData = getDataForExport();
    exportToExcel(tableData, columns, filename);
  }, [getDataForExport, columns, filename, formats]);

  const handleExportPDF = useCallback(() => {
    if (!formats.includes("pdf")) return;

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
