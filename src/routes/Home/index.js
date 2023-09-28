import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as MyDrawing } from '../../assets/draftTarjeta2.svg';
import media, { sizes } from '../../constants/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const RebucContainer = styled.div`
  margin-top: 2em;  // Space between SVGAndHeaderTextWrapper and RebucContainer
`;

const SVGAndHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Keep items centered
  width: 100%;
  margin: 1em;
`;

const HomeHeader = styled.h1`
  font-size: 44px;
  width: 70%;
  max-width: 70%;
  margin-left: 4em;
  text-align: left;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease-out;

  ${media.mediumScreen`
    font-size: 32px;
    margin-left: 2em;
  `}

  ${media.smallScreen`
    font-size: 22px;
  `}
`;

const StyledSVG = styled(({ strokeLength, ...rest }, ref) => <MyDrawing ref={ref} {...rest} />).attrs({
  as: MyDrawing
})`
  width: 90%;
  path {
    fill: none;
    stroke: black;
    stroke-width: 1;
    stroke-dasharray: ${props => props.strokeLength};
    stroke-dashoffset: ${props => props.offset};
  }
  ${media.mediumScreen`
    width: 80%;
  `}
  ${media.smallScreen`
    width: 90%;
  `}
`;

export const HomeRoute = () => {
  const [strokeOffset, setStrokeOffset] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const svgRef = useRef(null);
  const scrollFactor = 0.25;
  const animationSpeed = 4;

  useEffect(() => {
    if (svgRef.current) {
        const pathElement = svgRef.current.querySelector("path");
        const length = pathElement ? pathElement.getTotalLength() : 0;
        setStrokeOffset(length);
    }
}, []);

  useEffect(() => {
    const handleScroll = (event) => {
      if (animationCompleted) {
        return;
      }
    
      if (!animationCompleted) {
        event.preventDefault();
      }
    
      const desiredScroll = window.scrollY + event.deltaY * scrollFactor;
      window.scrollTo(0, desiredScroll);
    
      const isMobile = window.innerWidth <= sizes.smallScreen;
      const desktopTrigger = 240;
      console.log(window.scrollY)
      const mobileTrigger = 170;
      const triggerPoint = isMobile ? mobileTrigger : desktopTrigger;
    
      if (window.scrollY >= triggerPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    
      const svgLength = svgRef.current.querySelector("path").getTotalLength();
      let offsetValue = svgLength - desiredScroll * animationSpeed;
    
      console.log("Offset Value:", offsetValue); // Monitor the offset value
    
      offsetValue = Math.max(0, Math.min(svgLength, offsetValue));
      setStrokeOffset(offsetValue);
    
      if (offsetValue <= 970) {
        setAnimationCompleted(true);
        window.removeEventListener("wheel", handleScroll);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [animationCompleted, svgRef]);
  
  return (
    <Container>
      <SVGAndHeaderTextWrapper>
        <StyledSVG ref={svgRef} offset={strokeOffset} strokeLength={strokeOffset} />
        <HomeHeader isVisible={isVisible}>
          Acompañamiento desde la terapia gestalt en Palma de Mallorca presencial y Online.
        </HomeHeader>
      </SVGAndHeaderTextWrapper>
      <RebucContainer>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus, risus nec vehicula consectetur, enim justo feugiat risus, a feugiat massa dui et urna. Quisque nec ligula et est vestibulum consectetur at nec libero.</p>
          <p>Nulla facilisi. Praesent vel odio vel justo pellentesque rhoncus. Cras tincidunt eros id dui cursus, a venenatis lacus feugiat. Sed feugiat dolor et elit facilisis bibendum.</p>
          <p>Curabitur non odio ac odio vulputate fringilla. Nullam at tincidunt turpis. Praesent elementum turpis eu ipsum fringilla, ac fermentum arcu pulvinar. Quisque nec sem quis massa dictum facilisis.</p>
          <p>Phasellus accumsan, dui vel lacinia volutpat, nulla ante pharetra ipsum, id vulputate massa metus vitae leo. Fusce auctor metus eu ipsum facilisis, id pharetra leo suscipit.</p>
          <p>Ut euismod, dui in varius porttitor, justo ex gravida nisl, sit amet vehicula tellus nunc nec neque. Suspendisse a ante et neque ullamcorper scelerisque a a lectus.</p>
          {/* You can add more paragraphs as needed */}
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus, risus nec vehicula consectetur, enim justo feugiat risus, a feugiat massa dui et urna. Quisque nec ligula et est vestibulum consectetur at nec libero.</p>
          <p>Nulla facilisi. Praesent vel odio vel justo pellentesque rhoncus. Cras tincidunt eros id dui cursus, a venenatis lacus feugiat. Sed feugiat dolor et elit facilisis bibendum.</p>
          <p>Curabitur non odio ac odio vulputate fringilla. Nullam at tincidunt turpis. Praesent elementum turpis eu ipsum fringilla, ac fermentum arcu pulvinar. Quisque nec sem quis massa dictum facilisis.</p>
          <p>Phasellus accumsan, dui vel lacinia volutpat, nulla ante pharetra ipsum, id vulputate massa metus vitae leo. Fusce auctor metus eu ipsum facilisis, id pharetra leo suscipit.</p>
          <p>Ut euismod, dui in varius porttitor, justo ex gravida nisl, sit amet vehicula tellus nunc nec neque. Suspendisse a ante et neque ullamcorper scelerisque a a lectus.</p>
          {/* You can add more paragraphs as needed */}
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus, risus nec vehicula consectetur, enim justo feugiat risus, a feugiat massa dui et urna. Quisque nec ligula et est vestibulum consectetur at nec libero.</p>
          <p>Nulla facilisi. Praesent vel odio vel justo pellentesque rhoncus. Cras tincidunt eros id dui cursus, a venenatis lacus feugiat. Sed feugiat dolor et elit facilisis bibendum.</p>
          <p>Curabitur non odio ac odio vulputate fringilla. Nullam at tincidunt turpis. Praesent elementum turpis eu ipsum fringilla, ac fermentum arcu pulvinar. Quisque nec sem quis massa dictum facilisis.</p>
          <p>Phasellus accumsan, dui vel lacinia volutpat, nulla ante pharetra ipsum, id vulputate massa metus vitae leo. Fusce auctor metus eu ipsum facilisis, id pharetra leo suscipit.</p>
          <p>Ut euismod, dui in varius porttitor, justo ex gravida nisl, sit amet vehicula tellus nunc nec neque. Suspendisse a ante et neque ullamcorper scelerisque a a lectus.</p>
          {/* You can add more paragraphs as needed */}
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus, risus nec vehicula consectetur, enim justo feugiat risus, a feugiat massa dui et urna. Quisque nec ligula et est vestibulum consectetur at nec libero.</p>
          <p>Nulla facilisi. Praesent vel odio vel justo pellentesque rhoncus. Cras tincidunt eros id dui cursus, a venenatis lacus feugiat. Sed feugiat dolor et elit facilisis bibendum.</p>
          <p>Curabitur non odio ac odio vulputate fringilla. Nullam at tincidunt turpis. Praesent elementum turpis eu ipsum fringilla, ac fermentum arcu pulvinar. Quisque nec sem quis massa dictum facilisis.</p>
          <p>Phasellus accumsan, dui vel lacinia volutpat, nulla ante pharetra ipsum, id vulputate massa metus vitae leo. Fusce auctor metus eu ipsum facilisis, id pharetra leo suscipit.</p>
          <p>Ut euismod, dui in varius porttitor, justo ex gravida nisl, sit amet vehicula tellus nunc nec neque. Suspendisse a ante et neque ullamcorper scelerisque a a lectus.</p>
          {/* You can add more paragraphs as needed */}
        </div>
      </RebucContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({});
export const Home = connect(mapStateToProps)(HomeRoute); 