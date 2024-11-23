import invariant from "tiny-invariant";
import {Tadpole} from "./Tadpole";
import {action, autorun, makeObservable, observable} from "mobx";
import _ from "lodash";
import {RefController} from "./RefController";
import {TadpoleTargetController} from "./TadpoleTargetController";
import anime from "animejs";

const minTadpoles = 5;
const maxTadpoles = 100;

export type TransitionState = 'NONE' | 'SWIMMING' | 'ABSORBING' | 'REVEALING' | 'REVEALED';

/*
* Supported Transitions

* SWIMMING -> ABSORBING
* ABSORBING -> REVEALING
* REVEALING -> REVEALED

* REVEALED -> ABSORBING
* REVEALED -> SWIMMING

* REVEALING -> ABSORBING
* REVEALING -> SWIMMING

* ABSORBING -> SWIMMING
* */


export interface TransitionController {
    // supportedState: TransitionState[];
    onEnter?: (controller: TadpoleAnimationController, from: TransitionState) => void;
    onExit?: (controller: TadpoleAnimationController, to: TransitionState) => void;
}

const getCenterPosition = () => ({
    x: window.innerWidth / 2 - 50, // 50 is half the ellipse width
    y: window.innerHeight / 2 - 25, // 25 is half the ellipse height
});


const supportedTransitions: [TransitionState | '*', TransitionState | '*'][] = [
    ['NONE', 'SWIMMING'],
    ['*', 'NONE'],

    ['SWIMMING', 'ABSORBING'],
    ['ABSORBING', 'SWIMMING'],

    ['ABSORBING', 'REVEALING'],
    ['ABSORBING', 'REVEALED'],
    ['REVEALING', 'ABSORBING'],

    ['REVEALING', 'REVEALED'],

    // ['REVEALING', 'ABSORBING'],

    ['REVEALING', 'SWIMMING'],

    // ['REVEALED', 'ABSORBING'],

    ['REVEALED', 'SWIMMING'],
];

const isSupportedTransition = (fromPairs: [TransitionState, TransitionState]) => {
    return _.find(supportedTransitions, (pair) =>
        ((pair[0] === fromPairs[0]) || (pair[0] === '*'))
        &&
        ((pair[1] === fromPairs[1]) || (pair[1] === '*'))
    ) !== undefined;
}

const transitionController: Record<TransitionState, TransitionController> = {
    NONE: {
        onEnter(controller) {
            controller.removeTadpoles(controller.tadpoles.length);
        },
        onExit(controller) {
            if (controller.tadpoles.length === 0) {
                controller.addTadpoles(minTadpoles);
            }
        }
    },
    SWIMMING: {
        onEnter(controller: TadpoleAnimationController) {
            if (controller.activeTadpoleCount < minTadpoles) {
                controller.restart();
            }

            if (!controller.tadpoleTarget.isHidden) {
                controller.tadpoleTarget.hide();
                controller.tadpoles.forEach(t => t.reset());
            }
        },
    },
    ABSORBING: {
        onEnter(controller) {
            controller.tadpoleTarget.show();
        },
    },
    REVEALING: {
        onEnter(controller) {
            const eggContainer = controller.refController.eggLightRef.current;
            invariant(eggContainer);
            controller.setTransitionState('REVEALED');
            // const newXPos = getCenterPosition().x - eggContainer.getBoundingClientRect().x;
            // anime({
            //     targets: eggContainer,
            //     easing: 'easeInOutBack',
            //     timing: 5000,
            //     translateX: newXPos,
            // }).finished.then(() => {
            //     controller.setTransitionState('REVEALED');
            // });
        }
    },
    REVEALED: {},
};

class TadpoleAnimationController {
    tadpoles: Tadpole[] = [];
    hiddenTadpoles: Tadpole[] = [];
    isAnimating = false;
    scrollProgress = 0;
    tadpoleTarget: TadpoleTargetController;
    prevAnimationFrame: any = undefined;
    transitionState: TransitionState = 'SWIMMING';
    refController: RefController = new RefController();
    revealedAtLeastOnce = false;
    constructor() {
        makeObservable(this, {
            transitionState: observable,
            revealedAtLeastOnce: observable,
            setTransitionState: action
        }, {autoBind: true});
        this.tadpoleTarget = new TadpoleTargetController(this);
        autorun(() => {
            console.log("Transition State", this.transitionState);
        });
    }

    get absorbedTadpoles() {
        return this.tadpoles.filter(t => t.absorbed);
    }

    get absorbedTadpoleRatio() {
        return this.absorbedTadpoles.length / this.tadpoles.length;
    }

