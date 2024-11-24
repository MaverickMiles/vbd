import {
    CardPage,
    CardPageProps,
    EmptyPage,
    PhotoPage,
    PromptSectionPage,
    TitleSectionPage
} from "../components/flip-book/PageVariants";
import {AllPages, Author, PageType} from "../models/book.model";
import {FunctionComponent} from "react";
import {FrontBookCover} from "../components/flip-book/FrontBookCover";
import {BackCover} from "../components/flip-book/BackCover";

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
    }, {
        id: 'hermi',
        name: 'Hermi'
    }, {
        id: 'achie',
        name: 'Achie'
    }, {
        id: 'yishak',
        name: 'YMK'
    }, {
        id: 'milo',
        name: 'Milo W.'
    },
    {
        id: 'eric',
        name: 'Eric',
    },
    {
        id: 'spider',
        name: '',
    },
    {
        id: 'VM269',
        name: 'V.M269',
    },
    {
        id: 'VM270',
        name: 'V.M270',
    },
    {
        id: 'VM271',
        name: 'V.M271',
    },
    {
        id: 'VM272',
        name: 'V.M272',
    },
];

const authorMap = Object.fromEntries(authors.map(it => ([it.id, it])));

const sections = {
    birthday_wishes: 'BIRTHDAY\nWISHES',
    moments: 'V MOMENTS',
    from_v_to_v: 'FROM V\nTO V',
    discover_more: 'DiSCOVER\nMORE',
    author_name: 'VERONICA T.\nWOLDEHANNA'
}

const photos = {
    redietMemorySection: '/photos/v-rediet-memory.png',
    nicoleImpactSection: '/photos/v-nicole-impact.png',
    redietImpactSection: '/photos/v-rediet-impact.png',
    kalebImpactSection: '/photos/v-kaleb-impact.png',
    achieImpactSection: '/photos/v-achie-impact.png',
    hermiImpactSection: '/photos/v-hermi-impact.png',
    miloBirthdayPhoto: '/photos/v-milo-bday-photo.png',
    hermiBirthdayPhoto: '/photos/v-hermi-bday-photo.png',
    redietBirthdayPhoto: '/photos/v-rediet-bday-photo.png',
    achieBirthdayPhoto: '/photos/v-achie-bday-photo.png',
    nicoleBirthdayPhoto: '/photos/v-nicole-bday-photo.png',
    hannaBirthdayPhoto: '/photos/v-hanna-bday-photo.png',
    ericBirthdayPhoto: '/photos/eric.png',
    spiderBirthdayPhoto: '/photos/spider.png',
    VM269BirthdayPhoto: '/photos/VM269.png',
    VM270BirthdayPhoto: '/photos/VM270.png',
    VM271BirthdayPhoto: '/photos/VM271.png',
    VM272BirthdayPhoto: '/photos/VM272.png',
    backCoverPhoto: '/photos/back-cover.svg',
    damon: '/photos/damon.png',
}

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
        text: `
                When we were in college, we used to always love sharing food together. Whether it be going to the grocery store to grab ingredients every day during the pandemic to get some fresh air, ordering chicken from Domino’s or the grandma’s sandwich cookies from the vending machines  (there is a cute story that makes me smile behind this one too) . But the times I remember the most are when we would try to make brownies. We were both very adamant and excited to bake our own brownies so we would buy the box mix from the store and whip it up. So many attempts and so many failures. From runny mixes to rock solid brownies, we just never managed to get it right. But the effort was so funny and even funnier when we tried to cover up our attempts with store bought frosting. Regardless, I look back at those times with such joy. The grandma’s sandwich cookies were another tradition we had. Every time one of us was stressed or sad, the other one would get these $2 wafer cookies called Grandma’s sandwiches from the vending machines and present it as a token of support. I can never look at those cookies without thinking of V.
        `,
        author: authorMap.rediet.name,
        textStyleOverrides: {
            fontSize: '11px',
            textAlign: 'start',
        }
    },
    achie: {
        text: `
All the drunk times of us dancing together. 
Some form of falling is always involved😂
            `,
        author: authorMap.achie.name
    },
    yishak: {
        text: `
I was not expecting more things to write, 
what is this! Outraged!
            `,
        author: authorMap.yishak.name
    },
    hanna: {
        text: `
Her lil pace-arounds in a ~4 feet radius circle while trying to think/decide on things
            `,
        author: authorMap.hanna.name
    },
    hermi: {
        text: `
Too many to count but the one that always gets me smiling is 2013-2016 V’s unhealthy crush/obsession with Damon Salvatore
            `,
        author: authorMap.hermi.name
    }
}

