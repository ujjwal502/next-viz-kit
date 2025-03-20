"use client";

import React, { useState, useRef } from "react";
import { Table } from "./Table";
import { VirtualTable } from "./VirtualTable";
import styles from "./Table.module.css";
import { parseFile } from "./utils/fileParser";
import { ColumnDef } from "@tanstack/react-table";

interface FileUploadTableProps {
  useVirtualization?: boolean;
  virtualTableHeight?: number;
}

export function FileUploadTable({
  useVirtualization = false,
  virtualTableHeight = 500,
}: FileUploadTableProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = useState<
    ColumnDef<Record<string, unknown>, unknown>[]
  >([]);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setFileName(file.name);
    setError(null);
    setIsLoading(true);

    try {
      const result = await parseFile(file);
      setColumns(result.columns);
      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setColumns([]);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.fileUploadTableContainer}>
      <div
        className={`${styles.uploadArea} ${
          isDragging ? styles.dragActive : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles.uploadContent}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.uploadIcon}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>

          <h3 className={styles.uploadTitle}>
            {isDragging ? "Drop file here" : "Upload Excel or CSV file"}
          </h3>

          <p className={styles.uploadInstructions}>
            Drag and drop your file here, or click to browse
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className={styles.hiddenFileInput}
          />

          <button
            className={styles.uploadButton}
            onClick={handleButtonClick}
            type="button"
          >
            Browse Files
          </button>

          <p className={styles.uploadHint}>
            Supported formats: Excel (.xlsx, .xls) and CSV (.csv)
          </p>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loadingIndicator}>
          <svg className={styles.loadingSpinner} viewBox="0 0 50 50">
            <circle
              className={styles.spinnerPath}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
          <p>Processing your file...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{error}</p>
        </div>
      )}

      {data.length > 0 && columns.length > 0 && (
        <div className={styles.tableContainer}>
          <div className={styles.tableInfo}>
            <h3 className={styles.dataFileName}>{fileName}</h3>
            <p className={styles.dataStats}>
              {data.length} rows × {columns.length} columns
            </p>
          </div>

          {useVirtualization ? (
            <VirtualTable
              data={data}
              columns={columns}
              enableSorting={true}
              enableFiltering={true}
              enableColumnOrdering={true}
              height={virtualTableHeight}
            />
          ) : (
            <Table
              data={data}
              columns={columns}
              enableSorting={true}
              enableFiltering={true}
              enablePagination={true}
              enableColumnOrdering={true}
              enableExport={true}
              exportFilename={fileName.split(".")[0] || "exported-data"}
            />
          )}
        </div>
      )}
    </div>
  );
}
