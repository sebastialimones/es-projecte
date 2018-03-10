import React from 'react';
import readingTime from 'reading-time';
import styled from 'styled-components';

const Time = styled.p`
  text-transform: uppercase;
`;

export const ReadingTime = ({ text }) => {
  const minutes = Math.round(readingTime(text).minutes);
  return <Time><span>{ `temps de lectura: ${minutes} ${ minutes > 1 ? `minuts` : `minut` }` }</span></Time>;
};
