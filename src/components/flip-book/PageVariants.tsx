import React, {CSSProperties} from "react";
import styled from "styled-components";
import {pageHeight, pageWidth} from "./common";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import _ from "lodash";
import { motion } from "framer-motion";

export const EmptyPage = styled.div`
  width: ${pageWidth}px;
  height: ${pageHeight}px;
  padding: 20px;
  background-color: #2A2A2A;
  color: white;
  position: relative;
`;

export interface PageProps {
    text: string;
}

const TitleContainer = styled.div`
  text-align: right;
  font-family: Antonio;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  top: 50%;
  right: 60px;
`;

export const TitleSectionPage = (props: PageProps) => {
    const {text} = props;
    return (
        <EmptyPage>
            {/* animation would be nice */}
            <TitleContainer>{text.split('\n').map(each => (<div>{each}</div>))}</TitleContainer>
        </EmptyPage>
    )
}

export const PromptSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  color: white;
`;

export const PromptTextContainer = styled.div`
  text-align: right;
  font-family: Antonio;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const PromptSectionPage = (props: PageProps) => {
    const {text} = props;
    return (
        <EmptyPage>
            <PromptSectionContainer>
                <FormatQuoteIcon color={'inherit'}/>
                <PromptTextContainer>{text}</PromptTextContainer>
                <FormatQuoteIcon color={'inherit'}/>
            </PromptSectionContainer>
        </EmptyPage>
    );
}


const CardMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  font-family: "DM Mono";
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1.4px;
  width: 100%;
  height: 100%;
`;

const Paragraph = styled.div`
  
`;


const CardAuthor = styled.div`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "DM Mono";
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1.4px;
`;

const centeredStyle: CSSProperties = {
    textAlign: 'center'
}

const nonCenteredStyle: CSSProperties = {
    textAlign: 'left'
}

export interface CardPageProps {
    text: string;
    author: string;
    textStyleOverrides?: CSSProperties;
    centered?: boolean;
}

export const CardPage = (props: CardPageProps) => {
    const {text, author, centered = true, textStyleOverrides = {}} = props;
    const style = _.merge(centered ? centeredStyle: nonCenteredStyle, textStyleOverrides);

    return (
        <EmptyPage style={{padding: 50,}}>
            <CardMessage>
                {text.trim().split('\n').map((paragraph, index) => (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                transition={{duration: 1, delay: index * 0.1, easing: 'easeInOut'}}
                                style={style}
                    >
                        {paragraph}
                    </motion.div>
                ))}
            </CardMessage>
            <CardAuthor>{author}</CardAuthor>
        </EmptyPage>
    );
}

export interface PhotoPageProps {
    src: string;
}

const PhotoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export const PhotoPage = (props: PhotoPageProps) => {
    const {src} = props;
    return (
        <EmptyPage>
            <PhotoContainer>
                <img alt={'photo'} src={src}/>
            </PhotoContainer>
        </EmptyPage>
    );
}