// Type definitions for fullscreen API
interface Document {
    fullscreenElement: Element | null;
    mozFullScreenElement?: Element | null;
    webkitFullscreenElement?: Element | null;
    msFullscreenElement?: Element | null;

    exitFullscreen: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
}

interface Element {
    requestFullscreen: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
}

/**
 * Error class for fullscreen-related errors
 */
class FullscreenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FullscreenError';
    }
}

/**
 * Request fullscreen mode for a given element
 * @param element - The element to make fullscreen
 * @returns Promise that resolves when fullscreen is enabled
 */
export async function requestFullscreen(element: Element): Promise<void> {
    try {
        if (element.requestFullscreen) {
            await element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            await element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            await element.msRequestFullscreen();
        } else {
            throw new FullscreenError('Fullscreen API not supported');
        }
    } catch (error) {
        throw new FullscreenError(
            `Failed to enter fullscreen: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Exit fullscreen mode
 * @returns Promise that resolves when fullscreen is disabled
 */
export async function exitFullscreen(): Promise<void> {
    try {
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        }
    } catch (error) {
        throw new FullscreenError(
            `Failed to exit fullscreen: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Check if the document is currently in fullscreen mode
 * @returns boolean indicating fullscreen state
 */
export function isFullscreen(): boolean {
    return !!(
        document.fullscreenElement
    );
}

/**
 * Toggle fullscreen mode for a given element
 * @param element - The element to toggle fullscreen for
 * @returns Promise that resolves when the toggle is complete
 */
export async function toggleFullscreen(element: Element): Promise<void> {
    if (isFullscreen()) {
        await exitFullscreen();
    } else {
        await requestFullscreen(element);
    }
}
