import {observer} from "mobx-react";
import {getPage, SupportedPage} from "../../metadata/pages.metadata";
import styled from "styled-components";
import {useIntersectionObserver} from "usehooks-ts";
import {useContext, useEffect} from "react";
import {PageOrchestratorContext} from "../../contexts/page-orchestrator-context";

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

interface PageProps {
    pageId: SupportedPage;
}

export const Page = observer((props: PageProps) => {
    const {pageId} = props;
    const metadata = getPage(pageId);
    const {setPage, activePage} = useContext(PageOrchestratorContext);
    const {View, state} = metadata;
    const {isIntersecting} = useIntersectionObserver({
        threshold: 70
    });

    useEffect(() => {
        if (isIntersecting && pageId !== activePage) {
            setPage(pageId);
        }
    }, [isIntersecting]);

    return (
        <PageContainer ref={state.ref}>
            <View/>
        </PageContainer>
    );
})