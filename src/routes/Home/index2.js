import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import MartinBuber from '../../assets/MartinBuber.jpeg';
import FritzPerlsEssalen from '../../assets/FritzPerlsEssalen.jpeg';
import ClaudioNaranjoJoven from '../../assets/ClaudioNaranjoJoven.jpeg';
import { homePageContent } from '../../constants/content';
import BoxedWordCounterClock from '../../components/BoxedCounterClockAnimation';
import BoxedWordClockWise from '../../components/BoxedWordClockwise';
import BoxedWordClockWise2 from '../../components/BoxedCounterClockAnimation/index2';

const Section = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  background-color: #FAF8F0;
  padding-top: 2em;
  padding-bottom: 5em;
`;

const HeroText = styled.h1`
  color: black;
  font-size: 4em;
  line-height: 1.2;
  text-align: left;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
`;

const TwoColumnSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: 0; 
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
`;

const StyledParagraph = styled.div`
  margin: 0.3em 0;
  line-height: 1.2;
`;

const BoxedWord = styled.span`
  display: inline-block;
  vertical-align: baseline; // this aligns to the baseline of the text
  border: 2px solid black;
  padding: 2px 6px;
  margin: -2px 0;           // using negative margin to counteract any added space
  transform: rotate(4deg);
  transition: transform 0.3s ease;
  z-index: 4;
  &:hover {
    transform: rotate(12deg);
  }
`;

const FirsSectionTextContainer = styled.div`
  display: flex;
  z-index: 1;
  padding-left: 20px;
`;

const Tooltip = styled.span`
  display: none;
  position: absolute;
  background-color: #FAF8F0;
  border: 2px solid black;
  padding: 2px 6px;
  font-size: 1em;
  z-index: 2;
  bottom: 10px;
  right: 10px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const borderTopAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const borderRightAnimation = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const borderBottomAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const borderLeftAnimation = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const BorderTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0; // Initial value
  background-color: black;
  animation: ${borderTopAnimation} 0.7s forwards 1s;
`;

const BorderRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  height: 0; // Initial value
  background-color: black;
  animation: ${borderRightAnimation} 0.7s forwards;
  animation-delay: 1.7s;  // Delay this animation
`;

const BorderBottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 3px;
  width: 0; // Initial value
  background-color: black;
  animation: ${borderBottomAnimation} 0.7s forwards;
  animation-delay: 2.4s;  // Delay this animation
`;

const BorderLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 3px;
  height: 0; // Initial value
  background-color: black;
  animation: ${borderLeftAnimation} 0.7s forwards;
  animation-delay: 3.1s;  // Delay this animation
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  padding-right: 20px;
  position: relative;
  margin-bottom: 0; 
 align-items: center;
  
  &:hover ${Tooltip} {
    display: inline-block;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  max-height: 100%;

  &:hover ${Tooltip} {
    display: block;
    opacity: 1;
  }
`;

const TherapistImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  display: block;
  height: auto;
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

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column; 
  flex: 1;
`;

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

const TwoColumnSectionComponent = ({ children }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen && ref.current) {
      ref.current.style.opacity = '1';
      ref.current.style.transform = 'translateY(0)';
    }
  }, [onScreen]);

  return (
    <TwoColumnSection ref={ref} style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}>
      {children}
    </TwoColumnSection>
  );
};

const ImageWrapperComponent = ({ children, maxWidth }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <ImageWrapper ref={ref} style={{ maxWidth: maxWidth || '70%', opacity: onScreen ? '1' : '0', transition: 'opacity 0.5s ease-out' }}>
      {children}
    </ImageWrapper>
  );
};

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


const Home2 = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen && ref.current) {
      ref.current.style.animationPlayState = 'running';
    }
  }, [onScreen]);
  
  return (
    <>
      <Section>
        <FirsSectionTextContainer>
          <HeroText>
            {homePageContent.heroText}
          </HeroText>
        </FirsSectionTextContainer>
      </Section>

      <Sections>
        <TwoColumnSectionComponent>
          <LeftColumn>
            <SmallerText>
            <StyledParagraph>
                {processContent(homePageContent.paragraph1)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph2)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph3)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph31)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
          <RightColumn>
            <ImageContainer centered>
              <ImageWrapperComponent>
                <BorderTop />
                <BorderRight />
                <BorderBottom />
                <BorderLeft />
                <Tooltip>Martin Buber - 1878</Tooltip>
                <TherapistImage src={MartinBuber} alt="Martin Buber" />
              </ImageWrapperComponent>
            </ImageContainer>
          </RightColumn>
        </TwoColumnSectionComponent>
        <TwoColumnSectionComponent>
          <LeftColumn>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph4)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
          <RightColumn>
          </RightColumn>
        </TwoColumnSectionComponent>
        <TwoColumnSectionComponent>
          <LeftColumn>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph5)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph6)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
          <RightColumn>
            <ImageContainer>
              <ImageWrapperComponent>
                <BorderTop />
                <BorderRight />
                <BorderBottom />
                <BorderLeft />
                <Tooltip>Fritz y Laura Perls - 1964</Tooltip>
                <TherapistImage src={FritzPerlsEssalen} alt="Fritz y Laura Perls en Esalen" />
              </ImageWrapperComponent>
            </ImageContainer>
          </RightColumn>
        </TwoColumnSectionComponent>
        <TwoColumnSectionComponent>
          <LeftColumn>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph7)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
          <RightColumn>
          </RightColumn>
        </TwoColumnSectionComponent>
        <TwoColumnSectionComponent>
          <LeftColumn>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph8)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
          <RightColumn>
            <ImageContainer>
              <ImageWrapperComponent maxWidth={"60%"}>
                <BorderTop />
                <BorderRight />
                <BorderBottom />
                <BorderLeft />
                <Tooltip>Claudio Naranjo</Tooltip>
                <TherapistImage src={ClaudioNaranjoJoven} alt="Claudio Naranjo tocando un gong" />
              </ImageWrapperComponent>
            </ImageContainer>
          </RightColumn>
        </TwoColumnSectionComponent>
      </Sections>
    </>
  );
}

export default Home2;
