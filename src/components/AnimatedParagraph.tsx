import React, {useEffect, useId} from "react";
import styled from "styled-components";
import '../styles/scroll-fade-text.css';
import {motion} from "framer-motion";
import {TadpoleAnimationController} from "./tadpoles/TadpoleAnimationController";

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

interface AnimatedParagraphProps {
    paragraphs: string[];
    controller: TadpoleAnimationController;
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
    const {paragraphs, controller} = props;
    const {addParagraph} = controller.refController;
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

    return (
        <Container>
            <ContentContainer>
                {paragraphs.map((text, pIndex) => (
                    <div>
                        <ParagraphContainer key={`paragraph-${pIndex}`}>
                            {
                                text.split('\n').map((l, lIndex) => (
                                    <div ref={el => addParagraph(`${id}${pIndex}${lIndex}`, el)}>
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
