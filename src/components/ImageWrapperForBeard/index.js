import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  padding-bottom: 1em;
  padding-top: 1em;
  ${media.smallScreen`
  `}
  &:hover ${Tooltip} {
    display: inline-block;
  }
`;

const ImageWrapper = styled.div`
  max-height: 100%;
 
  &:hover ${Tooltip} {
    display: block;
    opacity: 1;
  }
`;

const Avatar = styled.img`
  position: absolute;
  left: 0%; // Position off-screen to the right
  top: -7%; 
  transform-origin: center;
  height: 394px;
  z-index: 10;
  transform: translateX(100%); // Start off-screen for desktop
  transform: scale(0.5); // Initial scale, adjust as needed
  /* transition: transform 0.3s ease-in-out; */
  ${media.smallScreen`
    height: 244px;
    top: -4%; 
    left: -5%;
  `}
`;

const TherapistImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  display: block;
  height: auto;
`;

const ImageWrapperForBeardComponent = forwardRef(({ src, alt, maxWidth, avatarSrc, isMobile }, ref) => {
  const avatarRef = useRef(null);
  const secondAvatarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (avatarRef.current) {
        const scrollY = window.scrollY;
        const startScroll = isMobile ? 2600 : 2000;
        const endScroll = isMobile ? 3000 : 2300;
  
        let scale = 0.5; // Start from the initial scale
  
        if (scrollY > startScroll && scrollY < endScroll) {
          const progress = (scrollY - startScroll) / (endScroll - startScroll);
          scale = 0.5 + progress * 0.5; // Adjust the scaling factor as needed
        } else if (scrollY >= endScroll) {
          scale = 1;
        }
  
        avatarRef.current.style.transform = `scale(${scale})`;
      }
      
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <ImageContainer>
      <ImageWrapper ref={ref} style={{ maxWidth: maxWidth || '70%' }}>
        {avatarSrc && (
          <Avatar 
            ref={avatarRef} 
            src={avatarSrc} 
            alt="Avatar" 
          />
        )}
        <TherapistImage src={src} alt={alt} />
      </ImageWrapper>
    </ImageContainer>
  );
});

export default ImageWrapperForBeardComponent;