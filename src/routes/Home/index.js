import React, { useState, useEffect } from 'react';
import { ReactComponent as MyDrawing } from '../../assets/Face.svg';
import { ReactComponent as ClaudioDrawing } from '../../assets/Claudio1.svg';
import media from '../../constants/media';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3em;
`;

const HeroContainer = styled.div`
  display: flex;
  /* align-items: center;  */
  justify-content: center;
  gap: 4em; // Adjust this value to change the distance between the SVGs
  padding-top: 4em;
`;


const ANIMATION_DURATION_SECONDS = 10; // Convert to seconds
const ANIMATION_START= 5000;

const commonSVGStyles = `
  width: 35%;
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

const StyledClaudioSVG = styled(ClaudioDrawing)`
  ${commonSVGStyles}
  width: 28%; // Adjust as needed
  margin: 0; // Remove any margins
  path {
    stroke: #4A4A4A;
    stroke-dasharray: 1;
    animation: ${draw} ${ANIMATION_DURATION_SECONDS}s forwards;
  }
`;

const FlippedSVG = styled(StyledSVG)`
  transform: scaleX(-1);
`;

const LeftSender = styled.span`
  background-color: #fff; // White background
  align-self: flex-start; // Align to the left
    &::after {
      content: '12:34'; // Example timestamp
      font-size: 0.6em;
      position: absolute;
      bottom: 5px;
      right: 10px;
      color: #888;
    }
`;

const RightSender = styled.span`
  background-color: #DCF8C6; // WhatsApp green
  align-self: flex-end; // Align to the right
  margin-left: auto; // Push the message to the right
    &::after {
      content: '12:35'; // Example timestamp
      font-size: 0.6em;
      position: absolute;
      bottom: 5px;
      right: 10px;
      color: #888;
    }
`;

const Title = styled.div`
  font-size: 1.5em; 
  line-height: 1.5; 
  width: 70%; // Limiting the width for better resemblance
  margin: 0 auto; // Centering the conversation

  & > span {
    display: block; 
    padding: 0.8em 1em; 
    border-radius: 10px; 
    margin-bottom: 0.5em; 
    max-width: 70%; // Messages don't usually span the full width
    position: relative; // For positioning the timestamp
  }

  ${media.smallScreen`
    font-size: 1.2em; 
    width: 90%; // More width on smaller screens
  `}
`;

const LeftSvg = styled(FlippedSVG)`
  ${media.smallScreen`
  `}
`;

const Quote = styled.div`
  font-size: 1.5em; // Adjust font size as needed
  flex: 1; // This will make the quote take up the remaining space in the Box
  padding-right: 1em; // Add some padding to separate it from the SVG
  font-style: italic; // Set the font to italics
  color: gray; // Set the font color to gray
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  height: 17em;
  border: 2px solid gray;
  padding: 1em; // Adjust padding as needed
  margin-top: 3em;
  margin-bottom: 3em;
  border-radius: 8px;
`;

const BoxDictionary = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 1.2em; // Adjust font size for readability
  color: #333; // Slightly gray color for softer text
  flex: 1; 
  padding-right: 1em; 
  padding: 1em; // Padding inside the quote for spacing
  border-left: 3px solid #666; // A left border to signify a quote or entry
  margin-left: 1em; // Margin to separate the border from the text
  line-height: 1.5; // Line height for better readability
  margin-top: 4em;
  margin-bottom: 4em;

  // If you want to add a citation or source after the quote
  &::after {
    content: '- Author or Source'; 
    display: block;
    margin-top: 0.5em;
    font-size: 0.9em;
    font-style: italic;
  }
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
      <HeroContainer>
        {/* <LeftSvg /> */}
        <Title>
          <LeftSender>- Hola, som en Tià <br></br>i som terapeuta gestlat</LeftSender>
          <RightSender>- Ges... què?</RightSender>
          <LeftSender>- Gestalt</LeftSender>
        </Title>
      </HeroContainer>
      <BoxDictionary>
      gestalt (del alemán "Gestalt", forma, figura) <br></br> 
      f. Psicol. Teoría que considera que los fenómenos psicológicos, especialmente la percepción, se organizan de manera innata en configuraciones o totalidades, y que estas no pueden reducirse al estudio de sus elementos.
      </BoxDictionary>
      <Title>
        <RightSender>- Ejem... <br></br></RightSender>
        <LeftSender>- Perdó <br></br></LeftSender>
      </Title>
      <Box>
        <Quote>"Parece que uno va a enriquecerse, para ser más, para ser más grande. Sin embargo, el proceso de transformación es de empobrecimiento; es más de renuncia. Es como ir a por lana y salir trasquilado..."</Quote>
        <StyledClaudioSVG />
      </Box>
    </Container>
  );
};

export default HomeRoute;