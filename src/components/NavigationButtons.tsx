import styled from "styled-components";
import {useContext} from "react";
import {PageOrchestratorContext} from "../contexts/page-orchestrator-context";
import {observer} from "mobx-react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: fixed;
  bottom: 8px;
  right: 8px;
  padding: 10px;
`;

const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  color: white;
`;

const NavigationButtons = observer(() => {
    const {previous, next} = useContext(PageOrchestratorContext);

    return (
        <Container>
            <Button onClick={previous}>
                <KeyboardArrowUpIcon />
            </Button>
            <Button onClick={next}>
                <KeyboardArrowDownIcon />
            </Button>
        </Container>
    );
});

export {NavigationButtons};