import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as MyDrawing } from '../../assets/Asset 22.svg';
import media, { sizes } from '../../constants/media';
import { useSpring, animated } from '@react-spring/web';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding-top: 6em;
`;

const RebucContainer = styled.div`
  margin-top: 2em;  
`;

const SVGAndHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative; 
  height: 900px;
  ${media.mediumScreen`
    height: 380px;
  `}
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
  z-index: 2; // this ensures it is on top of the SVGs
  position: relative; // required for z-index to take effect
  ${media.mediumScreen`
    font-size: 32px;
  `}

  ${media.smallScreen`
    font-size: 22px;
  `}
`;

const commonSVGStyles = `
  width: 90%;
  position: absolute; // Position SVGs absolutely
  top: 0;
  left: 50%;
  transform: translateX(-50%); // Center the SVGs
  z-index: 1;
  path {
    fill: none;
    stroke-width: 1;
  }

  ${media.mediumScreen`
    width: 80%;
  `}

  ${media.smallScreen`
    width: 90%;
    margin-top: 3em;
  `}
`;

const BackgroundSVG = styled(MyDrawing)`
  ${commonSVGStyles}
  path {
    stroke: #c0c0c0; // gray color
    stroke-dasharray: 1100; // Only display up to this length
    stroke-dashoffset: 1100; // Offset it by the same value so only the desired portion is visible
  }
`;

const StyledSVG = styled(({ strokeLength, ...rest }, ref) => <MyDrawing ref={ref} {...rest} />)
.attrs({
  as: MyDrawing
})`
  ${commonSVGStyles}
  path {
    stroke: black;
    stroke-dasharray: ${props => props.strokeLength};
    stroke-dashoffset: ${props => props.offset};
  }
`;

const AnimatedSVG = animated(StyledSVG);

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

  const { offset } = useSpring({
    offset: strokeOffset,
    config: { tension: 100, friction: 20 }, 
  });

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
    if (offsetValue <= 1100) {
      setAnimationCompleted(true);
    }
  };

  useEffect(() => {
    let lastDeltaY = 0;  // New variable to store the last deltaY value
    
    const handleWheelScroll = (event) => {
      const desiredScroll = window.scrollY + event.deltaY * scrollFactor;
      handleScrollLogic(desiredScroll);
    };

    const handleTouchMove = (event) => {
      const currentDeltaY = event.touches[0].clientY;
      const changeInTouch = currentDeltaY - lastDeltaY;  // How much touch has moved since the last touchmove event
      const desiredScroll = window.scrollY + changeInTouch * scrollFactor;  // Adjust the scroll value incrementally
      handleScrollLogic(desiredScroll);
      lastDeltaY = currentDeltaY;  // Update the lastDeltaY value
    };

    if (!animationCompleted) {
      window.addEventListener("wheel", handleWheelScroll, { passive: false });
      window.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      window.removeEventListener("wheel", handleWheelScroll);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [animationCompleted, svgRef]);
    
  return (
    <Container>
      <TopHeader >
        
      </TopHeader>
      <SVGAndHeaderTextWrapper>
        <BackgroundSVG /> 
        <AnimatedSVG ref={svgRef} offset={offset} strokeLength={strokeOffset} />
      </SVGAndHeaderTextWrapper> 
        <HomeHeader isVisible={isVisible}>
          en Palma de Mallorca <br></br> y online
        </HomeHeader>
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