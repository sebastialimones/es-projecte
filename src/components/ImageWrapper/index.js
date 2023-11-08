import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import media from '../../constants/media';

const Tooltip = styled.span`
  display: none;
  position: absolute;
  background-color: #FAF8F0;
  border: 2px solid black;
  padding: 2px 6px;
  font-size: 1em;
  bottom: 10px;
  right: 10px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${media.smallScreen`
    display: block;
    opacity: 1;
    font-size: clamp(12px, 4vw, 16px); // Responsive font size
    max-width: 90%; // Set a max-width to prevent overflow
    padding: 4px 8px; // Increase padding if needed
    white-space: normal; // Allow text wrapping
    line-height: 1.2; // Adjust line height to ensure readability
    overflow: hidden; // Hide overflow
  `}
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 20px;
  position: relative;
  margin-bottom: 0; 
  align-items: center;
  ${media.smallScreen`
    padding-bottom: 1em;
    padding-top: 1em;
  `}
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

const TherapistImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  display: block;
  height: auto;
`;

const ImageWrapperComponent = forwardRef(({ src, alt, tooltipText, maxWidth }, ref) => {
  return (
    <ImageContainer>
      <ImageWrapper 
        ref={ref}
        style={{
          maxWidth: maxWidth || '70%',
        }} 
      >
        <BorderTop />
        <BorderRight />
        <BorderBottom />
        <BorderLeft />
          <Tooltip>{tooltipText}</Tooltip>
          <TherapistImage src={src} alt={alt} />
      </ImageWrapper>
    </ImageContainer>
  );
});

export default ImageWrapperComponent;