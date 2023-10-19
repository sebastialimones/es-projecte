import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ClaudioDrawing } from '../../assets/Claudio1.svg';
import styled, { keyframes, css } from 'styled-components';
import AvatarComponent from '../../components/Avatar';
import ProfileModal from '../../components/ProfileModal';
import media from '../../constants/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4em;
  padding-bottom: 3em;
  ${media.smallScreen`
    padding-top: 1.5em; 
  `}
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

const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  opacity: ${props => props.animate ? '1' : '0'}; // Only show when animate is true
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

const LeftMessageGifWrapper = styled.div`
  background-color: #fff;
  align-self: flex-start;
  padding: 1em 10.em 1em 0.8em;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 30%; // This will make it consistent with the other messages
  margin-bottom: 0.7em;
  opacity: 0; // Start with opacity 0
  img {
    width: 100%; // This will make the gif take up the full width of the RightMessageGifWrapper
    height: auto;
    display: block;
    border-radius: 10px;
  }
  &.visible {
    animation: ${slideUpFadeIn} 0.8s forwards;
  }
`;

const LeftMessage = styled.span`
  background-color: #fff;
  align-self: flex-start;
  padding: 1em 1.2em 1em 0.8em;
  min-width: 10%;
  opacity: 0; // Start with opacity 0
  transform: translateY(20px);
  a {
    color: blue; 
    text-decoration: none; 
    word-break: break-all;
  }
  &.visible {
    animation: ${slideUpFadeIn} 0.8s forwards;
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
  padding: 1em 10.em 1em 0.8em;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 70%; // This will make it consistent with the other messages
  margin-bottom: 0.7em;
  opacity: 0; // Start with opacity 0
  img {
    width: 100%; // This will make the gif take up the full width of the RightMessageGifWrapper
    height: auto;
    display: block;
    border-radius: 10px;
  }
  &.visible {
    animation: ${slideUpFadeIn} 0.8s forwards;
  }
`;

const RightMessage = styled.span`
  background-color: #DCF8C6;
  align-self: flex-end;
  margin-left: auto;
  padding: 1em 1.2em 1em 0.8em; // Increased left padding
  min-width: 10%;
  opacity: 0; 
  transform: translateY(20px);
  &.visible {
    animation: ${slideUpFadeIn} 0.8s forwards;
  }
`;

const initialTime = new Date(); // Set to any initial time you want
initialTime.setHours(12, 35, 0); // Setting it to 12:35:00

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};


const messages = [
  { type: 'right', text: 'Hola, eres Sebastià?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'left', text: 'Sii, soy yo!', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'right', text: 'Trabajas como terapeuta verdad? Mi amiga Maria me ha pasado tu contacto', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
  { type: 'left', text: 'Sii 😄', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'right', text: 'Me ha comentado que trabajas con terapia gestalt?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
  { type: 'left', text: 'Si, trabajo desde la terapia gestalt, la conoces?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'right', text: 'Me ha contado un poco María pero si me puedes hacer un resumen...', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'left', text: 'hahah, mira la gestalt intenta que aprendamos a estar en el mundo de otra manera. Estar más presentes, más despiertos y más consciente de lo nos pasa', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) },
  { type: 'left', text: 'Más dispuestos a darnos cuenta y después, con lo que vamos viendo, asumir nuestra parte, nuestra responsabilidad y', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'left', text: 'Confiar en nuestra regulación, es decir, confiar en que sabremos encontrar la manera de seguir adelante con lo que vamos viendo', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
  { type: 'right', text: 'https://media.giphy.com/media/XQq8UMo254P16/giphy.gif', isGif: true , time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2)))},
  { type: 'left', text: 'jajajaaj', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'right', text: 'Y trabajas presencial o también online?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
  { type: 'left', text: 'Presencial en Palma de Mallorca y online donde sea...', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 3))) },
  { type: 'right', text: 'Puedo saber más de tí?', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { 
    type: 'left', 
    text: 'claro! mira aquí <a href="https://sebastialimones.com/bio">Bio</a> o aquí <a href="https://sebastialimones.com/blog">Blog</a>', 
    time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 2))) 
  },
  { type: 'right', text: 'Gracias, te digo cosas!', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'left', text: 'A ti, me encanta esta expresión "te digo cosas"', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 1))) },
  { type: 'right', text: 'Cosas!', time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 0))) },
  { type: 'left', text: 'https://media.giphy.com/media/xUA7b2eF4mLdGLBWfK/giphy.gif',isGif: true , time: formatTime(new Date(initialTime.setMinutes(initialTime.getMinutes() + 0))) },

];

const Message = ({ message, index }) => {
  const messageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current);
      }
    };
  }, []);

  if (message.type === 'right') {
    if (message.isGif) {
      return (
        <RightMessageGifWrapper
          key={index}
          ref={messageRef}
          className={isVisible ? 'visible' : ''}
        >
          <img src={message.text} alt="GIF Message" />
          <Time>{message.time}</Time>
        </RightMessageGifWrapper>
      );
    }
    return (
      <RightMessage
        key={index}
        ref={messageRef}
        className={isVisible ? 'visible' : ''}
      >
        {message.text}
        <Time>{message.time}</Time>
      </RightMessage>
    );
} else {
    if (message.isGif) {
      return (
        <LeftMessageGifWrapper
          key={index}
          ref={messageRef}
          className={isVisible ? 'visible' : ''}
        >
          <img src={message.text} alt="GIF Message" />
          <Time>{message.time}</Time>
        </LeftMessageGifWrapper>
      );
    }
    return (
      <LeftMessage
        key={index}
        ref={messageRef}
        className={isVisible ? 'visible' : ''}
      >
        <span dangerouslySetInnerHTML={{ __html: message.text }} />
        <Time>{message.time}</Time>
      </LeftMessage>
    );
  };
};

const HomeRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <AvatarComponent setIsModalOpen={setIsModalOpen} />
      <ProfileModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
      />
      <Title>
        {messages.map((message, index) => (
          <Message key={index} message={message} index={index} />
        ))}
      </Title>
    </Container>
    );
};

export default HomeRoute;