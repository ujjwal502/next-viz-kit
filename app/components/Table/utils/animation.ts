/**
 * we store initial positions of elements before animation
 */
export const storeInitialPositions = (
  columnIds: string[],
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>
): void => {
  columnIds.forEach((id) => {
    const element = headerRefs.get(id);
    if (element) {
      initialPositions.set(id, element.getBoundingClientRect());
    }
  });
};

export const calculateFinalPositions = (
  newOrder: string[],
  headerRefs: Map<string, HTMLTableCellElement>
): Map<string, DOMRect> => {
  const finalPositions = new Map<string, DOMRect>();
  newOrder.forEach((id) => {
    const element = headerRefs.get(id);
    if (element) {
      finalPositions.set(id, element.getBoundingClientRect());
    }
  });
  return finalPositions;
};

/**
 * Apply animation to a single element using the FLIP technique
 * (First-Last-Invert-Play)
 */
export const animateElement = (
  element: HTMLElement,
  initialPos: DOMRect,
  finalPos: DOMRect,
  id: string,
  animatingColumns: Set<string>,
  duration: number = 300
): void => {
  const deltaX = initialPos.left - finalPos.left;

  if (Math.abs(deltaX) > 1) {
    // Only animate if there's significant movement
    animatingColumns.add(id);

    // Apply initial transform to simulate starting position
    element.style.transform = `translateX(${deltaX}px)`;
    element.style.transition = "none";

    // Force reflow to ensure the browser recognizes the change
    void element.offsetHeight;

    // Start animation to the final position
    element.style.transition = `transform ${duration}ms ease-out`;
    element.style.transform = "translateX(0)";

    // Clean up after animation ends
    const onTransitionEnd = () => {
      element.style.transform = "";
      element.style.transition = "";
      animatingColumns.delete(id);
      element.removeEventListener("transitionend", onTransitionEnd);
    };

    element.addEventListener("transitionend", onTransitionEnd);
  }
};

export const animateReordering = (
  columnIds: string[],
  newOrder: string[],
  headerRefs: Map<string, HTMLTableCellElement>,
  initialPositions: Map<string, DOMRect>,
  animatingColumns: Set<string>
): void => {
  // Store initial positions
  storeInitialPositions(columnIds, headerRefs, initialPositions);

  // Use requestAnimationFrame to ensure layout is calculated
  requestAnimationFrame(() => {
    // Get the final positions after layout
    const finalPositions = calculateFinalPositions(newOrder, headerRefs);

    // Apply FLIP animation to each element
    newOrder.forEach((id) => {
      const element = headerRefs.get(id);
      if (!element) return;

      const initialPos = initialPositions.get(id);
      const finalPos = finalPositions.get(id);

      if (initialPos && finalPos) {
        animateElement(element, initialPos, finalPos, id, animatingColumns);
      }
    });
  });
};
