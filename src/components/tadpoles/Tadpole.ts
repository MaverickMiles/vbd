import {Point} from "../../models/common.model";
import {TadpoleAnimationController} from "./TadpoleAnimationController";
import invariant from "tiny-invariant";
import {Bound, checkBoundsIntersection, getBounds} from "../../utils/elem.utils";
import _ from "lodash";

const calcEuclidDist = (x: number, y: number) => {
    return Math.sqrt(x * x + y * y);
}

const baseVelocity = 2;
const bodyLength = 3;
const tailLength = 12;

const defaultFillStyle = {fill: '#FFFFFF', stroke: 'rgba(255,255,255,0.8)'};
const outOfFrameFillStyle = {fill: 'rgba(255,255,255,0.2)', stroke: 'rgba(255,255,255,0.2)'};
const absorbingFillStyle = {fill: 'rgba(255,239,160,0.95)', stroke: 'rgba(255,239,160, 0.4)'};

class Tadpole {
    vx: number;
    vy: number;
    count: number;
    size: number;
    turnSpeed: number;
    points: Point[];
    absorbed: boolean;
    controller: TadpoleAnimationController;
    savedX: number;
    savedY: number;

    constructor(controller: TadpoleAnimationController) {
        this.vx = (Math.random() - 0.5) * baseVelocity;
        this.vy = (Math.random() - 0.5) * baseVelocity;
        this.controller = controller;
        const canvasContainer = controller.refController.canvasContainerRef.current?.getBoundingClientRect();
        invariant(canvasContainer);
        const {height, width} = canvasContainer;
        this.points = new Array(tailLength + 1).fill({}).map(() => ({
            x: Math.random() * Math.min(width, 1200),
            y: Math.random() * Math.min(height, 900),
        }));
        this.count = 0;
        this.size = 6;
        this.turnSpeed = 0.05;
        this.absorbed = false;
        this.savedX = this.x;
        this.savedY = this.y;
    }

    get x() {
        return this.points[0].x;
    }

    get y() {
        return this.points[0].y;
    }

    get canvas() {
        return this.controller.canvas;
    }

    get context() {
        return this.controller.canvasContext;
    }

    getBodyPos = (): Point[] => {
        return this.points.slice(0, bodyLength);
    }

    get isAbsorbing() {
        return this.controller.transitionState === 'ABSORBING';
    }

    draw = () => {
        if (this.absorbed) return;
        const canvas = this.canvas;
        const context = this.context;
        invariant(canvas);
        invariant(context);
        const style = this.getStyle();
        // Head
        context.save();
        context.translate(this.x, this.y);
        context.rotate(Math.atan2(this.vy, this.vx));
        context.beginPath();
        context.ellipse(0, 0, 6.5, 4, 0, 0, 2 * Math.PI);
        context.fillStyle = style.fill;
        context.fill();
        context.restore();

        // Body
        context.strokeStyle = style.stroke;
        context.beginPath();
        context.moveTo(this.x, this.y);
        for (let i = 1; i < 3; ++i) context.lineTo(this.points[i].x, this.points[i].y);
        context.lineWidth = 4;
        context.stroke();

        // Tail
        context.beginPath();
        context.moveTo(this.x, this.y);
        for (let i = 1; i < this.points.length; ++i) context.lineTo(this.points[i].x, this.points[i].y);
        context.lineWidth = 2;
        context.stroke();
    }

    update = () => {
        if (this.absorbed) {
            return;
        }

        const canvas = this.canvas;
        const context = this.context;
        invariant(canvas);
        invariant(context);

        const {scrollProgress, tadpoleTarget} = this.controller;
        let targetSpeed = this.controller.transitionState === 'ABSORBING' ? 2 : 0.5 + (scrollProgress * 1.5);

        if (!tadpoleTarget.isHidden) {
            const dxFromTarget = tadpoleTarget.x - this.x;
            const dyFromTarget = tadpoleTarget.y - this.y;
            const dist = calcEuclidDist(dxFromTarget, dyFromTarget);
            if (dist < 50) {
                this.absorbed = true;
                return;
            }

            this.vx += (dxFromTarget / dist) * this.turnSpeed * (1 + scrollProgress * 2);
            this.vy += (dyFromTarget / dist) * this.turnSpeed * (1 + scrollProgress * 2);
        }

        let currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = (this.vx / currentSpeed) * targetSpeed;
        this.vy = (this.vy / currentSpeed) * targetSpeed;

        let dx = this.vx;
        let dy = this.vy;
        let x = this.points[0].x += dx;
        let y = this.points[0].y += dy;

        const count = currentSpeed * 10;
        const k1 = -5 - currentSpeed / 3;
        const {width, height} = canvas;

        // Bounce off the walls.
        if (x < 0 || x > width) this.vx *= -1;
        if (y < 0 || y > height) this.vy *= -1;

        // Swim!
        for (let j = 1; j < this.points.length; ++j) {
            const vx = x - this.points[j].x;
            const vy = y - this.points[j].y;
            const k2 = Math.sin(((this.count += count) + j * 3) / 300) / currentSpeed;
            this.points[j].x = (x += dx / currentSpeed * k1) - dy * k2;
            this.points[j].y = (y += dy / currentSpeed * k1) + dx * k2;
            currentSpeed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
        }

    }

    reset() {
        // console.log("Resetting");
        // this.points[0].x = this.savedX;
        // this.points[0].y = this.savedY;
        const canvas = this.canvas;
        invariant(canvas)
        const {height, width} = canvas;
        this.points = new Array(tailLength + 1).fill({}).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height
        }));
        this.absorbed = false;
        // this.vx =  (Math.random() - 0.5) * 2;
        // this.vy =  (Math.random() - 0.5) * 2;
    }

    getStyle() {
        if(this.isAbsorbing) return absorbingFillStyle;
        const contentFrameRef = this.getContentFrame();
        if (contentFrameRef && this.isIntersecting(contentFrameRef)){
            return defaultFillStyle;
        }
        return outOfFrameFillStyle;
    }

    getContentFrame() {
        return document.querySelector<HTMLElement>('.monologue-frame');
    }

    getBound(): Bound {
        return {
            left: this.points[0].x,
            right: _.last(this.points)?.x ?? 0,
            top: this.points[0].y,
            bottom: _.last(this.points)?.y ?? 0,
        }
    }

    isIntersecting(el: HTMLElement) {
        return checkBoundsIntersection( getBounds(el), this.getBound())
    }
}

export {Tadpole}