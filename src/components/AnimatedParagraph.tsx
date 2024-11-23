import React, {RefObject, useEffect, useId, useRef} from "react";
import styled from "styled-components";
import _ from "lodash";
import '../styles/scroll-fade-text.css';
import anime from "animejs";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40vh;
  width: 700px;
`;

const ParagraphContainer = styled.div`
  color: #FFF;
  text-align: left;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Source Code Pro", serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  line-height: 50px; /* 150% */
  letter-spacing: 3px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LineContainer = styled.div`

`;


const fadeOnScroll = <T extends HTMLElement>(container: HTMLElement, el: HTMLElement) => {
    const containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height;
    const viewportCenter = containerHeight / 2;
    const rect = el.getBoundingClientRect();
    const elementCenter = (rect.top + rect.bottom) / 2;
    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
    const maxDistance = containerHeight / 2;
    const opacity = Math.max(0.1, 1 - Math.pow(distanceFromCenter / maxDistance, 2));
    el.style.opacity = opacity.toString();
    el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`
};


interface AnimatedParagraphProps {
    paragraphs: string[];
    scrollRef: RefObject<HTMLElement>;
}

const container = {
    hidden: {opacity: 1},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
}
const paragraph = {
    hidden: {opacity: 1},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
}
const line = {
    hidden: {opacity: 1},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
};

const letter = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            duration: 1
        }
    }
};

export const AnimatedParagraph = (props: AnimatedParagraphProps) => {
    const {paragraphs, scrollRef} = props;
    const paragraphRefs = useRef<HTMLElement[]>([]);
    const id = useId();
    const letterClassName = `${id.slice(0, 6)}-letter`;

    useEffect(() => {
        // const scroller = scrollRef.current;
        // if (!scroller) return;
        // const onScrollListener = () => onScroll(scroller);
        // window.addEventListener('scroll', onScrollListener);
        // return () => {
        //     window.removeEventListener('scroll', onScrollListener);
        // }


        // anime({
        //     targets: `.${letterClassName}`,
        //     delay: anime.stagger(50),
        //     translateX: 250
        // });

    }, []);

    const onScroll = (container: HTMLElement) => {
        paragraphRefs.current.forEach(paragraph => {
            console.log("On Scroll is working", container);
            fadeOnScroll(container, paragraph);
        });
    }

    return (
        <Container>
            <ContentContainer>
                {paragraphs.map((text, index) => (
                    <div
                        ref={el => _.set(paragraphRefs.current, index, el)}
                    >
                        <ParagraphContainer key={`paragraph-${index}`}>
                            {
                                text.split('\n').map(l => (
                                    <div>
                                        {
                                            l.split('').map(l => (
                                                <span className={letterClassName}>{l}</span>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </ParagraphContainer>
                    </div>
                ))}
            </ContentContainer>
        </Container>
    );
}
