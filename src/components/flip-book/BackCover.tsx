import styled from "styled-components";

const Container = styled.div`
  font-family: Karma;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 60px 30px 30px 30px;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  background: #263238;
  position: relative;
`

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`;

const AboutAuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const AuthorBio = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;


const OtherWorksContainer = styled.div`
  display: flex;
  width: 280px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SectionTitle = styled.div`
  color: #C9A875;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const BookTitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const BookTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const BookSubTitle = styled.div`
  color: #C9A875;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const PublishingSection = styled.div`
  display: flex;
  padding: 0 10.5px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const PublishingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
`;

const PublishingDescription = styled.div`
  color: #C9A875;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PriceContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: flex-end;
`;

const Box = styled.div`
  width: 80px;
  height: 38px;
  background: #C9A875;
`

const Price = styled.div`
  color: #FFF;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const PageBind =  styled.div<{ right: number }>`
  position: absolute;
  top: 0;
  right: ${({right}) => `${right}px`};
  width: 10px;
  height: 100%;
  background: #28343A;
`


interface BackCoverProps {

}

const metadata = {
    authorBio: "Veronica T. Woldehanna is a critically acclaimed author known for her unique perspective on modern life's peculiarities. Her bestselling books have earned her a dedicated following among readers seeking both entertainment and impractical advice. When not writing or pacing around rooms, she can be found giving inspirational talks or defending her unwavering loyalty to Microsoft products.",
    books: [
        {title: 'Skip the Mixer', subtitle: 'How to Lose Weight One (Straight) Shot at a Time'},
        {title: 'Ted Talks That Have Changed My Life', subtitle: 'and Lessons I\'ve learned from Them'},
        {title: 'Pacing to Success', subtitle: 'How Pacing Around Rooms Helps Calm Your Nerves'},
        {title: 'The Paradox of Choice', subtitle: 'Why I Always Choose Microsoft'},
    ],
    publishing: {
        isbn: 'ISBN: 978-0-2024-11-22',
        publisher: 'The Closet Artist Press',
        price: '$26.01'
    }
};

export const BackCover = () => {
    return (
        <Container>
            <AboutSection>
                <AboutAuthorContainer>
                    <SectionTitle>
                        ABOUT THE AUTHOR
                    </SectionTitle>
                    <AuthorBio>
                        {metadata.authorBio}
                    </AuthorBio>
                </AboutAuthorContainer>
                <OtherWorksContainer>
                    <SectionTitle>
                        ALSO BY THE AUTHOR
                    </SectionTitle>
                    <BookList>
                        {metadata.books.map(book => (
                            <BookTitleContainer>
                                <BookTitle>{book.title}</BookTitle>
                                <BookSubTitle>{book.subtitle}</BookSubTitle>
                            </BookTitleContainer>
                        ))}
                    </BookList>
                </OtherWorksContainer>
            </AboutSection>
            <PublishingSection>
                <PublishingContainer>
                    <PublishingDescription>{metadata.publishing.isbn}</PublishingDescription>
                    <PublishingDescription>Published By {metadata.publishing.publisher}</PublishingDescription>
                </PublishingContainer>
                <PriceContainer>
                    <Box/>
                    <Price>{metadata.publishing.price}</Price>
                </PriceContainer>
            </PublishingSection>
            <PageBind right={2}/>
            <PageBind right={7}/>
        </Container>
    )
}
