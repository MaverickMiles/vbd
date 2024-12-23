import React from 'react';
import {FlipBook} from "../components/flip-book/FlipBook";
import styled from "styled-components";
import { Slider } from '@mui/material';

const Container = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
`;

const Trivia = () => {
    return (
        <Container>
            <FlipBook />
        </Container>
    );
};

export {Trivia};
