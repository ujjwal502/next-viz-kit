"use client";

import React from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import styles from "../Table.module.css";

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  enableSorting: boolean;
  enableFiltering: boolean;
}

export function TableHeader<T>({
  headerGroups,
  enableSorting,
  enableFiltering,
}: TableHeaderProps<T>): React.ReactElement {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={styles.th}
              style={{ width: header.getSize() }}
            >
              {header.isPlaceholder ? null : (
                <div>
                  <div
                    className={`${styles.headerCell} ${
                      enableSorting && header.column.getCanSort()
                        ? styles.sortable
                        : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {enableSorting && header.column.getCanSort() && (
                      <span className={styles.sortIcon}>
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? " ⏺️"}
                      </span>
                    )}
                  </div>
                  {enableFiltering && header.column.getCanFilter() && (
                    <div className={styles.filterContainer}>
                      <input
                        type="text"
                        value={(header.column.getFilterValue() as string) ?? ""}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        placeholder={`Filter ${header.column.id}...`}
                        className={styles.filterInput}
                      />
                    </div>
                  )}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
