import {Point} from "../models/common.model";
import invariant from "tiny-invariant";

const n = 10;

function moveTadpoleToPos(tadpole: HTMLElement, pos: Point) {
    tadpole.style.left = `${pos.x}px`;
    tadpole.style.top = `${pos.y}px`;
}

export function createTadpoles(container: HTMLElement) {
    // create tadpoles
    // animate the tail flocking around
    const n = 10;
    const v = 2;
    const m = 12;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    // canvas.style.backgroundColor = 'black';

    const context = canvas.getContext('2d');
    invariant(context);
    context.lineJoin = "round";
    context.lineCap = "round";

    // animate them moving around
    const old_tadpoles = new Array(n).fill({}).map(() => ({
        vx: (Math.random() - 0.5) * v,
        vy: (Math.random() - 0.5) * v,
        px: new Array(m).fill(Math.random() * width),
        py: new Array(m).fill(Math.random() * height),
        count: 0
    }));

    let isPlaying = false;

    const loop = () => {
        context.clearRect(0, 0, width, height);

        for (const t of old_tadpoles) {
            let dx = t.vx;
            let dy = t.vy;
            let x = t.px[0] += dx;
            let y = t.py[0] += dy;
            let speed = Math.sqrt(dx * dx + dy * dy);
            const count = speed * 10;
            const k1 = -5 - speed / 3;

            // Bounce off the walls.
            if (x < 0 || x > width) t.vx *= -1;
            if (y < 0 || y > height) t.vy *= -1;

            // Swim!
            for (var j = 1; j < m; ++j) {
                const vx = x - t.px[j];
                const vy = y - t.py[j];
                const k2 = Math.sin(((t.count += count) + j * 3) / 300) / speed;
                t.px[j] = (x += dx / speed * k1) - dy * k2;
                t.py[j] = (y += dy / speed * k1) + dx * k2;
                speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
            }

            // Head
            context.save();
            context.translate(t.px[0], t.py[0]);
            context.rotate(Math.atan2(t.vy, t.vx));
            context.beginPath();
            context.ellipse(0, 0, 6.5, 4, 0, 0, 2 * Math.PI);
            context.fill();
            context.restore();

            // Body
            context.beginPath();
            context.moveTo(t.px[0], t.py[0]);
            for (let i = 1; i < 3; ++i) context.lineTo(t.px[i], t.py[i]);
            context.lineWidth = 4;
            context.stroke();

            // Tail
            context.beginPath();
            context.moveTo(t.px[0], t.py[0]);
            for (let i = 1; i < m; ++i) context.lineTo(t.px[i], t.py[i]);
            context.lineWidth = 2;
            context.stroke();
        }

        if (isPlaying) {
            requestAnimationFrame(loop);
        }
    }

    const start = () => {
        if (isPlaying) return;
        container.appendChild(canvas);
        isPlaying = true;
        loop();
    };

    const stop = () => {
        isPlaying = false;
        container.removeChild(canvas);
    }

    return {
        start,
        stop,
    };
}

