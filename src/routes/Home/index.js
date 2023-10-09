import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ClaudioDrawing } from '../../assets/Claudio1.svg';
import media from '../../constants/media';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4em;
  padding-bottom: 3em;
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
  width: 55%; 
  height: auto;
  path {
    stroke-dashoffset: ${props => props.animate ? '0' : '1'};
    animation: ${props => props.animate ? css`${draw} ${ANIMATION_DURATION_SECONDS}s forwards` : 'none'};
  }
  ${media.smallScreen`
    width: 90%; 
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
  padding-top: 1em;
  font-size: 1.5em; 
  line-height: 1.3; 
  margin: 0 auto;
  font-family: sans-serif; 
  width: 70%;
  & > span {
    display: block; 
    border-radius: 10px; 
    margin-bottom: 0.5em; 
    max-width: 70%; 
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); 
  }
  ${media.smallScreen`
    font-size: 1.2em; 
    width: 90%;
  `}
`;

const LeftMessage = styled.span`
  background-color: #fff;
  align-self: flex-start;
  padding: 1em 1.2em 1em 0.8em;
  min-width: 10%;
  a {
    color: blue; 
    text-decoration: none; 
    word-break: break-all;
  }
`;

const Time = styled.span`
  font-size: 0.6em;
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;
  color: #888;
`;

const RightMessageGifWrapper = styled.div`
  background-color: #DCF8C6;
  align-self: flex-end;
  padding: 1em 1.2em 1em 0.8em;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 70%; // This will make it consistent with the other messages
  margin-bottom: 0.7em;

  img {
    width: 100%; // This will make the gif take up the full width of the RightMessageGifWrapper
    height: auto;
    display: block;
    border-radius: 10px;
  }
`;

const RightMessage = styled.span`
  background-color: #DCF8C6;
  align-self: flex-end;
  margin-left: auto;
  padding: 1em 1.2em 1em 0.8em; // Increased left padding
  min-width: 10%;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #FFD1B3;
  padding: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
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
  font-size: 0.8em;
  padding-right: 0.7em;
  font-style: italic;
  color: #333333;
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


const initialTime = new Date(); // Set to any initial time you want
initialTime.setHours(12, 35, 0); // Setting it to 12:35:00

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};


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


  const messages = [
    { type: 'right', text: 'Hola, eres Tià el terapeuta?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'left', text: 'Sii, soy yo, terapeuta Gestalt', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'right', text: 'Ges... qué?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
    { type: 'left', text: 'Gestalt', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'right', text: '😅', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
    { type: 'left', text: 'hahaha', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'left', text: 'Mira, la gestalt es una terapia humanista pero sobre todo una manera de estar en el mundo', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
    { type: 'right', text: 'Y cuál es esta manera?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'left', text: 'Estar en el aquí y el ahora, más despierto y más consciente de lo que te pasa', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
    { type: 'left', text: 'Más dispuesto a darte cuenta y después, con lo que vas viendo, asumir tu responsabilidad, y confiar, eso es muy importante', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'left', text: 'Confiar en tu propia regulación, es decir, confiar en que sabrás encontrar la manera de seguir adelante con lo que vas viendo', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
    { type: 'right', text: 'https://media.giphy.com/media/XQq8UMo254P16/giphy.gif', isGif: true , time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2)))},
    { type: 'left', text: 'Claudio Naranjo lo explica mejor', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'right', text: 'Y trabajas presencial o también online?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
    { type: 'left', text: 'Presencial en Palma de Mallorca y online donde sea...', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
    { type: 'right', text: 'Puedo saber más de tí?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'left', text: 'claro! mira aquí https://sebastialimones.com/articles/qui-som o aquí https://sebastialimones.com/blog', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
    { type: 'right', text: 'Gracias!', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
    { type: 'left', text: 'A tí!', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) }
  ];

  const renderMessage = (message, index) => {
    if (message.type === 'right') {
        if (message.isGif) {
            return (
                <RightMessageGifWrapper key={index}>
                    <img src={message.text} alt="GIF Message" />
                    <Time>{message.time}</Time>
                </RightMessageGifWrapper>
            );
        }
        return (
            <RightMessage key={index}>
                {message.text}
                <Time>{message.time}</Time>
            </RightMessage>
        );
    } else {
        return (
            <LeftMessage key={index}>
                {message.text}
                <Time>{message.time}</Time>
            </LeftMessage>
        );
    }
};

  const splitIndex = 12; 
    const messagesBeforeBox = messages.slice(0, splitIndex + 1);
    const messagesAfterBox = messages.slice(splitIndex + 1);
  
  return (
    <Container>
      <Title>
          {messagesBeforeBox.map((message, index) => renderMessage(message, index))}
          <Box>
            <Quote>"La terapia gestáltica no ha surgido como aplicación de un cuerpo teórico sino que más bien es un asunto de estar en el mundo de una cierta manera..."</Quote>
            <StyledClaudioSVGWithStylesContainer ref={claudioRef}>
                <StyledClaudioSVGWithStyles animate={isClaudioVisible} />
            </StyledClaudioSVGWithStylesContainer>
          </Box>

          {messagesAfterBox.map((message, index) => renderMessage(message, index + splitIndex + 1))}
      </Title>
  </Container>
    );
};
export default HomeRoute;