import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ClaudioDrawing } from '../../assets/Claudio1.svg';
import media from '../../constants/media';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3em;
`;

const ANIMATION_DURATION_SECONDS = 10; // Convert to seconds

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

const StyledClaudioSVG = styled(ClaudioDrawing)`
  ${commonSVGStyles}
  margin: 0; // Remove any margins
  path {
    stroke: #4A4A4A;
    stroke-dasharray: 1;
    animation: ${draw} ${ANIMATION_DURATION_SECONDS}s forwards;
  }
  ${media.smallScreen`
    margin-top: 1em; // Add some top margin to separate from the quote
  `}
`; 

const StyledClaudioSVGWithStyles = styled(({ animate, ...props }) => <StyledClaudioSVG {...props} />)`
  width: 60%; // Adjust as needed
  height: auto;
  path {
    stroke-dashoffset: ${props => props.animate ? '0' : '1'};
    animation: ${props => props.animate ? css`${draw} ${ANIMATION_DURATION_SECONDS}s forwards` : 'none'};
  }
  ${media.smallScreen`
    width: 90%; // Adjust as needed
  `}
`;

const StyledClaudioSVGWithStylesContainer = styled.div`
  display: flex;
  justify-content: center;
`;


const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4em;
  font-size: 1.5em; 
  line-height: 1.5; 
  margin: 0 auto;
  font-family: 'Arial', sans-serif; // A common sans-serif font
  & > span {
    display: block; 
    border-radius: 10px; 
    margin-bottom: 0.5em; 
    max-width: 70%; 
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); // Adding a slight shadow
  }
  ${media.smallScreen`
    font-size: 1.2em; 
    width: 90%;
  `}
`;

const LeftSender = styled.span`
  background-color: #fff;
  align-self: flex-start;
  padding: 1em 1.2em 1em 0.8em; // Increased left padding
  min-width: 10%;

  &::after {
    content: '12:35';
    font-size: 0.6em;
    position: absolute;
    bottom: 10px; // Adjusted position
    right: 15px; // Adjusted position
    color: #888;
    bottom: 0.5em; // Adjust as needed
    right: 0.5em;
  }
`;

const RightSenderGifWrapper = styled.div`
  background-color: #DCF8C6;
  align-self: flex-end;
  padding: 1em 1.2em 1em 0.8em;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 70%; // This will make it consistent with the other messages
  margin-bottom: 0.7em;
  &::after {
    content: '12:35';
    font-size: 0.6em;
    position: absolute;
    bottom: 0.3em;
    right: 0.5em;
    color: #888;
  }

  img {
    width: 100%; // This will make the gif take up the full width of the RightSenderGifWrapper
    height: auto;
    display: block;
    border-radius: 10px;
  }
`;

const RightSender = styled.span`
  background-color: #DCF8C6;
  align-self: flex-end;
  margin-left: auto;
  padding: 1em 1.2em 1em 0.8em; // Increased left padding
  min-width: 10%;

  &::after {
    content: '12:35';
    font-size: 0.6em;
    position: absolute;
    bottom: 10px; // Adjusted position
    right: 15px; // Adjusted position
    color: #888;
    bottom: 0.5em; // Adjust as needed
    right: 0.5em;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 17em;
  border: 2px solid #FFD1B3;
  padding: 1em;
  margin-top: 3em;
  margin-bottom: 3em;
  border-radius: 8px;
  overflow: hidden;
  background-color: #FFD1B3; 

  ${media.smallScreen`
    height: auto;
    padding: 0.5em;
    margin-top: 2em;
    margin-bottom: 2em;
    border-radius: 4px;
  `}
`;

const Quote = styled.div`
  font-size: 1.5em;
  padding-right: 1em;
  font-style: italic;
  color: #333333;
  max-width: 50%;
  &::after {
    content: '- Claudio Naranjo'; 
    display: block;
    margin-top: 0.5em;
    font-size: 0.9em;
    font-style: italic;
  }
  ${media.smallScreen`
    font-size: 1em;
    padding-right: 0.5em;
    max-width: 70%;
  `}
`;

const HomeRoute = () => {
  const claudioRef = useRef(null);
  const [isClaudioVisible, setIsClaudioVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsClaudioVisible(true);
        }
      },
      {
        threshold: 0.4,
      }
    );
  
    if (claudioRef.current) {
      observer.observe(claudioRef.current);
    }
  
    return () => {
      if (claudioRef.current) {
        observer.unobserve(claudioRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <Title>
        <RightSender>Hola, eres Tià el terapeuta?</RightSender>
        <LeftSender>Sii, soy yo, terapeuta Gestalt</LeftSender>
        <RightSender>Ges... qué?</RightSender>
        <LeftSender>Gestalt</LeftSender>
        <RightSender>😅</RightSender>
        <LeftSender> Te explico como es para mi.</LeftSender>
        <LeftSender> La gestalt es una terapia humanista pero sobre todo una manera de estar en el mundo.</LeftSender>
        <RightSender>Y cuál es esta manera?</RightSender>
        <LeftSender> Estar en el aquí y el ahora, es decir, más despierto, más consciente de lo que te pasa. </LeftSender>
        <LeftSender> Más dispuesto a darte cuenta, a verlo! y después con lo que ves asumir tu responsabilidad, y confiar </LeftSender>
        <LeftSender> Confiar en tu propia regulación, que es lo mismo que decir, confiar en que sabrás encontrar la manera de seguir adelante con esto </LeftSender>
        <RightSenderGifWrapper>
            <img src="https://media.giphy.com/media/XQq8UMo254P16/giphy.gif" alt="GIF Message" />
        </RightSenderGifWrapper>  
        <LeftSender>Claudio Naranjo lo explica mejor </LeftSender>
      </Title>
      <Box>
        <Quote>"La terapia gestáltica no ha surgido como aplicación de un cuerpo teórico sino que más bien es un asunto de estar en el mundo de una cierta manera..."</Quote>
        {/* <StyledClaudioSVG ref={claudioRef} animate={isClaudioVisible} />   */}
        <StyledClaudioSVGWithStylesContainer ref={claudioRef}>
          <StyledClaudioSVGWithStyles animate={isClaudioVisible} />
        </StyledClaudioSVGWithStylesContainer>   
      </Box>
      <Box>
      </Box>
    </Container>
  );
};

export default HomeRoute;