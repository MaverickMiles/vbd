import React, {useState} from 'react';
import {Tadpoles} from '../components/tadpoles/Tadpoles';
import styled from "styled-components";

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
        <Tadpoles/>
    );
};

export {SpeakerMonologue};
