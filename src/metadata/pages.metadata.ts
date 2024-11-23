import {FunctionComponent, RefObject} from "react";
import _ from "lodash";
import {BirthdayWishes} from "../pages/BirthdayWishes";
import {SpeakerMonologue} from "../pages/SpeakerMonologue";
import {Spider} from "../pages/Spider";
import {Trivia} from "../pages/Trivia";
import {PageController} from "../components/page-orchestrator/PageController";

export type SupportedPage = 'monologue' | 'trivia' | 'birthday_wishes' | 'spider';

export interface PageState {
    readonly ref: RefObject<HTMLElement>;

    run(): void;

    restart(): void;

    scrollIntoView(): void;
}

export interface PageMetadata {
    View: FunctionComponent;
    state: PageController;
}

export const supportedPages: Record<SupportedPage, PageMetadata> = {
    monologue: {
        View: SpeakerMonologue,
        state: new PageController()
    },
    birthday_wishes: {
        View: BirthdayWishes,
        state: new PageController()
    },
    trivia: {
        View: Trivia,
        state: new PageController()
    },
    spider: {
        View: Spider,
        state: new PageController()
    },
}

export function getPage(pageId: string): PageMetadata {
    return _.get(supportedPages, pageId);
}
