import React from "react";
import { Header } from "@tanstack/react-table";

export const createDragImage = (headerText: string): HTMLElement => {
  const dragImage = document.createElement("div");
  dragImage.textContent = headerText;
  dragImage.style.backgroundColor = "#f9fafb";
  dragImage.style.padding = "8px 12px";
  dragImage.style.borderRadius = "4px";
  dragImage.style.boxShadow = "0 2px 5px rgba(0,0,0,0.15)";
  dragImage.style.position = "absolute";
  dragImage.style.top = "-1000px";
  document.body.appendChild(dragImage);

  return dragImage;
};

export const handleDragStart = (
  e: React.DragEvent<HTMLTableCellElement>,
  headerId: string,
  headerText: string,
  setDraggingId: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  setDraggingId(headerId);
  e.dataTransfer.setData("columnId", headerId);

  const dragImage = createDragImage(headerText);
  e.dataTransfer.setDragImage(dragImage, 0, 0);

  setTimeout(() => {
    document.body.removeChild(dragImage);
  }, 0);
};

export const handleDragEnd = (
  setDraggingId: React.Dispatch<React.SetStateAction<string | null>>,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  setDraggingId(null);
  setDropTargetId(null);
};

export const handleDragOver = (
  e: React.DragEvent<HTMLTableCellElement>,
  headerId: string,
  draggingId: string | null,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  e.preventDefault();
  if (draggingId !== headerId) {
    setDropTargetId(headerId);
  }
};

export const animateColumnMove = (
  sourceId: string,
  targetId: string,
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>
): void => {
  if (!headerRefs.has(sourceId) || !headerRefs.has(targetId)) return;

  const sourceElement = headerRefs.get(sourceId);
  const targetElement = headerRefs.get(targetId);

  if (!sourceElement || !targetElement) return;

  initialPositions.set(sourceId, sourceElement.getBoundingClientRect());

  // Sets up animation after the DOM has updated
  requestAnimationFrame(() => {
    const finalPosition = sourceElement.getBoundingClientRect();
    const initialPosition = initialPositions.get(sourceId);

    if (!initialPosition) return;

    const deltaX = initialPosition.left - finalPosition.left;

    if (Math.abs(deltaX) > 1) {
      animatingColumns.add(sourceId);

      sourceElement.style.transform = `translateX(${deltaX}px)`;
      sourceElement.style.transition = "none";

      // it forces reflow
      void sourceElement.offsetHeight;

      sourceElement.style.transition = "transform 300ms ease-out";
      sourceElement.style.transform = "translateX(0)";

      // Clean up after animation
      const onTransitionEnd = () => {
        sourceElement.style.transform = "";
        sourceElement.style.transition = "";
        animatingColumns.delete(sourceId);
        sourceElement.removeEventListener("transitionend", onTransitionEnd);
      };

      sourceElement.addEventListener("transitionend", onTransitionEnd);
    }
  });
};

export const handleDrop = <T,>(
  e: React.DragEvent<HTMLTableCellElement>,
  header: Header<T, unknown>,
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>,
  setDraggingId: React.Dispatch<React.SetStateAction<string | null>>,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData("columnId");

  if (draggedId && draggedId !== header.id) {
    const table = header.getContext().table;

    const allColumns = table.getAllColumns();
    const allColumnIds = allColumns.map((col) => col.id);

    const currentOrder = table.getState().columnOrder || allColumnIds;
    const newOrder = [...currentOrder];

    const sourceIndex = currentOrder.indexOf(draggedId);
    const targetIndex = currentOrder.indexOf(header.id);

    if (sourceIndex !== -1) {
      newOrder.splice(sourceIndex, 1);

      let insertPosition;

      if (sourceIndex < targetIndex) {
        // Left to right movement:
        // We want to insert AFTER the target column, not before it
        // We need to use targetIndex because the array already shifted left
        insertPosition = targetIndex; // This actually inserts AFTER the target
      } else {
        // Right to left movement:
        // We want to insert BEFORE the target column
        insertPosition = targetIndex;
      }

      newOrder.splice(insertPosition, 0, draggedId);

      table.setColumnOrder(newOrder);

      animateColumnMove(
        draggedId,
        header.id,
        headerRefs,
        initialPositions,
        animatingColumns
      );
    }
  }

  setDraggingId(null);
  setDropTargetId(null);
};

export const getDragAndDropProps = <T,>(
  header: Header<T, unknown>,
  enableColumnOrdering: boolean,
  setDraggingId: React.Dispatch<React.SetStateAction<string | null>>,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>,
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>,
  draggingId: string | null
): React.HTMLAttributes<HTMLTableCellElement> => {
  if (!enableColumnOrdering) {
    return {};
  }

  const headerText = header.column.columnDef.header as string;

  return {
    draggable: true,
    onDragStart: (e) =>
      handleDragStart(e, header.id, headerText, setDraggingId),
    onDragEnd: () => handleDragEnd(setDraggingId, setDropTargetId),
    onDragOver: (e) =>
      handleDragOver(e, header.id, draggingId, setDropTargetId),
    onDrop: (e) =>
      handleDrop(
        e,
        header,
        headerRefs,
        initialPositions,
        animatingColumns,
        setDraggingId,
        setDropTargetId
      ),
  };
};
