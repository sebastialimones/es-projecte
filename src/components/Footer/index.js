import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { substackdarkerYellowBackground, mainColor } from '../../constants/index'
import media from '../../constants/media'

export const height = '2em';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${height};
  background-color: ${substackdarkerYellowBackground};
  padding-bottom: 1em;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 3em;
  ${media.smallScreen`
    margin-top: 0;
  `}
`;

const Text = styled.p`
  margin-right: 1rem;
  text-align: center;
  padding-top: 1em;
  ${media.smallScreen`
  font-size: 10px;
  `}
`;

export const Footer = () => (
  <Container>
    <Text>© Sebastià Limones, 2024</Text>
    <Text>|</Text>
    <Text>Tots els drets reservats</Text>
  </Container>
);
