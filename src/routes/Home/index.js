import React, { useState, useEffect } from 'react';
import { ReactComponent as MyDrawing } from '../../assets/Face.svg';
import media from '../../constants/media';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding-top: 6em;
`;

const ANIMATION_DURATION_SECONDS = 6; // Convert to seconds
const ANIMATION_START= 5000;

const commonSVGStyles = `
  width: 25%;
  position: absolute;
  top: 9em;
  z-index: 1;
  path {
    fill: none;
    stroke-width: 1;
  }

  ${media.mediumScreen`
    && {
      width: 10%;
    }
  `}

  ${media.smallScreen`
    &&& {
      width: 15%; 
      margin-top: 13em;
      color: red;
    }
  `}
`;

const draw = keyframes`
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledSVG = styled(MyDrawing)`
  ${commonSVGStyles}
  path {
    stroke: #4A4A4A;
    stroke-dasharray: 1;
    animation: ${draw} ${ANIMATION_DURATION_SECONDS}s forwards;  }
`;

const FlippedSVG = styled(StyledSVG)`
  transform: scaleX(-1);
`;

const LeftSVG = styled(StyledSVG)`
  left: 55%; // Adjust this value to move the left SVG more to the right
  ${media.smallScreen`
    left: 70%; // Move it closer to the left edge on mobile screens
  `}
`;

const RightSVG = styled(FlippedSVG)`
  right: 55%; // Adjust this value to move the right SVG more to the left
  ${media.smallScreen`
    right: 70%; // Move it closer to the left edge on mobile screens
  `}
`;

const Title = styled.h1`
  z-index: 2; // Ensure it's above the SVGs
  position: relative; // To make sure z-index applies
  margin: 0; // Remove default margin
  opacity: ${props => props.isVisible ? 1 : 0}; // Hide or show based on the isVisible prop
  transition: opacity 0.2s ease-in-out; // Optional: Smooth transition for the title appearance
  padding-top: 13em;
`;


const HomeRoute = () => {
  const [isTitleVisible, setTitleVisibility] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleVisibility(true);
    }, ANIMATION_START);

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted before the timer fires
  }, []);

  return (
    <Container>
      <LeftSVG />
      <Title isVisible={isTitleVisible}>Terapia gestalt</Title>
      <RightSVG />
    </Container>
  );
};

export default HomeRoute;