const impactCards: Record<string, CardPageProps> = {
    nicole: {
        text: `
I still remember how easy it was to fall into our friendship from the day we met :) 

We had a vibe and I remember just knowing that we'd be lifelong friends. 

I have been involved in a lot of discussions about the purpose of life over the years! 

She has taught me to give people more grace in the way she does, and I've also learned how to be super diligent in my work like she is (we were often in group projects together and I had to match her energy and it's kinda just stuck).
`,
        author: authorMap.nicole.name,
        centered: false,
    },
    rediet: {
        text: `
I think she has changed how I define hard work. 

I have never met anyone more dedicated and focused in my entire life. 

The way she pours herself into every single thing she works on has taught me so much. She is also such a caring person. 

A person that thinks about the ripple effects of her actions in ways that are so powerful that it makes you want to be a better person.
        `,
        author: authorMap.rediet.name,
        centered: false,
        textStyleOverrides: {
            fontSize: 12
        }
    },
    kaleb: {
        text: `
When I was younger, being in the same classroom as her made me a better student.
 
Later, when we reconnected in Seattle, spending more time with her taught me how to be more vulnerable and talk about my feelings.
        `,
        author: authorMap.kaleb.name,
        centered: false,
    },
    achie: {
        text: `
Where do I start? I am always in awe of V’s kindness, patience and her big heart. 

She is also such a great listener. 

I wish to think that I’ve become a better listener because of her.
        `,
        author: authorMap.achie.name,
        centered: false,

    },
    hermi: {
        text: `
She’s always there to challenge what I think and explores everything from a wide range of angles. 

She’s made me question reality so many times by how she sees the world and I’m a better person because of it.
        `,
        author: authorMap.hermi.name,
    },
}

const birthdayCards: Record<string, CardPageProps> = {
    milo: {
        text: `
Happy birthday mama
Thank you for making feel safe
Woof Woof
Where is my food?
        `,
        author: authorMap.milo.name,
    },
    hermi: {
        text: `
Happy Birthday V!!! 
We’re so lucky to having you in our lives. Your kindness, energy, humor and advice makes everything better. Can’t wait to celebrate your 26 birthday and beyond with you! 
I’ve added the first picture we took since reconnecting in Seattle bc it restarted this beautiful friendship with you.
        `,
        author: authorMap.hermi.name,
    },
    rediet: {
        text: `
V, I wish you a wonderful year full of joy, love, blessings and answered prayers. May this be a year that gives you wisdom and growth in all realms of your life. Love you!!!
        `,
        author: authorMap.rediet.name,
    },
    achie: {
        text: `
Vyie, Wish you the most amazing year ahead! 
I love that you get so content whenever you have the meal of the season and a good TV show. (That has rubbed off on me now) 
I hope you will be that content ALL YEAR ROUND!❤️
        `,
        author: authorMap.achie.name,
    },
    nicole: {
        text: `
Happy Birthday V 🫶🏽 
Hope this new year is amazing and better than all the ones that came before it!
        `,
        author: authorMap.nicole.name,
    },
    hanna: {
        text: `
AHHHH HAPPIEST OF ALL BIRTHDAYSSSSSSS!!!!!!! Hope you have a blasttttt and an amazing yearrrrr💕🥰
        `,
        author: authorMap.hanna.name,
    },
    yishak: {
        text: `
Thank you for choosing to be present! 
Wishing you a year where we get to have a picture I can choose to upload to Google next cycle.
        `,
        author: authorMap.yishak.name,
    },
    kaleb: {
        text: `
I wish you would do something that has been on your bucket list for a while. Something daring and adventurous!
        `,
        author: authorMap.kaleb.name,
    },
    eric: {
        text: `
Uggh, why am i here...
Anyway your boyfriend over here says you're his good day sunshine.
        `,
        author: authorMap.eric.name,
    },
    spider: {
        text: `
Come under the tree, where I live. 
I have a special gift for you.👾 🫠
        `,
        author: authorMap.spider.name,
    },
    VM269: {
        text: `
Hello V, this is you from multiverse 269. Things are quite different here. 

I hear Will is always trying to give you fashion advice so you can look like me.

Don’t take it!
        `,
        author: authorMap.VM269.name,
    },
    VM270: {
        text: `
お誕生日おめでとうね
        `,
        author: authorMap.VM270.name,
    },
    VM271: {
        text: `
Happy birthday V
Never doubt your strength.
If Willard ever bullies you,
let me know.
        `,
        author: authorMap.VM271.name,
    },
    VM272: {
        text: `
Happy birthday V.
I hope you never let failures weigh you down to the past.
I hope you keep reaching for the stars like I do on my planet.
Literally...
        `,
        author: authorMap.VM272.name,
    },
}

