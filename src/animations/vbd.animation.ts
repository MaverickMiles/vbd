import {createRef, RefObject} from "react";
import anime, {AnimeParams} from "animejs";

interface Point {
    x: number;
    y: number;
}

class Animator {
    isRunning = false;
    textRef: RefObject<HTMLDivElement> = createRef();
    containerRef: RefObject<HTMLDivElement> = createRef();

    run = () => {
        if (this.isRunning) return;
        this.isRunning = true;
        return this.animateLetters();
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

    disintegrate(text: HTMLElement, container: HTMLElement,) {
        const particlePoints = this.createParticlePoints(text);

        particlePoints.forEach((point, i) => {
            const particle = this.createParticleElement(text, point);
            text.appendChild(particle);

            // Slight random delay for initial movement
            const delay = Math.random() * 0.5;

            // First animation: Smooth floating (2.5s)
            requestAnimationFrame(() => {
                particle.style.animation = `
            particleFloat 3s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards
          `;
            });

            // Second animation: Dispersal (1.5s)
            // setTimeout(() => {
            //     container.style.backgroundColor = 'black';
            //     particle.style.animation = `particleFade 5s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
            // }, 2500 + delay * 1000);
            // });

            // const animator = this;
            // Cleanup
            // setTimeout(() => {
            //     particle.remove();
            //     animator.isRunning = false;
            // }, 4000 + delay * 1000);
        });

        // Reset text after animation
        // setTimeout(() => {
        //     this.textRef.current.style.opacity = '1';
        // }, 4500);
    }

    animateLetters() {
        const text = this.textRef.current;
        // invariant(text);
        if (!text) return Promise.resolve();
        const letters = document.querySelectorAll<HTMLElement>('.letter');

        // opacity
        const animeParams: AnimeParams[] = [
            {
                targets: '.letter.letter-left',
                easing: 'easeInOutExpo',
                scale: [1, 1.25],
                translateX: [0, '-0.25em'],
                duration: 2000,
                delay: 40
            }, {
                targets: '.letter.letter-center',
                easing: 'easeInOutExpo',
                scale: [1, 1.2],
                duration: 1500,
            }, {
                targets: '.letter.letter-right',
                easing: 'easeInOutExpo',
                scale: [1, 1.25],
                translateX: [0, '0.25em'],
                duration: 3000,
                delay: 80
            },
        ];

        // const promises = [];
        // letters.forEach((letter, index) => {
        //     const time = Date.now();
        //     this.disintegrate(letter, text);
        //     console.log(`Time spent creating particles for ${letter.innerText}`, Date.now().valueOf() - time.valueOf());
        //     letter.style.color = 'white';
        // });

        const promise = Promise.all(animeParams.map((p) => anime(p).finished));

        return promise;

        // anime( {
        //     targets: text,
        //     opacity: [1,0],
        //     duration: 4000,
        //     easing: 'easeInOutExpo'
        // });

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
        particle.style.left = `${pos.x}px`;
        particle.style.top = `${pos.y}px`;

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