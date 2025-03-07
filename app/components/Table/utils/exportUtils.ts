import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { saveAs } from "file-saver";
import { stringify } from "csv-stringify/sync";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type AccessorColumn = {
  accessorKey?: string;
  id?: string;
  header?: string | React.ReactElement;
};

export function getColumnHeaders<T extends object>(
  columns: ColumnDef<T, unknown>[]
): string[] {
  return columns.map((column) => {
    if (typeof column.header === "string") {
      return column.header;
    }

    const accessorColumn = column as unknown as AccessorColumn;
    if (accessorColumn.accessorKey) {
      return accessorColumn.accessorKey;
    }

    return String(column.id || "");
  });
}

export function convertDataForExport<T extends object>(
  data: T[],
  columns: ColumnDef<T, unknown>[]
): any[][] {
  const headers = getColumnHeaders(columns);

  const rows = data.map((row) => {
    return columns.map((column) => {
      const accessorColumn = column as unknown as AccessorColumn;
      const accessorKey = accessorColumn.accessorKey;

      if (accessorKey) {
        return (row as any)[accessorKey];
      }

      return "";
    });
  });

  return [headers, ...rows];
}

export function generateFilename(base: string, extension: string): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return `${base}_${timestamp}.${extension}`;
}

export function exportToCSV<T extends object>(
  data: T[],
  columns: ColumnDef<T, unknown>[],
  filename = "table-data"
): void {
  try {
    const exportData = convertDataForExport(data, columns);

    const csv = stringify(exportData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, generateFilename(filename, "csv"));
  } catch (error) {
    console.error("Error exporting to CSV:", error);
  }
}

export function exportToExcel<T extends object>(
  data: T[],
  columns: ColumnDef<T, unknown>[],
  filename = "table-data"
): void {
  try {
    const exportData = convertDataForExport(data, columns);

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(exportData);

    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, generateFilename(filename, "xlsx"));
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
}

export function exportToPDF<T extends object>(
  data: T[],
  columns: ColumnDef<T, unknown>[],
  filename = "table-data"
): void {
  try {
    const exportData = convertDataForExport(data, columns);
    const headers = exportData[0];
    const rows = exportData.slice(1);

    const doc = new jsPDF();

    doc.text("Table Export", 14, 15);

    const now = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated: ${now}`, 14, 22);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(generateFilename(filename, "pdf"));
  } catch (error) {
    console.error("Error exporting to PDF:", error);
  }
}
