import {createRef, RefObject} from "react";
import {checkBoundsIntersection} from "../../utils/elem.utils";
import {fadeOnScroll} from "../../utils/scroll.utils";

class RefController {
    canvasRef: RefObject<HTMLCanvasElement> = createRef();
    canvasContainerRef: RefObject<HTMLDivElement> = createRef();
    contentFrameRef: RefObject<HTMLDivElement> = createRef();
    scrollableContentRef: RefObject<HTMLDivElement> = createRef();
    eggContainerRef: RefObject<HTMLDivElement> = createRef();
    eggRef: RefObject<HTMLDivElement> = createRef();
    eggLightRef: RefObject<HTMLDivElement> = createRef();
    avatarRef: RefObject<HTMLDivElement> = createRef();
    endDetectorRef: RefObject<HTMLDivElement> = createRef();
    audioRef: RefObject<HTMLAudioElement> = createRef();
    contentInView: Record<string, HTMLDivElement | null> = {};

    constructor() {
    }

    endDetectorInView = () => {
        const endDetectorRect = this.endDetectorRef.current?.getBoundingClientRect();
        const contentFrameRect = this.contentFrameRef.current?.getBoundingClientRect();
        if (!endDetectorRect || !contentFrameRect) return false;
        return checkBoundsIntersection(endDetectorRect, contentFrameRect);
    }

    addParagraph = (id: string, el: HTMLDivElement | null) => {
        this.contentInView[id] = el;
    }

    updateParagraphsOpacity = () => {
        const contentFrame = this.contentFrameRef.current;
        if (!contentFrame) return;
        Object.values(this.contentInView).forEach(paragraph => {
            if (paragraph){
                fadeOnScroll(contentFrame, paragraph);
            }
        });
    }
}

export {RefController};
