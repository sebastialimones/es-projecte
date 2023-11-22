import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import media from '../../constants/media';
import cactus from '../../assets/cactus.png';

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

const BackgroundImage = styled.div`
  background-image: url('imageWithCactus');
  background-size: cover;
  background-position: center;
  position: relative;
  max-width: 100%;
  height: auto;
`;

const CactusImage = styled.img`
  position: absolute;
  left: 14%; // Adjust this to where the cactus should be positioned
  bottom: 5%;  // Cactus is at the bottom of the container
  z-index: 2; // Cactus image is above the avatar
  max-width: 390px;
  // Set specific dimensions or use max-width/max-height as needed
`;

const Avatar = styled.img`
  position: absolute;
  bottom: 45%;  // Start at the bottom of the container
  left: 38%;  // Center horizontally or adjust to match cactus position
  transform: translate(-50%, 100%); // Initially move down behind the cactus
  height: 144px; // Set the size of your avatar
  z-index: 1; // Ensure the avatar is behind the cactus
  opacity: 1; // Start invisible
  transition: transform 0.5s ease-out; // Smooth transitions for movement and fading
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

const TherapistImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  display: block;
  height: auto;
`;

const ImageWrapperComponentForCactus = forwardRef(({ src, alt, maxWidth, avatarSrc }, ref) => {
  const avatarRef = useRef(null);

  useEffect(() => {
    const startScroll = 1600; // Scroll value where the animation starts
    const endScroll = 1780; // Scroll value where the animation ends
  
    const handleScroll = () => {
      if (avatarRef.current) {
        const scrollY = window.scrollY;
  
        // Calculate the scroll progress within the animation range
        let progress = (scrollY - startScroll) / (endScroll - startScroll);
  
        // Clamp the progress to the range of 0 to 1
        progress = Math.min(1, Math.max(0, progress));
  
        // Convert the progress to a translateY value
        // When progress is 0, translateY should be 100% (start position)
        // When progress is 1, translateY should be 0% (end position)
        const translateY = 80 - (80 * progress); 

        // Apply the translateY value to the avatar to move it up based on scroll
        avatarRef.current.style.transform = `translate(-50%, ${translateY}%)`;
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ImageContainer>
      <BackgroundImage ref={ref} style={{ maxWidth: maxWidth || '100%' }}>
        <CactusImage src={cactus} alt="Cactus" />
        {avatarSrc && (
          <Avatar 
            ref={avatarRef} 
            src={avatarSrc} 
            alt="Freud Avatar" 
            style={{ maxWidth: maxWidth || '70%' }}
          />
        )}
        <TherapistImage src={src} alt={alt} />
      </BackgroundImage>
    </ImageContainer>
  );
});

export default ImageWrapperComponentForCactus;