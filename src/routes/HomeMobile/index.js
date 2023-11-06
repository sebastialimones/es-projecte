import React from 'react';
import styled from 'styled-components';
import MartinBuber from '../../assets/MartinBuber.jpeg';
import FritzPerlsEssalen from '../../assets/FritzPerlsEssalen.jpeg';
import ClaudioNaranjoJoven from '../../assets/ClaudioNaranjoJoven.jpeg';
import { homePageContent } from '../../constants/content';
import BoxedWordCounterClock from '../../components/BoxedCounterClockAnimation';
import BoxedWordClockWise from '../../components/BoxedWordClockwise';
import BoxedWordClockWise2 from '../../components/BoxedCounterClockAnimation/index2';
import ImageWrapperComponent from '../../components/ImageWrapper';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-color: #FAF8F0;
  padding-top: 2em;
  padding-bottom: 5em;
  align-items: center;
`;

const HeroText = styled.h1`
  color: black;
  font-size: 3em;
  line-height: 1.2;
  text-align: left;
  padding-bottom: 1em;
`;

const TextSection = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

const StyledParagraph = styled.div`
  margin: 0.3em 0;
  line-height: 1.2;
`;

const FirsSectionTextContainer = styled.div`
  display: flex;
  z-index: 1;
  padding-left: 20px;
`;

const SmallerText = styled.div`
  font-size: 1.5em;
  flex: 0.5; 
  line-height: 0.6; 
  display: flex;
  color: black;
  text-align: left;
  flex-direction: column;
`;
const ColumnSection = styled.div`
  display: flex;
  flex-direction: column; 
  flex: 1;
`;

const componentMap = {
  BoxedWordCounterClock: BoxedWordCounterClock,
  BoxedWordClockWise: BoxedWordClockWise,
  BoxedWordClockWise2: BoxedWordClockWise2,
};

const processContent = (text) => {
  const parts = text.split(/\{(.*?)\}/);
  return parts.map((part, index) => {
    const [componentName, content] = part.split('|');
    const Component = componentMap[componentName];
    if (Component) {
      return <Component key={index}>{content}</Component>;
    } else {
      return part;
    }
  });
};


const HomeMobile = () => {
  
  return (
    <>
      <Section>
        <FirsSectionTextContainer>
          <HeroText>
            {homePageContent.heroText}
          </HeroText>
        </FirsSectionTextContainer>
        <TextSection>
          <ColumnSection>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph1)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph2)}
              </StyledParagraph>
              <ImageWrapperComponent 
                src={MartinBuber} 
                alt="Martin Buber"
                tooltipText="Martin Buber - 1878"
              />
              <StyledParagraph>
                {processContent(homePageContent.paragraph3)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph31)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph4)}
              </StyledParagraph>
            </SmallerText>
          </ColumnSection>
          <ColumnSection>
            <ImageWrapperComponent 
                src={FritzPerlsEssalen} 
                alt="Fritz y Laura Perls en Esalen"
                tooltipText="Fritz y Laura Perls - 1964"
            />
          </ColumnSection>
          <ColumnSection>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph5)}
              </StyledParagraph>
          <ColumnSection>
            <ImageWrapperComponent 
              src={ClaudioNaranjoJoven} 
              alt="Claudio Naranjo tocando un gong"
              tooltipText="Claudio Naranjo"
              maxWidth={"60%"}
            />
          </ColumnSection>
              <StyledParagraph>
                {processContent(homePageContent.paragraph6)}
              </StyledParagraph>
            </SmallerText>
          </ColumnSection>
          
          <ColumnSection>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph7)}
              </StyledParagraph>
            </SmallerText>
          </ColumnSection>
          <ColumnSection>
          </ColumnSection>
          <ColumnSection>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph8)}
              </StyledParagraph>
            </SmallerText>
          </ColumnSection>
          </TextSection>
      </Section>
    </>
  );
}

export default HomeMobile;
