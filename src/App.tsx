import React from 'react';
import './App.css';
import styled from "styled-components";
import {PageOrchestrator} from "./components/PageOrchestrator";

const AppContainer = styled.div`
  text-align: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
    return (
        <AppContainer>
            <PageOrchestrator/>
        </AppContainer>
    );
}

export default App;
