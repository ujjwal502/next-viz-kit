"use client";

import React, { useState, useRef } from "react";
import styles from "../Table.module.css";
import { renderHeaderCell } from "../utils/render";
import { TableHeaderProps } from "../types";
import {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
} from "../utils/dragAndDrop";

export function TableHeader<T extends object>({
  headerGroups,
  enableSorting,
  enableFiltering,
  enableColumnOrdering = false,
}: TableHeaderProps<T>): React.ReactElement {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const headerRefs = useRef<Map<string, HTMLTableCellElement>>(new Map());
  const initialPositions = useRef<Map<string, DOMRect>>(new Map());
  const animatingColumns = useRef<Set<string>>(new Set());

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isDragging = draggingId === header.id;
            const isDropTarget = dropTargetId === header.id;

            const dragDropProps = enableColumnOrdering
              ? {
                  ref: (el: HTMLTableCellElement) => {
                    if (el) headerRefs.current.set(header.id, el);
                  },
                  draggable: true,
                  onDragStart: (e: React.DragEvent<HTMLTableCellElement>) => {
                    const headerText = header.column.columnDef.header as string;
                    handleDragStart(e, header.id, headerText, setDraggingId);
                  },
                  onDragEnd: () =>
                    handleDragEnd(setDraggingId, setDropTargetId),
                  onDragOver: (e: React.DragEvent<HTMLTableCellElement>) => {
                    handleDragOver(e, header.id, draggingId, setDropTargetId);
                  },
                  onDrop: (e: React.DragEvent<HTMLTableCellElement>) => {
                    handleDrop(
                      e,
                      header,
                      headerRefs.current,
                      initialPositions.current,
                      animatingColumns.current,
                      setDraggingId,
                      setDropTargetId
                    );
                  },
                }
              : {
                  ref: (el: HTMLTableCellElement) => {
                    if (el) headerRefs.current.set(header.id, el);
                  },
                };

            return (
              <th
                key={header.id}
                className={`${styles.th} ${isDragging ? styles.dragging : ""} ${
                  isDropTarget ? styles.dropTarget + " " + styles.active : ""
                }`}
                style={{ width: header.getSize() }}
                {...dragDropProps}
              >
                {renderHeaderCell(header, enableSorting, enableFiltering)}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
