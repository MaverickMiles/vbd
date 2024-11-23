import React, {useState} from 'react';
import __scrollFadeText from "../components/__scroll-fade-text";
import {Tadpoles} from '../components/tadpoles/Tadpoles';
import styled from "styled-components";
import ShouldRender from '../components/ShouldRender';

const Container = styled.div`
    
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const SpeakerMonologue = () => {
    const [showPrologue, setShowPrologue] = useState(false);
    return (
        <>
            <ContentContainer>
                <Tadpoles />
            </ContentContainer>
        </>
    );
};

export {SpeakerMonologue};
