import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: var(--blueGrey-900, #263238);
  /* elevation/20 */
  box-shadow: 0px 8px 38px 7px rgba(0, 0, 0, 0.12), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 10px 13px -6px rgba(0, 0, 0, 0.20);
`;

const InnerContainer = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const TextContainer = styled.div`
  color: var(--Color-1, #FFF);
  text-align: center;
  font-family: "Libre Barcode 128 Text";
  font-size: 75px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const BookBind = styled.div<{ left: number }>`
  position: absolute;
  left: ${({left}) => `${left}px`};
  width: 10px;
  height: 100%;
  background: #28343A;
`

export interface BookCoverProps {
    title: string;
}

const BookCover = (props: BookCoverProps) => {
    const {title} = props;
    return (
        <Container>
            <InnerContainer>
                <TextContainer>
                    {title}
                </TextContainer>
            </InnerContainer>
            <BookBind left={5}/>
            <BookBind left={10}/>
        </Container>
    );
};

export {BookCover};
