import {
    CardPage,
    CardPageProps,
    EmptyPage,
    PhotoPage,
    PromptSectionPage,
    TitleSectionPage
} from "../components/flip-book/PageVariants";
import {AllPages, Author, CustomPages, PageType} from "../models/book.model";
import {FunctionComponent} from "react";
import {BookCover} from "../components/flip-book/BookCover";

const authors: Author[] = [
    {
        id: 'kaleb',
        name: 'Kaleb',
    },
    {
        id: 'nicole',
        name: 'Nicole'
    },
    {
        id: 'rediet',
        name: 'Rediet',
    },
    {
        id: 'hanna',
        name: 'Hanna'
    }
];

const authorMap = Object.fromEntries(authors.map(it => ([it.id, it])));

const prompts = {
    memories: 'When you think of V, what memory always makes you smile?',
    impact: 'How has knowing V influenced or changed you over the years?'
}

const memoriesCards: Record<string, CardPageProps> = {
    kaleb: {
        text: 'Her incredibly picky eating habits 😂',
        author: authorMap.kaleb.name,
        textStyleOverrides: {textAlign: 'center'},
    },
    nicole: {
        text: 'Laughing hysterically during French class.',
        author: authorMap.nicole.name,
        textStyleOverrides: {textAlign: 'center'},
    },
    rediet: {
        text: 'When we were in college, we used to always love sharing food together. Whether it be going to the grocery store to grab ingredients every day during the pandemic to get some fresh air, ordering chicken from Domino’s or the grandma’s sandwich cookies from the vending machines  (there is a cute story that makes me smile behind this one too) . But the times I remember the most are when we would try to make brownies. We were both very adamant and excited to bake our own brownies so we would buy the box mix from the store and whip it up. So many attempts and so many failures. From runny mixes to rock solid brownies, we just never managed to get it right. But the effort was so funny and even funnier when we tried to cover up our attempts with store bought frosting. Regardless, I look back at those times with such joy. The grandma’s sandwich cookies were another tradition we had. Every time one of us was stressed or sad, the other one would get these $2 wafer cookies called Grandma’s sandwiches from the vending machines and present it as a token of support. I can never look at those cookies without thinking of V.',
        author: authorMap.rediet.name,
        textStyleOverrides: {
            fontSize: '11px',
        }
    }
}

const impactCards: Record<string, CardPageProps> = {
    nicole: {
        text: '',
        author: authorMap.nicole.name,
    }
}
const sections = {
    birthday_wishes: 'BIRTHDAY<br/>WISHES',
    moments: 'V MOMENTS'
}

const photos = {
    redietMemorySection: '/photos/v-rediet.png',
}

export const pages: AllPages[] = [
    {type: 'front_cover', props: {title: 'Book of V'}},
    {type: 'empty',}, {type: 'prompt', props: {text: prompts.memories}},
    {type: 'card', props: memoriesCards.kaleb}, {type: 'card', props: memoriesCards.nicole},
    {type: 'photo', props: {src: photos.redietMemorySection}}, {type: 'card', props: memoriesCards.rediet},
    {type: 'empty',}, {type: 'prompt', props: {text: prompts.impact}},
    {type: 'photo', props: {src: ''}}, {type: 'card', props: impactCards.nicole},
    {type: 'empty'}
];

export const pageViewMap: Record<PageType, FunctionComponent<any>> = {
    back_cover: BookCover,
    card: CardPage,
    empty: EmptyPage,
    front_cover: BookCover,
    photo: PhotoPage,
    prompt: PromptSectionPage,
    section: TitleSectionPage,
}