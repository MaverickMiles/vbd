export interface Bound {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

// Helper function to get element boundaries
export function getBounds(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left,
        right: rect.left + rect.width,
        top: rect.top,
        bottom: rect.top + rect.height
    };
}

export function checkIntersection(element1: HTMLElement, element2: HTMLElement): boolean {
    const bounds1 = getBounds(element1);
    const bounds2 = getBounds(element2);

   return checkBoundsIntersection(bounds1, bounds2);
}

export function checkBoundsIntersection(bounds1: Bound, bounds2: Bound): boolean {
    return !(
        bounds1.right < bounds2.left ||
        bounds1.left > bounds2.right ||
        bounds1.bottom < bounds2.top ||
        bounds1.top > bounds2.bottom
    );
}
