"use client";

import React, { useState, useRef } from "react";
import { HeaderGroup } from "@tanstack/react-table";
import styles from "../Table.module.css";
import { getDragAndDropProps, renderHeaderCell } from "../utils";

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  enableSorting: boolean;
  enableFiltering: boolean;
  enableColumnOrdering?: boolean;
}

export function TableHeader<T>({
  headerGroups,
  enableSorting,
  enableFiltering,
  enableColumnOrdering = false,
}: TableHeaderProps<T>): React.ReactElement {
  // Track dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  // Refs for header elements
  const headerRefs = useRef<Map<string, HTMLTableCellElement>>(new Map());
  const initialPositions = useRef<Map<string, DOMRect>>(new Map());
  const animatingColumns = useRef<Set<string>>(new Set());

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            // Determine if this column is being dragged or is a drop target
            const isDragging = draggingId === header.id;
            const isDropTarget = dropTargetId === header.id;

            return (
              <th
                key={header.id}
                ref={(el) => {
                  if (el) headerRefs.current.set(header.id, el);
                }}
                className={`${styles.th} ${isDragging ? styles.dragging : ""} ${
                  isDropTarget ? styles.dropTarget + " " + styles.active : ""
                }`}
                style={{ width: header.getSize() }}
                {...getDragAndDropProps(
                  header,
                  headerGroup,
                  enableColumnOrdering,
                  draggingId,
                  dropTargetId,
                  setDraggingId,
                  setDropTargetId,
                  headerRefs.current,
                  initialPositions.current,
                  animatingColumns.current
                )}
              >
                {renderHeaderCell(
                  header,
                  styles,
                  enableSorting,
                  enableFiltering,
                  enableColumnOrdering
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
