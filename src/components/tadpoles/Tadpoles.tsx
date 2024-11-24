import React, {useContext, useEffect} from 'react';
import styled from "styled-components";

import {TadpoleAnimationController} from "./TadpoleAnimationController";
import ShouldRender from "../ShouldRender";
import {observer, useLocalObservable} from "mobx-react";
import {AvatarReveal} from "../../pages/AvatarReveal";
import {ScrollIndicator} from "../ScrollIndicator";
import {AnimatedParagraph} from "../AnimatedParagraph";
import {inceptionParagraphs, postInceptionParagraphs} from "../../metadata/monologue.metadata";
import {AnimatePresence, motion} from 'framer-motion';

import "./tadpoles.style.css";
import {AudioPlayer} from "./AudioPlayer";
import {Button} from '../Button';
import {useIntersectionObserver} from "usehooks-ts";
import {ScrollLockContext} from "../../contexts/scroll-lock-context";

const BackdropFilter = styled.div`
  background: linear-gradient(180deg, rgba(23, 22, 22, 0) 0%, rgba(23, 22, 22, 1) 100%);
  position: absolute;
  width: 100%;
  height: 25%;
  pointer-events: none;
  z-index: 5;
  left: 0;
`;


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  z-index: 2;
`

const ScrollableContent = styled.div`
  width: 100%;
  position: relative;
`;

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
  pointer-events: none;
  //background-color: black;
  //top: 50%;
  //transform: translateY(50%);
`

const EggContainer = styled.div`
  height: 300vh;
  position: relative;
`;

const EggInnerContainer = styled.div`
  //position: relative;
  //height: 294px;
  //width: 300px;
`
const EggContainerContent = styled.div<{ readyForTransition?: boolean }>`
  position: absolute;
  bottom: 40vh;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
`;

const AudioPlayerContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
  z-index: 999;
`;

const SkipButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
  z-index: 999;
`;

const Egg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="164" height="152" viewBox="0 0 164 152" fill="none">
            <ellipse cx="82" cy="76" rx="82" ry="76" fill="url(#paint0_linear_60_28)"/>
            <defs>
                <linearGradient id="paint0_linear_60_28" x1="82" y1="0" x2="82" y2="152"
                                gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D9D9D9"/>
                    <stop offset="0.335" stop-color="#B7B7B7" stop-opacity="0.665"/>
                    <stop offset="1" stop-color="#737373" stop-opacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    )
};

const EggLight = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="164" height="152" viewBox="0 0 164 152" fill="none">
            <ellipse cx="82" cy="76" rx="82" ry="76" fill="url(#paint0_radial_68_54)"/>
            <ellipse cx="82" cy="76" rx="82" ry="76" fill="url(#paint1_radial_68_54)"/>
            <ellipse cx="87" cy="68" rx="41" ry="42" fill="url(#paint2_radial_68_54)"/>
            <defs>
                <radialGradient id="paint0_radial_68_54" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(82 76) rotate(90) scale(76 82)">
                    <stop stop-color="#FFD700" stop-opacity="0.8"/>
                    <stop offset="1" stop-color="#FFD700" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="paint1_radial_68_54" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(82 76) rotate(90) scale(76 82)">
                    <stop stop-color="#FFD700" stop-opacity="0.8"/>
                    <stop offset="1" stop-color="#FFD700" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="paint2_radial_68_54" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(87 68) rotate(90) scale(42 41)">
                    <stop stop-color="#FFD700" stop-opacity="0.8"/>
                    <stop offset="1" stop-color="#FFD700" stop-opacity="0"/>
                </radialGradient>
            </defs>
        </svg>
    );
}


const EndDetector = styled.div`
  width: 20px;
  height: 20px;
  background: transparent;
  position: absolute;
  bottom: 0;
`;

interface Props {
    // onFinish: (isDone: boolean) => void;
}


