"use client";

import React, { useState } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import styles from "../Table.module.css";

interface TableBodyProps<T> {
  rows: Row<T>[];
  columnsLength: number;
  prepareRow?: (row: Row<T>) => void;
  enableEditing?: boolean;
  editingCell: { rowIndex: number; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowIndex: number; columnId: string } | null>
  >;
  onCellValueChange?: (
    rowIndex: number,
    columnId: string,
    value: unknown
  ) => void;
}

function EditableCell<T>({
  value: initialValue,
  isEditing,
  onEdit,
  onValueChange,
}: {
  value: unknown;
  row?: Row<T>;
  column?: { id: string };
  rowIndex?: number;
  isEditing: boolean;
  onEdit: () => void;
  onValueChange: (value: unknown) => void;
}) {
  const [value, setValue] = useState<unknown>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleBlur = () => {
    onValueChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onValueChange(value);
    } else if (e.key === "Escape") {
      setValue(initialValue);
      onValueChange(initialValue);
    }
  };

  if (isEditing) {
    return (
      <input
        className={styles.cellInput}
        value={value as string}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  }

  return (
    <div className={styles.cellValue} onClick={onEdit}>
      {value as string}
    </div>
  );
}

export function TableBody<T>({
  rows,
  columnsLength,
  prepareRow,
  enableEditing = false,
  editingCell,
  setEditingCell,
  onCellValueChange,
}: TableBodyProps<T>): React.ReactElement {
  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row, rowIndex) => {
          prepareRow?.(row);
          return (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => {
                const isEditing = !!(
                  enableEditing &&
                  editingCell &&
                  editingCell.rowIndex === rowIndex &&
                  editingCell.columnId === cell.column.id
                );

                const handleEdit = () => {
                  if (enableEditing) {
                    setEditingCell({
                      rowIndex,
                      columnId: cell.column.id,
                    });
                  }
                };

                const handleValueChange = (value: unknown) => {
                  if (onCellValueChange) {
                    onCellValueChange(rowIndex, cell.column.id, value);
                  }
                };

                return (
                  <td
                    key={cell.id}
                    className={`${styles.td} ${
                      enableEditing ? styles.editable : ""
                    }`}
                  >
                    {enableEditing ? (
                      <EditableCell
                        value={cell.getValue()}
                        isEditing={isEditing}
                        onEdit={handleEdit}
                        onValueChange={handleValueChange}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
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