export const pages: AllPages[] = [
    {type: 'front_cover', props: {title: 'Book of V'}},
    {type: 'empty',}, {type: 'prompt', props: {text: prompts.memories}},
    {type: 'photo', props: {src: photos.redietMemorySection}}, {type: 'card', props: memoriesCards.rediet},
    {type: 'card', props: memoriesCards.kaleb}, {type: 'card', props: memoriesCards.nicole},
    {type: 'card', props: memoriesCards.achie}, {type: 'card', props: memoriesCards.hanna},
    {type: 'photo', props: {src: photos.damon}}, {type: 'card', props: memoriesCards.hermi},
    {type: 'empty',},{type: 'prompt', props: {text: prompts.impact}},
    {type: 'photo', props: {src: photos.nicoleImpactSection}}, {type: 'card', props: impactCards.nicole},
    {type: 'photo', props: {src: photos.redietImpactSection}}, {type: 'card', props: impactCards.rediet},
    {type: 'photo', props: {src: photos.kalebImpactSection}}, {type: 'card', props: impactCards.kaleb},
    {type: 'photo', props: {src: photos.achieImpactSection}}, {type: 'card', props: impactCards.achie},
    {type: 'photo', props: {src: photos.hermiImpactSection}}, {type: 'card', props: impactCards.hermi},
    {type: 'empty'}, {type: 'section', props: {text: sections.birthday_wishes}},
    {type: 'photo', props: {src: photos.miloBirthdayPhoto}}, {type: 'card', props: birthdayCards.milo},
    {type: 'photo', props: {src: photos.hermiBirthdayPhoto}}, {type: 'card', props: birthdayCards.hermi},
    {type: 'photo', props: {src: photos.redietBirthdayPhoto}}, {type: 'card', props: birthdayCards.rediet},
    {type: 'photo', props: {src: photos.achieBirthdayPhoto}}, {type: 'card', props: birthdayCards.achie},
    {type: 'photo', props: {src: photos.nicoleBirthdayPhoto}}, {type: 'card', props: birthdayCards.nicole},
    {type: 'photo', props: {src: photos.hannaBirthdayPhoto}}, {type: 'card', props: birthdayCards.hanna},
    {type: 'card', props: birthdayCards.yishak}, {type: 'card', props: birthdayCards.kaleb},
    {type: 'photo', props: {src: photos.ericBirthdayPhoto}}, {type: 'card', props: birthdayCards.eric},
    {type: 'photo', props: {src: photos.spiderBirthdayPhoto}}, {type: 'card', props: birthdayCards.spider},
    {type: 'empty'}, {type: 'section', props: {text: sections.from_v_to_v}},
    {type: 'photo', props: {src: photos.VM271BirthdayPhoto}}, {type: 'card', props: birthdayCards.VM271},
    {type: 'photo', props: {src: photos.VM270BirthdayPhoto}}, {type: 'card', props: birthdayCards.VM270},
    {type: 'photo', props: {src: photos.VM272BirthdayPhoto}}, {type: 'card', props: birthdayCards.VM272},
    {type: 'empty'}, {type: 'section', props: {text: sections.discover_more}},
    {type: 'section', props: {text: sections.author_name}},
    {type: 'photo', props: {src: photos.VM269BirthdayPhoto}},
    {type: 'back_cover'},
];

export const pageViewMap: Record<PageType, FunctionComponent<any>> = {
    back_cover: BackCover,
    card: CardPage,
    empty: EmptyPage,
    front_cover: FrontBookCover,
    photo: PhotoPage,
    prompt: PromptSectionPage,
    section: TitleSectionPage,
};