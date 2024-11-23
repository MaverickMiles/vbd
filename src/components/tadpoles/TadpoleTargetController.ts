import {TadpoleAnimationController} from "./TadpoleAnimationController";
import invariant from "tiny-invariant";

class TadpoleTargetController {
    isHidden: boolean = true;
    controller: TadpoleAnimationController;

    constructor(controller: TadpoleAnimationController) {
        this.controller = controller;
    }

    get eggContainer() {
        return this.controller.refController.eggLightRef.current;
    }

    get x() {
        const rect = this.eggContainer?.getBoundingClientRect();
        invariant(rect);
        return rect.x + rect.width / 2;
    }

    get y() {
        const rect = this.eggContainer?.getBoundingClientRect();
        invariant(rect);
        return rect.y + rect.height / 2;
    }

    show() {
        this.isHidden = false;
    }

    hide() {
        this.isHidden = true;
    }

    animate() {
        if (this.isHidden) return;
        const {canvasRef, eggRef, eggLightRef, avatarRef} = this.controller.refController;
        const canvas = canvasRef.current;
        const eggLight = eggLightRef.current;
        const egg = eggRef.current;
        invariant(canvas);
        invariant(egg);
        invariant(eggLight);
        const opacityRatio = this.controller.absorbedTadpoleRatio;
        egg.style.opacity = String(1 - opacityRatio);
        eggLight.style.opacity = String(Math.min(opacityRatio + 0.1, 1));
        // egg.style.transform = `scale(${opacityRatio + 0.5})`;
        // eggLight.style.transform = `scale(${opacityRatio + 0.5})`;
    }
}

export {TadpoleTargetController};