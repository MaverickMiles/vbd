import {CardPageProps, PageProps, PhotoPageProps} from "../components/flip-book/PageVariants";
import {BookCoverProps} from "../components/flip-book/FrontBookCover";

export type PageType = 'front_cover' | 'back_cover' | 'empty' | 'section' | 'prompt' | 'card' | 'photo';

export interface Page {
    type: PageType;
}

export interface FrontCoverPage extends Page {
    props: BookCoverProps;
}

export interface SectionPage extends Page {
    props: PageProps;
}

export interface PromptPage extends Page {
    props: PageProps;
}

export interface CardPage extends Page {
    props: CardPageProps;
}

export interface PhotoPage extends Page {
    props: PhotoPageProps;
}

export type CustomPages = FrontCoverPage | PromptPage | SectionPage | CardPage | PhotoPage;
export type AllPages = Page | CustomPages

export interface Author {
    id: string;
    name: string;
}
