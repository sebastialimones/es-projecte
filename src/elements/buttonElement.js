import React from 'react';
import styled from 'styled-components';
import media from '../constants/media';

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    background-color: red;
    color: white;
    &:hover {
    }
    &:active {
        transform: scale(0.99);
    }
    ${media.smallScreen`
      width: 90px;
      padding: 8px 5px;
  `}
`;

const PlusSign = styled.span`
  margin-right: 5px;
  font-size: 1.2em;
  ${media.smallScreen`
    margin-right: 2px;
    font-size: 1em;
  `}
`;

const Text = styled.span`
  font-weight: bold;
  ${media.smallScreen`
    margin-right: 0px;
    font-size: 1em;
  `}
`;

export const SubscribeButton = () => {
  return (
    <Button onClick={() => console.log("Button clicked!")}>
      <PlusSign>+</PlusSign>
      <Text>Suscríbete</Text>
    </Button>
  );
};