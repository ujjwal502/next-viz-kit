import { Header, HeaderGroup } from "@tanstack/react-table";
import { animateReordering } from "./animation";

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

export const handleDragLeave = (
  headerId: string,
  dropTargetId: string | null,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  if (dropTargetId === headerId) {
    setDropTargetId(null);
  }
};

export const handleColumnReordering = <T,>(
  sourceId: string,
  targetId: string,
  headerGroup: HeaderGroup<T>,
  setColumnOrder: (updater: string[]) => void,
  currentColumnOrder: string[],
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>
): void => {
  if (sourceId === targetId) return;

  const columnIds = [...currentColumnOrder];

  if (columnIds.length === 0) {
    headerGroup.headers.forEach((h) => columnIds.push(h.id));
  }

  const sourceIndex = columnIds.indexOf(sourceId);
  const targetIndex = columnIds.indexOf(targetId);

  if (sourceIndex !== -1 && targetIndex !== -1) {
    const newColumnOrder = [...columnIds];
    newColumnOrder.splice(sourceIndex, 1);
    newColumnOrder.splice(targetIndex, 0, sourceId);

    animateReordering(
      columnIds,
      newColumnOrder,
      headerRefs,
      initialPositions,
      animatingColumns
    );

    setColumnOrder(newColumnOrder);
  }
};

export const handleDrop = <T,>(
  e: React.DragEvent<HTMLTableCellElement>,
  header: Header<T, unknown>,
  headerGroup: HeaderGroup<T>,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>,
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>
): void => {
  e.preventDefault();
  setDropTargetId(null);

  const sourceId = e.dataTransfer.getData("columnId");
  const targetId = header.id;
  const context = header.getContext();
  const setColumnOrder = context.table.setColumnOrder;
  const currentColumnOrder = context.table.getState().columnOrder || [];

  handleColumnReordering(
    sourceId,
    targetId,
    headerGroup,
    setColumnOrder,
    currentColumnOrder,
    headerRefs,
    initialPositions,
    animatingColumns
  );
};

export const getDragAndDropProps = <T,>(
  header: Header<T, unknown>,
  headerGroup: HeaderGroup<T>,
  enableColumnOrdering: boolean,
  draggingId: string | null,
  dropTargetId: string | null,
  setDraggingId: React.Dispatch<React.SetStateAction<string | null>>,
  setDropTargetId: React.Dispatch<React.SetStateAction<string | null>>,
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>
): React.HTMLAttributes<HTMLTableCellElement> => {
  const context = header.getContext();
  const setColumnOrder = context.table.setColumnOrder;

  if (!enableColumnOrdering || !setColumnOrder) return {};

  return {
    draggable: true,
    onDragStart: (e: React.DragEvent<HTMLTableCellElement>) =>
      handleDragStart(
        e,
        header.id,
        header.column.columnDef.header as string,
        setDraggingId
      ),
    onDragEnd: () => handleDragEnd(setDraggingId, setDropTargetId),
    onDragOver: (e: React.DragEvent<HTMLTableCellElement>) =>
      handleDragOver(e, header.id, draggingId, setDropTargetId),
    onDragLeave: () =>
      handleDragLeave(header.id, dropTargetId, setDropTargetId),
    onDrop: (e: React.DragEvent<HTMLTableCellElement>) =>
      handleDrop(
        e,
        header,
        headerGroup,
        setDropTargetId,
        headerRefs,
        initialPositions,
        animatingColumns
      ),
  };
};
