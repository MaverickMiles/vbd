import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {PageOrchestratorContext} from "../contexts/page-orchestrator-context";
import {observer} from "mobx-react";
import {VbdAnimation} from "../components/VbdAnimation";
import ShouldRender from "../components/ShouldRender";
import {FlipBook} from "../components/flip-book/FlipBook";
import {SpeakerMonologue} from "./SpeakerMonologue";
import { Trivia } from './Trivia';
import {Button} from "../components/Button";
import {toggleFullscreen} from "../utils/dom.utils";

const EntrypointContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #000;
`;

const StartButton = styled.button`

`;

const StartPage = observer(() => {
    const {start} = useContext(PageOrchestratorContext);
    const [isAnimating, setIsAnimating] = useState(false);

    const onStart = () => {
        // animate VBD
        setIsAnimating(true);
        toggleFullscreen(document.documentElement);
        // start();
    };

    const onAnimationEnd = () => {
        start();
    }

    return (
        <EntrypointContainer>
            <ShouldRender condition={!isAnimating}>
                <Button onClick={onStart} label={'Start'}/>
            </ShouldRender>
            <ShouldRender condition={isAnimating}>
                <VbdAnimation onFinish={onAnimationEnd} />
            </ShouldRender>
        </EntrypointContainer>
    );
});

export {StartPage}
