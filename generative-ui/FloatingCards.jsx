import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import styled from 'styled-components';

const messages = [
    {
        id: 1,
        name: "Sarah",
        message: "Happy birthday bestie! Here's to another year of amazing adventures together. You make every moment brighter!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: 2,
        name: "Mike",
        message: "Wishing you the most magical birthday ever! Can't wait to celebrate with you. You deserve all the happiness!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: 3,
        name: "Emma",
        message: "Remember when we couldn't stop laughing at the beach? Here's to making more unforgettable memories! Love you!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: 4,
        name: "Alex",
        message: "Happy birthday to my partner in crime! May this year bring you endless joy and success. Let's make it count!",
        imageUrl: "/api/placeholder/400/300"
    },
    {
        id: 5,
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

const FloatingCardContainer = styled.div`
  position: absolute;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$selected
    ? 'translate(-50%, -50%) scale(1)'
    : `translate(calc(-50% + ${props.$x}px), calc(-50% + ${props.$y}px)) 
       rotate(${props.$rotate}deg) scale(0.6)`
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

const OpenCard = styled.div`
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
`;

const OpenCardInner = styled.div`
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

const FloatingBirthdayCards = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [positions, setPositions] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const updatePositions = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const safeRadius = Math.min(rect.width, rect.height) * 0.25;
            const newPositions = {};

            messages.forEach((msg, index) => {
                const angle = (index / messages.length) * 2 * Math.PI - Math.PI / 2;
                newPositions[msg.id] = {
                    x: safeRadius * Math.cos(angle),
                    y: safeRadius * Math.sin(angle),
                    rotate: Math.random() * 10 - 5
                };
            });
            setPositions(newPositions);
        };

        updatePositions();
        window.addEventListener('resize', updatePositions);
        return () => window.removeEventListener('resize', updatePositions);
    }, []);

    useEffect(() => {
        if (selectedCard) return;

        const interval = setInterval(() => {
            setPositions(prev => {
                const newPositions = { ...prev };
                Object.keys(newPositions).forEach(id => {
                    const pos = prev[id];
                    const maxDelta = 0.5;
                    newPositions[id] = {
                        x: pos.x + (Math.random() * maxDelta - maxDelta/2),
                        y: pos.y + (Math.random() * maxDelta - maxDelta/2),
                        rotate: pos.rotate + (Math.random() * 0.2 - 0.1)
                    };
                });
                return newPositions;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [selectedCard]);

    const handleCardClick = (card) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSelectedCard(card);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsCardOpen(true);
                setTimeout(() => setIsAnimating(false), 600);
            });
        });
    };

    const handleClose = (e) => {
        e.stopPropagation();
        if (isAnimating) return;
        setIsAnimating(true);
        setIsCardOpen(false);
        setTimeout(() => {
            setSelectedCard(null);
            setIsAnimating(false);
        }, 600);
    };

    return (
        <Container ref={containerRef}>
            <CardWrapper>
                {messages.map((msg) => (
                    <FloatingCardContainer
                        key={msg.id}
                        onClick={() => !selectedCard && handleCardClick(msg)}
                        $selected={selectedCard?.id === msg.id}
                        $dimmed={selectedCard && selectedCard.id !== msg.id}
                        $x={positions[msg.id]?.x}
                        $y={positions[msg.id]?.y}
                        $rotate={positions[msg.id]?.rotate}
                        ref={cardMap[msg.id].ref}
                    >
                        {selectedCard?.id === msg.id ? (
                            <OpenCard $isOpen={isCardOpen}>
                                <CloseButton onClick={handleClose}>
                                    <X size={24} />
                                </CloseButton>

                                <OpenCardInner $isOpen={isCardOpen}>
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
            </CardWrapper>
        </Container>
    );
};

export default FloatingBirthdayCards;