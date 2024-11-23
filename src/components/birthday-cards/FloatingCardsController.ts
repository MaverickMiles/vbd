import {action, makeAutoObservable} from "mobx";
import {createRef, RefObject} from "react";
import _ from "lodash";

interface ICardMessage {
    id: string;
    name: string;
    message: string;
    imageUrl: string;
}

class FloatingCard {
    x: number = 0;
    y: number = 0;
    rotation: number = 0;
    controller: FloatingCardsController;
    ref: RefObject<HTMLDivElement> = createRef();
    message: ICardMessage;

    constructor(message: ICardMessage, controller: FloatingCardsController) {
        makeAutoObservable(this, {}, {autoBind: true});
        this.message = message;
        this.controller = controller;
    }

    get id() {
        return this.message.id;
    }

    get isSelected() {
        return this === this.controller.selectedCard;
    }

    updatePosition(x: number, y: number, rotation: number) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }

    animate() {
        const elem = this.ref.current;
        if (!elem || this.isSelected) return;
        // elem.style.transform = `translate(calc(-50% + ${this.x}px), calc(-50% + ${this.y}px)) rotate(${this.rotation}deg) scale(0.6)`;
    }
}

class FloatingCardsController {
    isAnimating: boolean = false;
    cardMap: Record<string, FloatingCard> = {};
    selectedCard: FloatingCard | null = null;
    containerRef: RefObject<HTMLDivElement> = createRef();

    constructor(cardMessages: ICardMessage[]) {
        makeAutoObservable(this, {}, {autoBind: true});
        this.createCards(cardMessages);
    }

    private createCards(cardMessages: ICardMessage[]) {
        cardMessages.forEach((card) => {
            this.cardMap[card.id] = new FloatingCard(card, this);
        });
    }

    get cards() {
        return Object.values(this.cardMap);
    }

    get cardCount() {
        return this.cards.length;
    }

    resetCardPositions() {
        const container = this.containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const safeRadius = Math.min(rect.width, rect.height) * 0.25;

        this.cards.forEach((card, idx) => {
            // explain this part
            const angle = (idx / this.cardCount) * 2 * Math.PI - Math.PI / 2;
            card.updatePosition(
                safeRadius * Math.cos(angle),
                safeRadius * Math.sin(angle) + 75,
                0
            );
            card.animate();
        });
    }

    setSelectedCard(card: FloatingCard | null) {
        this.selectedCard = card;
    }

    onCardOpen(cardId: string) {
        if (this.isAnimating) return;
        const card = _.find(this.cards, c => c.id === cardId);
        if (!card) return;
        this.callWithAnimation(() => {
            this.containerRef.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
            this.setSelectedCard(card);
        });
    }

    onCardClose() {
        if (this.isAnimating) return;
        this.callWithAnimation(() => this.setSelectedCard(null));
    }

    navigateCards(direction: 'next' | 'prev') {
        const selectedCard = this.selectedCard;
        if (this.isAnimating || !selectedCard) return;
        const currentIndex = _.findIndex(this.cards, c => c.id === selectedCard.id);
        let nextIndex;

        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % this.cardCount;
        } else {
            nextIndex = (currentIndex - 1 + this.cardCount) % this.cardCount;
        }
        this.callWithAnimation(action(() => {

        }))
        this.setIsAnimating(true);
        this.selectedCard = this.cards[nextIndex];
    }

    callWithAnimation(func: () => void) {
        this.setIsAnimating(true);
        func();
        setTimeout(() => this.setIsAnimating(false), 500);
    }

    setIsAnimating(isAnimating: boolean) {
        this.isAnimating = isAnimating;
    }

    animate() {
        this.cards.forEach(card => {
            const {x, y, rotation} = card;
            const maxDelta = 5;
            card.updatePosition(
                x + (Math.random() * maxDelta - maxDelta / 2),
                y + (Math.random() * maxDelta - maxDelta / 2),
                rotation + (Math.random() * 0.2 - 0.1)
            );
            card.animate();
        });

    }
}

export type {ICardMessage};
export {FloatingCardsController, FloatingCard};

