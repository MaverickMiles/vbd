import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import {observer, useLocalObservable} from "mobx-react";
import {FlipBookController} from "./FlipBookController";
import {pages, pageViewMap} from "../../metadata/book.metadata";
import {Slider, Tooltip} from "@mui/material";

import "../../styles/slider.css";
import { motion } from 'framer-motion';


const PageContainer = styled.div<{ direction: 'left' | 'right' }>`
  //background: rgba(42, 42, 42, 0.8);
  //color: white;

  ${({direction}) => direction === 'right' ? `
    border-right: 0;
    box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 1);
  ` : `
    border-left: 0;
    box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 1);
    border-left: 2px solid rgba(42, 42, 42, 0.8);
  `}
`;


const width = 461;
const height = 600;

const Container = styled.div`

`;

const FlipBookContainer = styled.div<{ autoCenter: boolean, isStart: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  will-change: transform;
  transition: transform 1s ease-in-out;
  ${({autoCenter, isStart}) => autoCenter && `
        transform: translateX(${(isStart ? -1 : 1) * width / 2}px);
  `}
`

const SliderContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 80%;
  max-width: 900px;
  padding: 10px;
`;

const useAutoCenter = (controller: FlipBookController) => {
    const ref = useRef<HTMLDivElement>(null);
    return {
        ref
    };
}

const numOfPages = 10;

interface Props {
    controller: FlipBookController;
}

const Flipper = observer((props: Props) => {
    const {controller} = props;
    const {isCover, sliderMarks, pageNumber, numOfPages, onSliderChange} = controller;

    return (
        //     @ts-ignore
        <HTMLFlipBook width={width}
                      height={height}
                      ref={controller.ref}
                      minHeight={height} minWidth={width} maxHeight={height} maxWidth={width}
                      drawShadow={false}
                      maxShadowOpacity={0.5}
                      showCover={true} showPageCorners={true} size={'stretch'}
                      onFlip={controller.onFlip}
                      onUpdate={controller.onUpdate}
                      onChangeState={controller.onChangeState}
        >
            {
                pages.map((page, index) => {
                    const PageView = pageViewMap[page.type];
                    const props = "props" in page ? page.props : {};
                    return (
                        <PageContainer direction={index % 2 === 0 ? 'left' : 'right'}>
                            <PageView {...props} />
                        </PageContainer>
                    );
                })
            }
        </HTMLFlipBook>
    );
});

const FlipBook = observer(() => {
    const controller = useLocalObservable(() => new FlipBookController());
    const ref = useRef<HTMLDivElement>(null);
    const {isCover, sliderMarks, pageNumber, numOfPages, onSliderChange} = controller;
    const sliderSteps = 1 + 1 + (numOfPages - 2) / 2;
    const currentSlideStep = pageNumber === 0 ? 0 : pageNumber === numOfPages - 1 ? sliderSteps - 1 :
        (pageNumber % 2 === 1 ? pageNumber + 1 : pageNumber) / 2;

    useEffect(() => {

    }, [pageNumber])
    return (
        <>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 4, easing: 'linear'}}>
                <FlipBookContainer ref={ref} autoCenter={isCover} isStart={pageNumber === 0}>
                    <Flipper controller={controller}/>
                </FlipBookContainer>
                <SliderContainer>
                    <Tooltip title={'Drag Slider to desired location'} slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -14],
                                    },
                                },
                            ],
                        },
                    }}>
                <span>
                <Slider
                    defaultValue={pageNumber}
                    value={pageNumber}
                    max={numOfPages - 1}
                    onChange={onSliderChange}
                />
                    </span>
                    </Tooltip>
                </SliderContainer>
            </motion.div>
        </>
    );
});

export {FlipBook};
