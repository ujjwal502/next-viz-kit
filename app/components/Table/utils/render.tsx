import React from "react";
import { Header, flexRender } from "@tanstack/react-table";
import styles from "../Table.module.css";

/**
 * Renders a filter input for a column header
 */
export const renderFilterInput = <T,>(
  header: Header<T, unknown>,
  enableFiltering: boolean
): React.ReactNode => {
  if (!enableFiltering || !header.column.getCanFilter()) return null;

  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        value={(header.column.getFilterValue() as string) ?? ""}
        onChange={(e) => header.column.setFilterValue(e.target.value)}
        placeholder={`Filter ${header.column.id}...`}
        className={styles.filterInput}
      />
    </div>
  );
};

/**
 * Renders a sort indicator for a column header
 */
export const renderSortIndicator = <T,>(
  header: Header<T, unknown>,
  enableSorting: boolean
): React.ReactNode => {
  if (!enableSorting || !header.column.getCanSort()) return null;

  return (
    <span className={styles.sortIcon}>
      {{
        asc: " 🔼",
        desc: " 🔽",
      }[header.column.getIsSorted() as string] ?? " ⏺️"}
    </span>
  );
};

/**
 * Renders a complete header cell with sorting and filtering
 */
export const renderHeaderCell = <T,>(
  header: Header<T, unknown>,
  enableSorting: boolean,
  enableFiltering: boolean
): React.ReactNode => {
  if (header.isPlaceholder) return null;

  return (
    <div className={styles.headerCell}>
      <div
        className={
          enableSorting && header.column.getCanSort() ? styles.sortable : ""
        }
        onClick={
          enableSorting && header.column.getCanSort()
            ? header.column.getToggleSortingHandler()
            : undefined
        }
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {renderSortIndicator(header, enableSorting)}
      </div>
      {renderFilterInput(header, enableFiltering)}
    </div>
  );
};
