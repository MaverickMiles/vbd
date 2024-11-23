import styled from "styled-components";
import {useContext} from "react";
import {PageOrchestratorContext} from "../contexts/page-orchestrator-context";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const End = () => {
    const {end} = useContext(PageOrchestratorContext);

    return (
        <Container>
            <button onClick={end}>End</button>
        </Container>
    )
}

export {End};