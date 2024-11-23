import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {primaryRed} from "../styles/colors";
import '../styles/vbd.css';
import {Animator} from "../animations/vbd.animation";

const VbdContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${primaryRed};
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Helvetica Neue", serif;
  font-size: 300px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  transition: background-color 2s ease-in-out;
`;

const Letter = styled.span`
  position: relative;
  display: inline-block;
  transition: color 4s ease-in-out;
`

const animator = new Animator();

const audioUrl = '/TED-Intro-Animation.mp3';

interface Props {
    onFinish: () => void;
}

const VbdAnimation = (props: Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const runner = animator.run.bind(animator);
        setTimeout(() => {
            audioRef.current?.play();
           runner();
        }, 1000);
    }, []);

    return (
        <VbdContainer ref={animator.containerRef}>
            <VbdContainer ref={animator.textRef}>
                <Letter className={'letter letter-left'}>V</Letter>
                <Letter className={'letter letter-center'}>B</Letter>
                <Letter className={'letter letter-right'}>D</Letter>
            </VbdContainer>
            <audio ref={audioRef} src={audioUrl}/>
        </VbdContainer>
    );
};

export {VbdAnimation}