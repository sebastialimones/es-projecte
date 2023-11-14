import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import MartinBuber from '../../assets/MartinBuber.jpeg';
import FritzPerlsEssalen from '../../assets/FritzPerlsEssalen.jpeg';
import ClaudioNaranjoJoven from '../../assets/ClaudioNaranjoJoven.jpeg';
import { homePageContent } from '../../constants/content';
import BoxedWordCounterClock from '../../components/BoxedCounterClockAnimation';
import BoxedWordClockWise from '../../components/BoxedWordClockwise';
import BoxedWordClockWise2 from '../../components/BoxedCounterClockAnimation/index2';
import DisenyoCanvaTransformed from '../../assets/DisenyoCanvaTransformed.png';
import DisenyoCanvaTransformedWithLight from '../../assets/DisenyoCanvaTransformedWithLight.png';
import DisenyoCanvaTransformedWith2Lights from '../../assets/DisenyoCanvaTransformedWith2Lights.png';

const Section = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  background-color: #FAF8F0;
  padding-top: 2em;
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

const FirsSectionTextContainer = styled.div`
  display: flex;
`;

const Tooltip = styled.span`
  position: absolute;
  background-color: #FAF8F0;
  border: 2px solid black;
  padding: 2px 6px;
  font-size: 1em;
  z-index: 2;
  bottom: 10px;
  right: 10px;
  white-space: nowrap;
  transition: opacity 0.3s ease-in-out;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  position: relative;
  margin-bottom: 0; 
  align-items: center;

  &:hover ${Tooltip} {
    display: inline-block;
    opacity: 1;
  }
`;

const ImageContainerHab = styled.div`
  display: flex;
  /* justify-content: center;  */
  /* align-items: center;  */
  position: relative;
  width: 100%; // Ensuring the container takes full width
  height: 100%; // Optional: If you want to set a specific height for the image container
  margin-bottom: 0;
`;

const HabImage = styled.img`
  max-width: 90%; // Ensuring the image doesn't exceed 80% of its container's width
  height: auto; // Keeping the image's aspect ratio
  display: block;
  margin: auto; // This will also help in centering the image
`;

const ImageWrapperHab = styled.div`
  position: relative;
  max-height: 100%;
  &:hover ${Tooltip} {
    display: block;
    opacity: 1;
  }
  margin-bottom: 1em;
`;

const ImageWrapper = styled.div`
  position: relative;
  max-height: 100%;
  border: 3px solid black;
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

const FullWidthSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
`;

const FullWidthSectionComponent = ({ children }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.2);

  useEffect(() => {
    if (onScreen) {
      ref.current.style.opacity = '1';
      ref.current.style.transform = 'translateY(0)';
    }
  }, [onScreen]);

  return (
    <FullWidthSection ref={ref}>
      {children}
    </FullWidthSection>
  );
};

const useOnScreen = (ref, threshold = 0.2) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isIntersecting;
};

const ImageWrapperComponent = ({ children, maxWidth }) => {

  return (
    <ImageWrapper style={{ maxWidth: maxWidth || '70%' }}>
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


const HomeRoute = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const imageRef = useRef(null);
  const isHabImageOnScreen = useOnScreen(imageRef, 0.9, true);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 30 && !hasScrolledPast) {
      setHasScrolledPast(true);
    } else if (window.scrollY <= 30 && hasScrolledPast) {
      setHasScrolledPast(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledPast]);

  return (
    <>
      <Section>
        <FirsSectionTextContainer>
          <HeroText>
            {homePageContent.heroText}
          </HeroText>
        </FirsSectionTextContainer>
      </Section>
      <Section>
        <ImageContainerHab ref={imageRef}> 
          <ImageWrapperHab> 
            <HabImage 
              src={hasScrolledPast ? DisenyoCanvaTransformedWithLight : DisenyoCanvaTransformed}
              alt="Habitación terapia"
            />
          </ImageWrapperHab>
        </ImageContainerHab>
      </Section>
      <Sections>
        <FullWidthSectionComponent>
          <LeftColumn>
            <SmallerText>
            <StyledParagraph>
                {processContent(homePageContent.paragraph01)}
              </StyledParagraph>
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
          </RightColumn>
        </FullWidthSectionComponent>
        <FullWidthSectionComponent>
          <LeftColumn>
            <SmallerText>
              <StyledParagraph>
                {processContent(homePageContent.paragraph4)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
        </FullWidthSectionComponent>
        <FullWidthSectionComponent>
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
          {/* <RightColumn>
            <ImageContainer centered>
              <ImageWrapperComponent>
                <Tooltip>Martin Buber - 1878</Tooltip>
                <TherapistImage src={MartinBuber} alt="Martin Buber" />
              </ImageWrapperComponent>
            </ImageContainer>
          </RightColumn>
          <RightColumn>
          <ImageContainer>
            <ImageWrapperComponent maxWidth={"60%"}>
              <Tooltip>Fritz y Laura Perls - 1964</Tooltip>
              <TherapistImage src={FritzPerlsEssalen} alt="Fritz y Laura Perls en Esalen" />
            </ImageWrapperComponent>
          </ImageContainer>
          </RightColumn>
        </FullWidthSectionComponent>
        <FullWidthSectionComponent>
          <RightColumn>
          <ImageContainer>
            <ImageWrapperComponent maxWidth={"60%"}>
              <Tooltip>Claudio Naranjo</Tooltip>
              <TherapistImage src={ClaudioNaranjoJoven} alt="Claudio Naranjo tocando un gong" />
            </ImageWrapperComponent>
          </ImageContainer>
          </RightColumn> */}
        </FullWidthSectionComponent>
      </Sections>
    </>
  );
}

export default HomeRoute;