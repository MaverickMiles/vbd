import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/scroll-fade-text.css';
import {Avatar} from "./Avatar";

const Flower = ({ className = "", style = {} }) => (
  <svg
    viewBox="0 0 100 100"
    className={`absolute ${className}`}
    style={style}
  >
    {[0, 72, 144, 216, 288].map((rotation) => (
      <path
        key={rotation}
        d="M50 35c0-15 10-25 20-25s20 10 20 25-20 25-20 25-20-10-20-25z"
        transform={`rotate(${rotation}, 50, 50)`}
        fill="#ff9ecd"
        opacity="0.8"
      />
    ))}
    {[36, 108, 180, 252, 324].map((rotation) => (
      <path
        key={`inner-${rotation}`}
        d="M50 40c0-10 7-17 13-17s13 7 13 17-13 17-13 17-13-7-13-17z"
        transform={`rotate(${rotation}, 50, 50)`}
        fill="#ffb7db"
        opacity="0.9"
      />
    ))}
    <circle cx="50" cy="50" r="10" fill="#fff4bd" />
    <circle cx="50" cy="50" r="8" fill="#ffe44d" />
  </svg>
);

const flowers = Array.from({ length: 0 }, (_, i) => ({
  id: i,
  left: (i % 3) * 33 + Math.random() * 20,
  top: Math.floor(i / 3) * 40 + Math.random() * 20,
  size: 100 + Math.random() * 80 * 5,
  baseSpeed: 0.15 + Math.random() * 0.15, // Slightly slower base speed
  phase: Math.random() * Math.PI * 2,
  baseScale: 0.8 + Math.random() * 0.4,
  time: 0
}));

const __scrollFadeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
  const flowersRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastScrollRef = useRef<number>(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  const paragraphs = [
    "This first paragraph demonstrates the smooth fade effect. As you scroll through the content, you'll notice how the opacity changes dynamically based on its position.",
    "This second paragraph shows the continuous nature of the fade. The effect creates a natural focus point that follows your reading position as you scroll.",
    "The third paragraph continues the seamless transition. Each line's opacity is precisely calculated based on its distance from the viewport center.",
    "This fourth paragraph maintains the flowing effect. The dynamic opacity adjustments help guide your eyes through the content naturally.",
    "The final paragraph completes the demonstration. Notice how the fade creates a smooth, continuous reading experience throughout the text."
  ];

  useEffect(() => {
    let lastTime = performance.now();
    let scrollTimeout: number;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      flowers.forEach((flower, index) => {
        const flowerElement = flowersRef.current?.children[index] as HTMLDivElement | undefined;
        if (!flowerElement) return;

        // Reduced scroll speed influence (from 3 to 0.8)
        flower.time += deltaTime * (1 + scrollSpeed * 0.8);

        // Gentler movement amplitudes
        const floatY = Math.sin(flower.time + flower.phase) * 25;
        const floatX = Math.cos(flower.time * 0.7 + flower.phase) * 12;
        const rotation = Math.sin(flower.time * 0.4) * 12;
        const scale = flower.baseScale + Math.sin(flower.time * 0.6) * 0.05;

        flowerElement.style.transform = `
          translate(${floatX}px, ${floatY}px)
          rotate(${rotation}deg)
          scale(${scale})
        `;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDelta = Math.abs(currentScroll - lastScrollRef.current);
      lastScrollRef.current = currentScroll;

      // Reduced scroll speed sensitivity
      setScrollSpeed(Math.min(scrollDelta / 100, 0.5));

      clearTimeout(scrollTimeout);
      scrollTimeout = +setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    // window.addEventListener('scroll', handleScroll);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      // window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameRef.current!);
      // clearTimeout(scrollTimeout);
    };
  }, []);

  return (
      <div className="container" ref={containerRef}>
        <div className="flowers-container" ref={flowersRef}>
          {flowers.map((flower) => (
              <img
                  src={'/sea-animal.png'}
                  key={flower.id}
                  className="flower"
                  style={{
                    left: `${flower.left}%`,
                    top: `${flower.top}vh`,
                    width: flower.size,
                    height: flower.size,
                    opacity: 0.3,
                  }}
              >
                {/*<Avatar />*/}
              </img>
          ))}
        </div>

        <div className="content">
          {paragraphs.map((text, index) => (
              <p
                  key={index}
                  ref={el => _.set(paragraphRefs.current, index, el)}
                  className="paragraph"
              >
                {text}
              </p>
          ))}
        </div>
      </div>
  );
};

export default __scrollFadeText;
