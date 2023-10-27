import React from 'react';
import styled from 'styled-components';

const BoxedWordClockWiseComponent = styled.span`
  display: inline-block;
  vertical-align: baseline;
  padding: 2px 6px;
  margin: -2px 0;
  z-index: 4;
  position: relative;   
  border: 2px solid black;
  transform: rotate(-3deg);
  transition: transform 0.3s ease;
  z-index: 4;
  position: relative;
  &:hover {
    transform: rotate(-12deg);
  }
`;

const BoxedWordClockWise = ({ children }) => {
  return (
    <BoxedWordClockWiseComponent>
      {children}
    </BoxedWordClockWiseComponent>
  );
};

export default BoxedWordClockWise;