import * as XLSX from "xlsx";
import { ColumnDef } from "@tanstack/react-table";

interface ParsedData {
  columns: ColumnDef<Record<string, unknown>, unknown>[];
  data: Record<string, unknown>[];
}

export const parseExcelFile = (file: File): Promise<ParsedData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error("Failed to read Excel file"));
          return;
        }

        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<
          string,
          unknown
        >[];

        if (jsonData.length === 0) {
          reject(new Error("No data found in Excel file"));
          return;
        }

        const columns: ColumnDef<Record<string, unknown>, unknown>[] =
          Object.keys(jsonData[0]).map((key) => ({
            accessorKey: key,
            header: key,
          }));

        resolve({
          columns,
          data: jsonData,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        reject(new Error(`Failed to parse Excel file: ${errorMessage}`));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file"));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const parseCSVFile = (file: File): Promise<ParsedData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        if (!csvText) {
          reject(new Error("Failed to read CSV file"));
          return;
        }

        const lines = csvText.split(/\r\n|\n/);
        if (lines.length === 0) {
          reject(new Error("No data found in CSV file"));
          return;
        }

        const possibleDelimiters = [",", ";", "\t", "|"];
        let delimiter = ",";

        for (const del of possibleDelimiters) {
          if (lines[0].includes(del)) {
            delimiter = del;
            break;
          }
        }

        const headers = lines[0]
          .split(delimiter)
          .map((h) => h.trim().replace(/^"|"$/g, ""));

        const jsonData: Record<string, unknown>[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(delimiter);
          const row: Record<string, unknown> = {};

          headers.forEach((header, index) => {
            if (index < values.length) {
              const value = values[index].trim().replace(/^"|"$/g, "");
              const numValue = Number(value);
              row[header] = isNaN(numValue) ? value : numValue;
            } else {
              row[header] = "";
            }
          });

          jsonData.push(row);
        }

        if (jsonData.length === 0) {
          reject(new Error("No data rows found in CSV file"));
          return;
        }

        const columns: ColumnDef<Record<string, unknown>, unknown>[] =
          headers.map((header) => ({
            accessorKey: header,
            header: header,
          }));

        resolve({
          columns,
          data: jsonData,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        reject(new Error(`Failed to parse CSV file: ${errorMessage}`));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file"));
    };

    reader.readAsText(file);
  });
};

export const parseFile = async (file: File): Promise<ParsedData> => {
  const fileType = file.name.split(".").pop()?.toLowerCase();

  switch (fileType) {
    case "xlsx":
    case "xls":
      return parseExcelFile(file);
    case "csv":
      return parseCSVFile(file);
    default:
      throw new Error(
        "Unsupported file type. Please upload Excel (.xlsx, .xls) or CSV (.csv) files."
      );
  }
};
