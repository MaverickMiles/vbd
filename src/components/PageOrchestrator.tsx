import {PageOrchestratorContext} from "../contexts/page-orchestrator-context";
import {NavigationButtons} from "./NavigationButtons";
import React from "react";
import {observer, useLocalObservable} from "mobx-react";
import {PageOrchestratorState, pageOrder} from "../state/PageOrchestratorState";
import {StartPage} from "../pages/Start";
import styled from "styled-components";
import ShouldRender from "./ShouldRender";
import {ScrollLockContext} from "../contexts/scroll-lock-context";
import {Page} from "./page-orchestrator/Page";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 80vh;
  background: black;
`;

const containerId = 'scrollable';

const PageOrchestrator = observer(() => {
    const state = useLocalObservable(() => new PageOrchestratorState());

    return (
        <PageOrchestratorContext.Provider value={state}>
            <ScrollLockContext.Provider value={state}>
                <Container ref={state.scrollContainerRef}>
                    <ShouldRender condition={state.isStarted} fallback={StartPage}>
                        {
                            pageOrder.map((pageId) => (<Page pageId={pageId}/>))
                        }
                        {/*<NavigationButtons/>*/}
                    </ShouldRender>
                </Container>
                {/*<End/>*/}
            </ScrollLockContext.Provider>
        </PageOrchestratorContext.Provider>
    );
});

export {PageOrchestrator};