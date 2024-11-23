import styled from "styled-components";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ShouldRender from "../ShouldRender";
import { IconButton } from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import playing = Simulate.playing;

const Container = styled.div`
  color: white;
`;

const audioUrl = `/theme-song.mp3`;

export const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

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
                    <VolumeOffIcon color={'inherit'}/>
                </ShouldRender>
                <ShouldRender condition={!isPlaying}>
                    <VolumeUpIcon color={'inherit'}/>
                </ShouldRender>
            </Container>
            <audio src={audioUrl} ref={audioRef}/>
        </IconButton>
    )
}