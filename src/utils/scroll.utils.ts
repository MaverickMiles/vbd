export interface ScrollMetrics {
    scrollTop: number;
    scrollLeft: number;
    scrollHeight: number;
    scrollWidth: number;
    clientHeight: number;
    clientWidth: number;
    scrollableHeight: number;
    scrollableWidth: number;
    scrollPercentY: number;
    scrollPercentX: number;
}

/**
 * Gets the scroll position and related metrics for a nested scrollable element
 * @param {HTMLElement} element - The scrollable element to measure
 * @returns {Object} Object containing scroll metrics
 */
export function getScrollMetrics(element: HTMLElement): ScrollMetrics {
    // How far the element has been scrolled vertically
    const scrollTop = element.scrollTop;

    // How far the element has been scrolled horizontally
    const scrollLeft = element.scrollLeft;

    // Total scrollable height (including overflow)
    const scrollHeight = element.scrollHeight;

    // Total scrollable width (including overflow)
    const scrollWidth = element.scrollWidth;

    // Visible height of the element
    const clientHeight = element.clientHeight;

    // Visible width of the element
    const clientWidth = element.clientWidth;

    // How many pixels are hidden above/below
    const scrollableHeight = scrollHeight - clientHeight;

    // How many pixels are hidden to the left/right
    const scrollableWidth = scrollWidth - clientWidth;

    // Percentage scrolled vertically (0 to 1)
    const scrollPercentY = (scrollTop / scrollableHeight);

    // Percentage scrolled horizontally (0 to 1)
    const scrollPercentX = (scrollLeft / scrollableWidth);

    return {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
        scrollableHeight,
        scrollableWidth,
        scrollPercentY,
        scrollPercentX
    };
}

// Example usage:
// const scrollableDiv = document.querySelector('.scrollable-container');
// const metrics = getScrollMetrics(scrollableDiv);
// console.log(`Scrolled ${metrics.scrollPercentY.toFixed(1)}% vertically`);