    get activeTadpoleCount() {
        return this.tadpoles.length - this.absorbedTadpoles.length;
    }

    get allTadpolesAbsorbed() {
        return this.activeTadpoleCount === 0;
    }

    addTadpoles = (count: number) => {
        for (let i = 0; i < count; i++) {
            if (this.hiddenTadpoles.length > 0) {
                this.tadpoles.push(this.hiddenTadpoles.pop()!);
            } else {
                this.addNewTadpole();
            }
        }
    }

    removeTadpoles = (count: number) => {
        for (let i = 0; i < count; i++) {
            if (this.tadpoles.length > 0) {
                this.hiddenTadpoles.push(this.tadpoles.pop()!);
            }
        }
    }

    addNewTadpole = () => {
        const tadpole = new Tadpole(this);
        this.tadpoles.push(tadpole);
    }

    get canvas() {
        return this.refController.canvasRef.current;
    }

    get canvasContext() {
        return this.canvas?.getContext('2d');
    }

    animate = () => {
        // console.log("IS ANIMATING");
        const {isAnimating, canvasContext, canvas} = this;
        invariant(canvas);
        invariant(canvasContext);
        const {width, height} = canvas;
        if (!isAnimating) {
            console.log("IS NOT ANIMATING");
            this.start();
            return;
        }

        canvasContext.clearRect(0, 0, width, height);
        this.updateTadpoleCount();

        // console.log({activeTadpoles: this.activeTadpoleCount});

        this.tadpoles.forEach(tadpole => {
            tadpole.update();
            tadpole.draw();
        });

        this.tadpoleTarget.animate();

        if (this.allTadpolesAbsorbed) {
            this.setTransitionState('REVEALING');
            return;
        }

        this.prevAnimationFrame = requestAnimationFrame(this.animate);
    }

    start = () => {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.animate();
    }

    stop = () => {
        this.isAnimating = false;
        cancelAnimationFrame(this.prevAnimationFrame);
    }

    restart = () => {
        this.stop();
        this.updateTadpoleCount();
        this.tadpoles.forEach(t => t.reset());
        this.start();
    }

    scrollEventListener = () => {
        const newProgress = this.getScrollProgress();
        if (newProgress > 0.95) {
            this.setTransitionState('ABSORBING');
        } else if (newProgress < 0.9 && newProgress > 0) {
            const prevState = this.transitionState;
            this.setTransitionState('SWIMMING');
            if (prevState === 'NONE') {
                this.stop();
                this.updateTadpoleCount();
                this.start();
            }
        } else if (newProgress === 0) {
            this.setTransitionState('NONE');
        }
        this.scrollProgress = newProgress;
        // console.log("Scroll Progress", newProgress);
    }

    skipRevealAnimation = () => {
    //     todo
        this.setTransitionState('REVEALED');
    }

    updateTadpoleCount = () => {
        const targetCount = this.scrollProgress > 0 ? Math.floor(minTadpoles + (maxTadpoles - minTadpoles) * this.scrollProgress) : 0;
        const activeTadpoleCount = this.tadpoles.length;

        if (targetCount > activeTadpoleCount) {
            this.addTadpoles(targetCount - activeTadpoleCount);
        } else if (targetCount < activeTadpoleCount) {
            this.removeTadpoles(targetCount);
        }
    }

    getScrollProgress = () => {
        const eggContainerRect = this.refController.eggContainerRef.current?.getBoundingClientRect();
        const contentFrameRect = this.refController.contentFrameRef.current?.getBoundingClientRect();
        invariant(eggContainerRect);
        invariant(contentFrameRect);
        const offsetFromTop = eggContainerRect.top - contentFrameRect.top;
        if (offsetFromTop > 0) return 0;
        const totalOffset = eggContainerRect.height - contentFrameRect.height;
        const scrollProgress = Math.abs(eggContainerRect.top) / totalOffset;
        return scrollProgress;
    }

    setTransitionState = (to: TransitionState) => {
        const from = this.transitionState;

        if (from === to || !isSupportedTransition([from, to])) return;

        this.transitionState = to;

        const transitionFrom = transitionController[from];
        const transitionTo = transitionController[to];

        if (transitionFrom.onExit) {
            transitionFrom.onExit(this, to);
        }

        if (transitionTo.onEnter) {
            transitionTo.onEnter(this, from);
        }

        // cleanup
        if (to === 'REVEALED' && !this.revealedAtLeastOnce) {
            this.revealedAtLeastOnce = true;
        }

        if (to === 'REVEALED' && !this.allTadpolesAbsorbed) {
            this.tadpoles.forEach(t => {
                t.absorbed = true;
            });
        }
    }
}

export {TadpoleAnimationController};