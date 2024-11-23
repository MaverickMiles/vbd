import {createRef, RefObject} from "react";

class RefController {
    canvasRef: RefObject<HTMLCanvasElement> = createRef();
    canvasContainerRef: RefObject<HTMLDivElement> = createRef();
    contentFrameRef: RefObject<HTMLDivElement> = createRef();
    scrollableContentRef: RefObject<HTMLDivElement> = createRef();
    eggContainerRef: RefObject<HTMLDivElement> = createRef();
    eggRef: RefObject<HTMLDivElement> = createRef();
    eggLightRef: RefObject<HTMLDivElement> = createRef();
    avatarRef: RefObject<HTMLDivElement> = createRef();
}

export {RefController};
