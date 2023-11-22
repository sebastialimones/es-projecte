import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import backgroundCactus1 from '../../assets/backgroundCactus1.png';
import imageWithCactus from '../../assets/imageWithCactus.png';
import BuberAvatar from '../../assets/BuberAvatar.png';
import PerlsTransparent from '../../assets/PerlsTransparent.png';
import { homePageContent } from '../../constants/content';
import BoxedWordCounterClock from '../../components/BoxedCounterClockAnimation';
import BoxedWordClockWise from '../../components/BoxedWordClockwise';
import BoxedWordClockWise2 from '../../components/BoxedCounterClockAnimation/index2';
import DisenyoCanvaTransformed from '../../assets/DisenyoCanvaTransformed.png';
import DisenyoCanvaTransformedWithLight from '../../assets/DisenyoCanvaTransformedWithLight.png';
import ImageWrapperComponent from '../../components/ImageWrapper';
import ImageWrapperComponentForCactus from '../../components/ImageWrapperForCactus';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Centers content horizontally in a column flex container
  justify-content: center; // Centers content vertically
  width: 100%; // Ensures the container takes the full width
  min-height: 100vh; // Optionally, makes the container take at least the full height of the viewport
`;

const Section = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  padding-top: 2em;
  justify-content: center; // Center children horizontally
  align-items: center; // Center children vertically (if needed)
  width: 80%; /
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
  align-items: center;
  width: 80%; 
`;

const StyledParagraph = styled.div`
  margin: 0.3em 0;
  line-height: 1.2;
`;

const FirsSectionTextContainer = styled.div`
`;

const Tooltip = styled.span`
  position: absolute;
  background-color: #FAF8F0;
  border: 2px solid black;
  padding: 4px 6px;
  font-size: 1em;
  z-index: 2;
  bottom: 10px;
  right: 10px;
  white-space: nowrap;
  transition: opacity 0.3s ease-in-out;
`;

const ImageContainerHab = styled.div`
  display: flex;
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
  const imageRef = useRef(null);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const buberRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 240 && !hasScrolledPast) {
      setHasScrolledPast(true);
    } else if (window.scrollY <= 240 && hasScrolledPast) {
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
    <Container>
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
              <ImageWrapperComponent 
                src={backgroundCactus1} 
                maxWidth={'100%'}
                alt="backgroundCactus2" 
                tooltipText="Martin Buber - 187" 
                avatarSrc={BuberAvatar}
                ref={buberRef}
              />
              <StyledParagraph>
                {processContent(homePageContent.paragraph2)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph3)}
              </StyledParagraph>
              <ImageWrapperComponentForCactus
                  src={imageWithCactus} 
                  alt="Martin Buber"
                  tooltipText="Martin Buber - 1878"
                  maxWidth={'100%'}
                  avatarSrc={PerlsTransparent}
              />
            </SmallerText>
          </LeftColumn>
          <RightColumn>
          </RightColumn>
        </FullWidthSectionComponent>
        <FullWidthSectionComponent>
          <SmallerText>
            <StyledParagraph>
              {processContent(homePageContent.paragraph4)}
            </StyledParagraph>
          </SmallerText>
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
              <StyledParagraph>
                {processContent(homePageContent.paragraph7)}
              </StyledParagraph>
            </SmallerText>
          </LeftColumn>
        </FullWidthSectionComponent>
      </Sections>
    </Container>
  );
}

export default HomeRoute;