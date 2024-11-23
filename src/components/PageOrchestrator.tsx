import {PageOrchestratorContext} from "../contexts/page-orchestrator-context";
import {NavigationButtons} from "./NavigationButtons";
import React from "react";
import {observer, useLocalObservable} from "mobx-react";
import {PageOrchestratorState, pageOrder} from "../state/PageOrchestratorState";
import {StartPage} from "../pages/Start";
import styled from "styled-components";
import ShouldRender from "./ShouldRender";
import {End} from "../pages/End";
import {useScrollLock} from "usehooks-ts";
import {ScrollLockContext} from "../contexts/scroll-lock-context";
import {Page} from "./page-orchestrator/Page";
import {AvatarReveal} from "../pages/AvatarReveal";
import { VbdAnimation } from "./VbdAnimation";
import { Trivia } from "../pages/Trivia";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: scroll;
`;

const containerId = 'scrollable';

const PageOrchestrator = observer(() => {
    const state = useLocalObservable(() => new PageOrchestratorState());
    const scrollLockProvider = useScrollLock({
        autoLock: false,
        lockTarget: `#${containerId}`,
    });

    return (
        <PageOrchestratorContext.Provider value={state}>
            <ScrollLockContext.Provider value={scrollLockProvider}>
                <Container id={'scrollable'}>
                    <ShouldRender condition={state.isStarted} fallback={StartPage}>
                        {
                            pageOrder.map((pageId) => (<Page pageId={pageId}/>))
                        }
                        <End/>
                        <NavigationButtons/>
                    </ShouldRender>
                </Container>
            </ScrollLockContext.Provider>
        </PageOrchestratorContext.Provider>
    );
});

export {PageOrchestrator};