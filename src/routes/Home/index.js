import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as MyDrawing } from '../../assets/Asset 22.svg';
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
`;
const TopHeader = styled.h1`
  font-size: 44px;
  text-align: left;
  margin-top: 0.4em;

  ${media.mediumScreen`
    font-size: 32px;
  `}

  ${media.smallScreen`
    font-size: 22px;
  `}
`;
const HomeHeader = styled.h1`
  font-size: 44px;
  text-align: left;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease-out;

  ${media.mediumScreen`
    font-size: 32px;
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
    margin-top: 3em;
  `}
`;

export const HomeRoute = () => {
  const [strokeOffset, setStrokeOffset] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const svgRef = useRef(null);
  const scrollFactor = 0.5;
  const animationSpeed = 2;

  useEffect(() => {
    if (svgRef.current) {
        const pathElement = svgRef.current.querySelector("path");
        const length = pathElement ? pathElement.getTotalLength() : 0;
        setStrokeOffset(length);
    }
}, []);

const handleScrollLogic = (scrollY) => {
  const isMobile = window.innerWidth <= sizes.smallScreen;
  const desktopTrigger = 370;
  const mobileTrigger = 220;
  const triggerPoint = isMobile ? mobileTrigger : desktopTrigger;

  if (scrollY >= triggerPoint) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }

  const svgLength = svgRef.current.querySelector("path").getTotalLength();
  let offsetValue = svgLength - scrollY * animationSpeed;

  offsetValue = Math.max(0, Math.min(svgLength, offsetValue));
  setStrokeOffset(offsetValue);
  console.log(offsetValue)
  if (offsetValue <= 1100) {
    setAnimationCompleted(true);
  }
};

useEffect(() => {
  let startY;  // to store the start Y position during touchstart

  const handleWheelScroll = (event) => {
    const desiredScroll = window.scrollY + event.deltaY * scrollFactor;
    handleScrollLogic(desiredScroll);
  };

  const handleTouchStart = (event) => {
    startY = event.touches[0].clientY;  // set the start Y position
  };

  const handleTouchMove = (event) => {
    const deltaY = event.touches[0].clientY - startY;
    const desiredScroll = window.scrollY + deltaY * scrollFactor;
    handleScrollLogic(desiredScroll);
  };

  if (!animationCompleted) {
    window.addEventListener("wheel", handleWheelScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
  }

  return () => {
    window.removeEventListener("wheel", handleWheelScroll);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, [animationCompleted, svgRef]);
  
  return (
    <Container>
      <TopHeader >
        Acompañamiento desde la 
      </TopHeader>
      <SVGAndHeaderTextWrapper>
        <StyledSVG ref={svgRef} offset={strokeOffset} strokeLength={strokeOffset} />
        <HomeHeader isVisible={isVisible}>
          en Palma de Mallorca <br></br> y online
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
          <p>Curabitur non odio ac odio vulputate fringilla. Null am at tincidunt turpis. Praesent elementum turpis eu ipsum fringilla, ac fermentum arcu pulvinar. Quisque nec sem quis massa dictum facilisis.</p>
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