const Tadpoles = observer((props: Props) => {
    const controller = useLocalObservable(() => new TadpoleAnimationController());
    const scrollProgress = controller.scrollProgress ?? 0;
    const {
        canvasContainerRef,
        canvasRef,
        contentFrameRef,
        scrollableContentRef,
        eggRef,
        eggLightRef,
        eggContainerRef,
        avatarRef,
        endDetectorRef
    } = controller.refController;
    const {isIntersecting, ref} = useIntersectionObserver(
        {root: contentFrameRef.current, threshold: 1}
    )
    const showScrollIndicator = scrollProgress < 0.8 || (scrollProgress > 0.9 && (controller.transitionState === 'REVEALED'));
    const {lock, unlock} = useContext(ScrollLockContext);

    useEffect(() => {
        const {start, stop} = controller;
        start();

        onWindowResize();
        window.addEventListener('resize', onWindowResize);
        return () => {
            stop();
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    useEffect(() => {
        console.log({EOF: controller.EOF});
        if (controller.EOF) {
            console.log("Calling unlock");
            unlock();
        } else {
            lock();
        }
    }, [controller.EOF]);

    const onWindowResize = () => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }

    const onEggLightClick = () => {
        // if (!isTransitioning) return;
        // console.log('Ready for Transition');
        // setShowAvatar(true);
    }

    // todo: fix scroll behavior of second scroll content
    // apparently relative impacts the scrollability of an element

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 4, easing: 'easeInOut'}}>
            <Container>
                <CanvasContainer ref={canvasContainerRef}>
                    <canvas ref={canvasRef}/>
                </CanvasContainer>
                <div className={'monologue-frame'}>
                    <ContentContainer onScroll={controller?.scrollEventListener} ref={contentFrameRef}>
                        <ScrollableContent ref={scrollableContentRef}>
                            <div style={{paddingBlock: '20vh'}}>
                                <motion.div initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{ease: 'easeInOut', duration: 3}}>
                                    <AnimatedParagraph paragraphs={inceptionParagraphs} controller={controller}/>
                                </motion.div>
                            </div>
                            <EggContainer ref={eggContainerRef}>
                                {/*<EggInnerContainer>*/}
                                <EggContainerContent ref={eggRef}>
                                    <Egg/>
                                </EggContainerContent>
                                <EggContainerContent ref={eggLightRef}>
                                    <AnimatePresence>
                                        {['ABSORBING', 'REVEALING'].some(state => state === controller?.transitionState) &&
                                            <motion.div animate={{opacity: 1}} exit={{opacity: 0}}
                                                        transition={{duration: 2, easing: 'linear'}}>
                                                <EggLight/>
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                </EggContainerContent>
                                <EggContainerContent ref={avatarRef}>
                                    <ShouldRender condition={controller?.transitionState === 'REVEALED'}>
                                        <AvatarReveal/>
                                    </ShouldRender>
                                </EggContainerContent>
                                {/*</EggInnerContainer>*/}
                            </EggContainer>
                        </ScrollableContent>
                        <ShouldRender condition={controller?.transitionState === 'REVEALED'}>
                            <ScrollableContent style={{paddingBlock: '40vh'}}>
                                <AnimatedParagraph paragraphs={postInceptionParagraphs} controller={controller}/>
                                <EndDetector ref={endDetectorRef}></EndDetector>
                            </ScrollableContent>
                        </ShouldRender>
                    </ContentContainer>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                transition={{duration: 2, delay: 3, easing: 'easeInOut'}}>
                        <ScrollIndicator condition={showScrollIndicator}/>
                    </motion.div>
                    <AudioPlayerContainer>
                        <AudioPlayer controller={controller}/>
                    </AudioPlayerContainer>
                    <SkipButtonContainer>
                        <ShouldRender
                            condition={controller.revealedAtLeastOnce && controller.transitionState === 'ABSORBING' || controller.transitionState === 'REVEALING'}>
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                        transition={{duration: 2, easing: 'easeInOut'}}>
                                <Button onClick={controller.skipRevealAnimation} label={'Skip'}/>
                            </motion.div>
                        </ShouldRender>
                    </SkipButtonContainer>
                </div>
            </Container>
        </motion.div>
    );
});

export {Tadpoles};
