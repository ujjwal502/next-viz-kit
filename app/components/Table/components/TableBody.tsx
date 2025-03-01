"use client";

import React from "react";
import { flexRender, Row } from "@tanstack/react-table";
import styles from "../Table.module.css";

interface TableBodyProps<T> {
  rows: Row<T>[];
  columnsLength: number;
  prepareRow?: (row: Row<T>) => void;
}

export function TableBody<T>({
  rows,
  columnsLength,
  prepareRow,
}: TableBodyProps<T>): React.ReactElement {
  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row) => {
          prepareRow?.(row);
          return (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={columnsLength}
            style={{ textAlign: "center", padding: "1rem" }}
          >
            No results found
          </td>
        </tr>
      )}
    </tbody>
  );
}
