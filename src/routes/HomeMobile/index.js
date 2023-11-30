import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import backgroundCactus1Mobile from '../../assets/backgroundCactus1Mobile.png';
import backgroundCactus2Mobile from '../../assets/backgroundCactus2Mobile.png';
import BuberAvatar from '../../assets/BuberAvatar.png';
import PalmTreesMobile from '../../assets/PalmTreesMobile.png';
import ClaudioCuerpo from '../../assets/ClaudioCuerpo.png';
import PerlsTransparent from '../../assets/PerlsTransparent.png';
import { homePageContent } from '../../constants/content';
import BoxedWordCounterClock from '../../components/BoxedCounterClockAnimation';
import BoxedWordClockWise from '../../components/BoxedWordClockwise';
import BoxedWordClockWise2 from '../../components/BoxedCounterClockAnimation/index2';
import ImageWrapperComponent from '../../components/ImageWrapper';
import DisenyoCanvaTransformed from '../../assets/DisenyoCanvaTransformed.png';
import DisenyoCanvaTransformedWithLight from '../../assets/DisenyoCanvaTransformedWithLight.png';
import ImageWrapperComponentForCactus from '../../components/ImageWrapperForCactus';
import ImageWrapperForBeardComponent from '../../components/ImageWrapperForBeard';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-color: #FAF8F0;
  padding-top: 2em;
  padding-bottom: 2em;
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
  display: flex;  padding-left: 20px;
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

const ImageContainerHab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding-bottom: 3em;
`;

const HabImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin: auto;
`;

const componentMap = {
  BoxedWordCounterClock: BoxedWordCounterClock,
  BoxedWordClockWise: BoxedWordClockWise,
  BoxedWordClockWise2: BoxedWordClockWise2,
};

const useOnScreen = (ref, threshold = 0.2, onlyOnce = true) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (onlyOnce) {
            if (ref.current instanceof Element) {
              observer.unobserve(ref.current);
            }
          }
        } else if (!onlyOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    if (ref.current instanceof Element) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current instanceof Element) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, onlyOnce]);

  return isIntersecting;
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
  const imageRef = useRef(null);
  const isHabImageOnScreen = useOnScreen(imageRef, 0.9, true);
  const buberRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) setHasScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <>
      <Section>
        <FirsSectionTextContainer>
          <HeroText>
            {homePageContent.heroText}
          </HeroText>
        </FirsSectionTextContainer>
        <ImageContainerHab ref={imageRef}>
          <HabImage 
            src={(isHabImageOnScreen && hasScrolled) ? DisenyoCanvaTransformedWithLight : DisenyoCanvaTransformed}
            alt="Habitación terapia"
          />
        </ImageContainerHab>
        <TextSection>
          <ColumnSection>
            <SmallerText>
            <StyledParagraph>
                {processContent(homePageContent.paragraph01)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph1)}
              </StyledParagraph>
              <ImageWrapperComponent 
                src={backgroundCactus1Mobile} 
                maxWidth={'100%'}
                alt="backgroundCactus2" 
                tooltipText="Martin Buber - 187" 
                avatarSrc={BuberAvatar}
                ref={buberRef}
                isMobile={'isMobile'}
              />
              <StyledParagraph>
                {processContent(homePageContent.paragraph2)}
              </StyledParagraph>
              <ImageWrapperComponentForCactus
                  src={backgroundCactus2Mobile} 
                  alt="Martin Buber"
                  tooltipText="Martin Buber - 1878"
                  maxWidth={'100%'}
                  avatarSrc={PerlsTransparent}
                  isMobile={'isMobile'}
              />
              <StyledParagraph>
                {processContent(homePageContent.paragraph3)}
              </StyledParagraph>
              <StyledParagraph>
                {processContent(homePageContent.paragraph4)}
              </StyledParagraph>
            </SmallerText>
          </ColumnSection>
          <ColumnSection>
          <ImageWrapperForBeardComponent
              src={PalmTreesMobile} 
              alt="Claudio Naranjo"
              tooltipText="Claudio Naranjo"
              maxWidth={'100%'}
              avatarSrc={ClaudioCuerpo}
              isMobile={'isMobile'}
          />
          </ColumnSection>
          <ColumnSection>
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
          </ColumnSection>
          </TextSection>
      </Section>
    </>
  );
}

export default HomeMobile;
