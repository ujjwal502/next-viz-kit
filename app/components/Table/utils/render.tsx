import React from "react";
import { Header, flexRender } from "@tanstack/react-table";

export const renderFilterInput = <T,>(
  header: Header<T, unknown>,
  styles: Record<string, string>,
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

export const renderSortIndicator = <T,>(
  header: Header<T, unknown>,
  styles: Record<string, string>,
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

export const renderHeaderCell = <T,>(
  header: Header<T, unknown>,
  styles: Record<string, string>,
  enableSorting: boolean,
  enableFiltering: boolean,
  enableColumnOrdering: boolean
): React.ReactNode => {
  if (header.isPlaceholder) return null;

  return (
    <div>
      <div
        className={`${styles.headerCell} ${
          enableSorting && header.column.getCanSort() ? styles.sortable : ""
        } ${enableColumnOrdering ? styles.draggable : ""}`}
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {renderSortIndicator(header, styles, enableSorting)}
      </div>
      {renderFilterInput(header, styles, enableFiltering)}
    </div>
  );
};
