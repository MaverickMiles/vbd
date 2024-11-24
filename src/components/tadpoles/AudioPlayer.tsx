import styled from "styled-components";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ShouldRender from "../ShouldRender";
import {IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TadpoleAnimationController} from "./TadpoleAnimationController";
const audioUrl = require('../../assets/audio/at-your-best.mp3');

const Container = styled.div`
  color: white;
  position: fixed;
  top: 75px;
`;

interface Props {
    controller: TadpoleAnimationController;
}

export const AudioPlayer = (props: Props) => {
    const audioRef = props.controller.refController.audioRef;
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    return (
        <IconButton onClick={() => setIsPlaying(playing => !playing)}>
            <Container>
                <ShouldRender condition={isPlaying}>
                    <VolumeUpIcon color={'inherit'}/>
                </ShouldRender>
                <ShouldRender condition={!isPlaying}>
                    <VolumeOffIcon color={'inherit'}/>
                </ShouldRender>
            </Container>
            <audio src={audioUrl} ref={audioRef}/>
        </IconButton>
    )
}
