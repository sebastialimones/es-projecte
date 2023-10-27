import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const StyledBoxedWordCounterClock = styled.span`
  display: inline-block;
  vertical-align: baseline;
  padding: 2px 6px;
  margin: -2px 0;
  z-index: 4;
  position: relative;

  & > div:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: black;
    animation: ${borderTopAnimation} 0.7s forwards 1s;
  }

  & > div:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    background: black;
    animation: ${borderRightAnimation} 0.7s forwards 1.7s;
  }

  & > div:nth-child(3) {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2px;
    background: black;
    animation: ${borderBottomAnimation} 0.7s forwards 2.4s;
  }

  & > div:nth-child(4) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2px;
    background: black;
    animation: ${borderLeftAnimation} 0.7s forwards 3.1s;
  }
`;

const BoxedWordCounterClock = ({ children }) => {
  return (
    <StyledBoxedWordCounterClock>
      {children}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledBoxedWordCounterClock>
  );
};

export default BoxedWordCounterClock;