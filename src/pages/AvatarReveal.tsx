import React, {useEffect} from 'react';
import {ScrollIndicator} from "../components/ScrollIndicator";

import '../styles/speaker-introduction.css';
import {createParticles} from "../animations/particles.animation";
import styled from "styled-components";
import {Avatar} from '../components/Avatar';
import {motion} from 'framer-motion';

function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalHeight = windowHeight * 3; // Total height for all sections
    const scrollProgress = scrollPosition / (totalHeight - windowHeight);

    // Parallax background effect
    const parallaxBg = document.querySelector<HTMLElement>('.parallax-bg');
    if (!parallaxBg) return;
    parallaxBg.style.transform = `scale(${1.1 + (scrollProgress * 0.1)})`;

    // Calculate individual section progress
    const nameProgress = Math.max(0, Math.min(1, 2 - (scrollPosition / windowHeight) * 2));
    const dateProgress = Math.max(0, Math.min(1, 2 - Math.abs(1 - (scrollPosition / windowHeight)) * 2));
    const messageProgress = Math.max(0, Math.min(1, 2 - Math.abs(2 - (scrollPosition / windowHeight)) * 2));

    // Apply transitions to sections
    const nameContainer = document.querySelector<HTMLElement>('.name-container');
    if (!nameContainer) return;

    nameContainer.style.opacity = nameProgress.toString();
    nameContainer.style.transform = `translate3d(0, ${-50 + nameProgress * 50}%, 0)`;

    const dateContainer = document.querySelector<HTMLElement>('.date-container');
    if (!dateContainer) return;
    dateContainer.style.opacity = dateProgress.toString();
    dateContainer.style.transform = `translate3d(0, ${-50 + dateProgress * 50}%, 0)`;

    const messageContainer = document.querySelector<HTMLElement>('.message-container');
    if (!messageContainer) return;
    messageContainer.style.opacity = messageProgress.toString();
    messageContainer.style.transform = `translate3d(0, ${-50 + messageProgress * 50}%, 0)`;

    // Control particles opacity
    const particles = document.querySelector<HTMLElement>('.particles');
    if (!particles) return;
    particles.style.opacity = Math.min(1, scrollProgress * 2).toString();

    // Hide scroll indicator
    const scrollIndicator = document.querySelector<HTMLElement>('.scroll-indicator');
    if (!scrollIndicator) return;
    scrollIndicator.style.opacity = Math.max(0, 0.6 - scrollProgress * 2).toString();
}

const prefix = 'speaker-introduction';

const particlesContainer = `${prefix}-particles-container`;
const parallaxBgContainer = `${prefix}-parallax-bg`;

const _SpeakerIntroduction = () => {

    useEffect(() => {
        createParticles(`.${particlesContainer}`);
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
        }
    }, []);

    return (
        <div className={'page-container'}>
            <div className={parallaxBgContainer}/>
            <div className={particlesContainer}/>

            <div className="container">
                <div className="section" id="intro">
                    <div className="content">
                        <div className="name-container">
                            <h1 className="name">Veronica Tassew Woldehanna</h1>
                        </div>
                    </div>
                </div>

                <div className="section" id="date">
                    <div className="content">
                        <div className="date-container">
                            <div className="date">11.22.24</div>
                        </div>
                    </div>
                </div>

                <div className="section" id="message">
                    <div className="content">
                        <div className="message-container">
                            <div className="message">A day of celebration.</div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollIndicator/>
        </div>
    );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  justify-content: center;
`;

const NameContainer = styled.div`
  color: white;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const AvatarReveal = () => {

    return (
        <Container>
            <motion.div initial={{opacity: 0,}}
                        animate={{opacity: 1, scale: 1.5, x: 10}}
                        exit={{opacity: 0}}
                        transition={{duration: 4, easing: 'linear'}}>
                <Avatar/>
            </motion.div>
            <motion.div initial={{opacity: 0,}}
                        animate={{opacity: 1, scale: 1.5, x: 10}}
                        transition={{duration: 1, delay: 3, easing: 'easeInOut'}}>
                <NameContainer>Veronica Tassew Woldehanna</NameContainer>
            </motion.div>
        </Container>
    );
}
export {AvatarReveal};
