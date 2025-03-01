"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import styles from "../Table.module.css";

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>({
  table,
}: TablePaginationProps<T>): React.ReactElement {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        className={styles.paginationButton}
      >
        {"<<"}
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className={styles.paginationButton}
      >
        {"<"}
      </button>
      <span className={styles.pageInfo}>
        Page{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </strong>
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className={styles.paginationButton}
      >
        {">"}
      </button>
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        className={styles.paginationButton}
      >
        {">>"}
      </button>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className={styles.pageSizeSelect}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
