import {createRef, RefObject} from "react";

export class PageController {

    ref: RefObject<HTMLDivElement> = createRef();

    constructor() {
    }

    get isViewed(): boolean {
        return false;
    }

    get scrollProgress(): number {
        return 0;
    }

    reset(): void {

    }

    scrollIntoView(opts?: ScrollIntoViewOptions): void {
        this.ref.current?.scrollIntoView(opts ?? {behavior: 'smooth', block: 'start'});
    }
}
