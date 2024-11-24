import {createRef, RefObject} from "react";
import anime, {AnimeParams} from "animejs";
import {action, makeObservable, observable} from "mobx";

interface Point {
    x: number;
    y: number;
}


const opacityParams: AnimeParams[] = [
    {
        targets: '.letter.letter-left',
        easing: 'linear',
        // color: 'white',
        opacity: 0,
        duration: 300,
    }, {
        targets: '.letter.letter-center',
        easing: 'linear',
        // color: 'white',
        opacity: 0,
        duration: 300,
    }, {
        targets: '.letter.letter-right',
        easing: 'linear',
        // color: 'white',
        opacity: 0,
        duration: 300,
    },
]

const motionParams: AnimeParams[] = [
    {
        targets: '.letter.letter-left',
        easing: 'easeInOutExpo',
        scale: [1, 1.25],
        translateX: [0, '-0.25em'],
        duration: 3000,
    }, {
        targets: '.letter.letter-center',
        easing: 'easeInOutExpo',
        scale: [1, 1.2],
        duration: 3000,
    }, {
        targets: '.letter.letter-right',
        easing: 'easeInOutExpo',
        scale: [1, 1.25],
        translateX: [0, '0.25em'],
        duration: 3000,
    },
];

const runTimeline = (params: AnimeParams[]) => anime.timeline().add(params[1], '-=100').add(params[2], '-=100').add(params[0], '-=100');
const opacityTimeline = () => runTimeline(opacityParams);
const motionTimeline = () => runTimeline(motionParams);


class Animator {
    isRunning = false;
    isFinished = false;
    lock = false;
    textRef: RefObject<HTMLDivElement> = createRef();
    containerRef: RefObject<HTMLDivElement> = createRef();
    audioRef:RefObject<HTMLAudioElement> = createRef();
    constructor() {
        makeObservable(this,  {isFinished: observable, setIsFinished: action}, {autoBind: true});
    }

    run = () => {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animateLetters();
    }

    setIsFinished = (isFinished: boolean) => {
        this.isFinished  = isFinished
    }

    generateSmoothPath(radius: number) {
        // Generate a smooth path using connected points
        // Each point is influenced by the previous point's direction
        let points = [];
        let prevAngle = Math.random() * Math.PI * 2;
        let x = 0, y = 0;

        for (let i = 0; i < 5; i++) {
            // Vary the angle slightly from previous direction for smoothness
            const angleVariation = (Math.random() - 0.5) * Math.PI * 0.5;
            prevAngle += angleVariation;

            // Calculate new position based on angle and radius
            const distance = radius * (0.5 + Math.random() * 0.5);
            x += Math.cos(prevAngle) * distance;
            y += Math.sin(prevAngle) * distance;

            points.push({x, y});
        }

        return points;
    }

    isEdge(ctx: CanvasRenderingContext2D, x: number, y: number) {
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        // ,[1,1],[-1,-1],[1,-1],[-1,1]];
        const alpha = ctx.getImageData(x, y, 1, 1).data[3];
        if (alpha <= 0) return false;
        return directions.some(([dx, dy]) => ctx.getImageData(x + dx, y + dy, 1, 1).data[3] <= 0);
    }

    createParticlePoints(textNode: HTMLElement): Point[] {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return [];
        ctx.getContextAttributes().willReadFrequently = true;

        const rect = textNode.getBoundingClientRect();
        const points: Point[] = [];
        const spacing = 1;

        canvas.width = rect.width;
        canvas.height = rect.height;

        ctx.font = getComputedStyle(textNode).font;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(textNode.innerText, 0, rect.height * 0.8);
        const imageData = ctx.getImageData(0, 0, rect.width, rect.height);
        // console.log(imageData.data);
        // let counter = 0;
        // let stepper = 3;

        for (let y = 0; y < rect.height; y += spacing) {
            for (let x = 0; x < rect.width; x += spacing) {
                if (this.isEdge(ctx, x, y)) {
                    points.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        return points;
    }

    disintegrate = (text: HTMLElement, container: HTMLElement,) => {
        const particlePoints = this.createParticlePoints(text);
        console.log({particlePoints: particlePoints.length});
        particlePoints.forEach((point, i) => {
            const particle = this.createParticleElement(text, point);
            document.body.appendChild(particle);

            // Slight random delay for initial movement
            const delay = Math.random() * 0.5;
            const animator = this;

            // First animation: Smooth floating (2.5s)
            requestAnimationFrame(() => {
                particle.style.animation = `particleFloat 2.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards`;
                // Second animation: Dispersal (1.5s)
                setTimeout(() => {
                    if (!this.lock) {
                        this.lock = true;
                        if (this.textRef.current) {
                            console.log(this.textRef.current);
                            this.textRef.current.style.backgroundColor = 'black';
                        }
                    }
                    particle.style.animation = `particleFade 3s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                }, 2000 + delay * 1000);
                // Cleanup
                setTimeout(() => {
                    particle.remove();
                    animator.isRunning = false;
                    animator.setIsFinished(true);
                }, 4000 + delay * 1000);
            });
        });

        // Reset text after animation
        setTimeout(() => {
            if (this.textRef.current)
                this.textRef.current.style.opacity = '1';
        }, 4500);
    }

    animateLetters() {
        const text = this.textRef.current;
        // invariant(text);
        if (!text) return Promise.resolve();
        const letters = document.querySelectorAll<HTMLElement>('.letter');

        // opacity

        // const promises = [];
        letters.forEach((letter, index) => {
            const time = Date.now();
            this.disintegrate(letter, text);
            console.log(`Time spent creating particles for ${letter.innerText}`, Date.now().valueOf() - time.valueOf());
            // letter.style.color = 'white';
            letter.style.opacity = '0';
            // letter.style.textShadow = 'none';
        });
        this.audioRef.current?.play();
    }

    animateLetterPoints() {

    }

    createParticleElement(parent: HTMLElement, pos: Point): HTMLElement {
        const rect = parent.getBoundingClientRect();
        const particle = document.createElement('div');
        // const bubbleInner = document.createElement('div');
        // const highlight = document.createElement('div');
        // const secondaryHighlight = document.createElement('div');
        particle.className = 'bubble';
        // bubbleInner.className = 'bubble-inner';
        // highlight.className = 'highlight';
        // secondaryHighlight.className = 'secondary-highlight';
        // bubbleInner.appendChild(highlight);
        // bubbleInner.appendChild(secondaryHighlight);
        // particle.appendChild(bubbleInner);

        // Initial position
        particle.style.left = `${pos.x + rect.x}px`;
        particle.style.top = `${pos.y + rect.y}px`;

        // Generate smooth floating path
        const floatPath = this.generateSmoothPath(3);

        // Set floating keyframe positions
        floatPath.forEach((pos, index) => {
            particle.style.setProperty(`--f${index + 1}x`, `${pos.x}px`);
            particle.style.setProperty(`--f${index + 1}y`, `${pos.y}px`);
        });

        // Final dispersal
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 1000;
        const finalX = Math.cos(angle) * velocity;
        const finalY = Math.sin(angle) * velocity;
        const rotation = (Math.random() - 0.5) * 720;

        particle.style.setProperty('--finalX', `${finalX}px`);
        particle.style.setProperty('--finalY', `${finalY}px`);
        particle.style.setProperty('--rot', `${rotation}deg`);

        return particle;
    }

}

export {Animator};