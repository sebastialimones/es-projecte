import React from 'react';
import styled from 'styled-components';

const BoxedWordClockWiseComponentNoAnimation = styled.span`
  display: inline-block;
  vertical-align: baseline;
  padding: 2px 6px;
  margin: -2px 0;
  z-index: 4;
  position: relative;   
  border: 2px solid black;
  transform: rotate(3deg);
  transition: transform 0.3s ease;
  z-index: 4;
  position: relative;
  &:hover {
    transform: rotate(6deg);
  }
`;

const BoxedWordClockWise2 = ({ children }) => {
  return (
    <BoxedWordClockWiseComponentNoAnimation>
      {children}
    </BoxedWordClockWiseComponentNoAnimation>
  );
};

export default BoxedWordClockWise2;