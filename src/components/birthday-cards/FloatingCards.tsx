import {observer, useLocalObservable} from "mobx-react";
import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {FloatingCardsController, ICardMessage} from "./FloatingCardsController";
import {IconButton} from "@mui/material";
import ShouldRender from "../ShouldRender";
import {ScrollLockContext} from "../../contexts/scroll-lock-context";


const messages: ICardMessage[] = [
    {
        id: '1',
        name: "Sarah",
        message: "Happy birthday bestie! Here's to another year of amazing adventures together. You make every moment brighter!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: '2',
        name: "Mike",
        message: "Wishing you the most magical birthday ever! Can't wait to celebrate with you. You deserve all the happiness!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: '3',
        name: "Emma",
        message: "Remember when we couldn't stop laughing at the beach? Here's to making more unforgettable memories! Love you!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: '4',
        name: "Alex",
        message: "Happy birthday to my partner in crime! May this year bring you endless joy and success. Let's make it count!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: '5',
        name: "James",
        message: "Here's to another year of being awesome! Thanks for being such a great friend through thick and thin.",
        imageUrl: "/api/placeholder/400/300"
    }
];

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavButtonContainer = styled.div<{ isLeft: boolean }>`
  background: white;
  color: black;
  border-radius: 50%;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({isLeft}) => isLeft ? `left: 50px;` : `right: 50px;`}
`

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #333;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;


const FloatingCardContainer = styled.div<{
    $x: number;
    $y: number;
    $selected: boolean;
    $dimmed: boolean;
    $rotation: number;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => !props.$selected && `translate(calc(-50% + ${props.$x}px), calc(-50% + ${props.$y}px)) 
       rotate(${props.$rotation}deg) scale(0.6)`
  };
  opacity: ${props => props.$dimmed ? 0.4 : 1};
  z-index: ${props => props.$selected ? 50 : 1};

  &:hover {
    opacity: ${props => props.$dimmed ? 0.6 : 1};
  }
`;

const CollapsedCard = styled.div`
  width: 180px;
  height: 250px;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const OpenCard = styled.div<{ $isOpen: boolean }>`
  width: min(500px, 90vw);
  height: min(700px, 80vh);
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: ${props => props.$isOpen ? 'scale(1)' : 'scale(0)'};
  transform-origin: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
`;

const OpenCardInner = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity 0.3s ease 0.3s;
  padding: 2rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: #333;
  margin-bottom: 1rem;
`;

const CardMessage = styled.p`
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  line-height: 1.6;
  color: #333;
  font-style: italic;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const Signature = styled.div`
  text-align: right;
  margin-top: 1rem;

  span {
    color: #666;
  }

  p {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    color: #333;
    margin-top: 0.5rem;
  }
`;

const CollapsedCardContent = styled.div`
  span:first-child {
    font-size: 1.25rem;
    display: block;
  }

  span:last-child {
    font-size: 0.875rem;
    color: #999;
    margin-top: 0.25rem;
    display: block;
  }
`;

const FloatingCards = observer(() => {
    const state = useLocalObservable(() => new FloatingCardsController(messages));
    const {lock, unlock} = useContext(ScrollLockContext);
    const {cards, animate, selectedCard, resetCardPositions, onCardOpen, onCardClose, cardMap, containerRef} = state;

    useEffect(() => {
        if (selectedCard) {
            lock();
        } else {
            unlock();
        }
    }, [selectedCard]);

    useEffect(() => {
        resetCardPositions();
        // animate();
        // const interval = setInterval(animate, 50);
        window.addEventListener('resize', resetCardPositions);
        return () => {
            window.removeEventListener('resize', resetCardPositions);
            // clearInterval(interval);
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <CardWrapper>
                {messages.map((msg) => (
                    <FloatingCardContainer
                        key={msg.id}
                        onClick={() => onCardOpen(msg.id)}
                        $selected={Boolean(selectedCard?.id === msg.id)}
                        $dimmed={Boolean(selectedCard && selectedCard.id !== msg.id)}
                        $x={cardMap[msg.id]?.x}
                        $y={cardMap[msg.id]?.y}
                        $rotation={cardMap[msg.id]?.rotation}
                    >
                        {selectedCard?.id === msg.id ? (
                            <OpenCard $isOpen={true}>
                                <CloseButton onClick={onCardClose}>
                                    <CloseIcon/>
                                </CloseButton>
                                <OpenCardInner $isOpen={true}>
                                    <CardImage
                                        src={msg.imageUrl}
                                        alt={`${msg.name}'s birthday wish`}
                                    />
                                    <CardContent>
                                        <CardTitle>From {msg.name}</CardTitle>
                                        <CardMessage>{msg.message}</CardMessage>
                                        <Signature>
                                            <span>With love,</span>
                                            <p>{msg.name}</p>
                                        </Signature>
                                    </CardContent>
                                </OpenCardInner>
                            </OpenCard>
                        ) : (
                            <CollapsedCard>
                                <CollapsedCardContent>
                                    <span>{msg.name}'s</span>
                                    <span>Birthday Wish</span>
                                </CollapsedCardContent>
                            </CollapsedCard>
                        )}
                    </FloatingCardContainer>
                ))}
                <ShouldRender condition={Boolean(selectedCard)}>
                    <NavButtonContainer isLeft={true}>
                        <IconButton onClick={() => state.navigateCards('prev')}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </NavButtonContainer>
                    <NavButtonContainer isLeft={false}>
                        <IconButton onClick={() => state.navigateCards('next')}>
                            <ChevronRightIcon/>
                        </IconButton>
                    </NavButtonContainer>
                </ShouldRender>
            </CardWrapper>
        </Container>
    )
});

export {FloatingCards};