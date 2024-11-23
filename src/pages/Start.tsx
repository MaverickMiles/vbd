import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {PageOrchestratorContext} from "../contexts/page-orchestrator-context";
import {observer} from "mobx-react";
import {VbdAnimation} from "../components/VbdAnimation";
import ShouldRender from "../components/ShouldRender";
import {FlipBook} from "../components/flip-book/FlipBook";
import {SpeakerMonologue} from "./SpeakerMonologue";

const EntrypointContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.button`

`;

const StartPage = observer(() => {
    const {start} = useContext(PageOrchestratorContext);
    const [isAnimating, setIsAnimating] = useState(false);

    const onStart = () => {
        // animate VBD
        setIsAnimating(true);
        // start();
    };

    const onAnimationEnd = () => {
        start();
    }

    return (
        <EntrypointContainer>
            <ShouldRender condition={!isAnimating}>
                <StartButton onClick={onStart}>Start</StartButton>
            </ShouldRender>
            <ShouldRender condition={isAnimating}>
                <VbdAnimation onFinish={onAnimationEnd} />
            </ShouldRender>
        </EntrypointContainer>
    );
});

export {StartPage}
