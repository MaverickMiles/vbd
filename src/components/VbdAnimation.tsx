import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {primaryRed} from "../styles/colors";
import '../styles/vbd.css';
import {Animator} from "../animations/vbd.animation";
import anime from "animejs";
import {observer, useLocalObservable} from "mobx-react";

const VbdContainer = styled.div`
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${primaryRed};
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Helvetica Neue", serif;
  font-size: 150px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  transition: background-color 2s ease-in-out;
`;

const Letter = styled.span`
  position: relative;
  display: inline-block;
  transition: opacity 3s ease-in-out;
`

const audioUrl = '/TED-Intro-Animation.mp3';

interface Props {
    onFinish: () => void;
}


const VbdAnimation = observer((props: Props) => {
    const animator = useLocalObservable(() => new Animator());

    useEffect(() => {
        const runner = animator.run.bind(animator);
        setTimeout(() => {
           runner();
        }, 1000);
    }, []);

    useEffect(() => {
        if (animator.isFinished) {
            console.log("is finished");
            props.onFinish();
        }
    }, [animator.isFinished]);

    return (
        <VbdContainer ref={animator.containerRef}>
            <VbdContainer ref={animator.textRef}>
                <Letter className={'letter letter-left'}>V</Letter>
                <Letter className={'letter letter-center'}>B</Letter>
                <Letter className={'letter letter-right'}>D</Letter>
            </VbdContainer>
            <audio ref={animator.audioRef} src={audioUrl}/>
        </VbdContainer>
    );
});

export {VbdAnimation}