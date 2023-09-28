import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { substackdarkerYellowBackground } from '../../constants/index'
import media from '../../constants/media'

export const height = '3em';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  height: ${height};
  background-color: ${substackdarkerYellowBackground};
  padding-bottom: 1em;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 1em;
  ${media.smallScreen`font-size: 10px;`}
  color: #FF0100;
  padding-top: 1em;
`;

const Text = styled.p`
  margin-right: 1rem;
  text-align: center;
  ${media.smallScreen`font-size: 10px;`}
  padding-top: 1em;
`;

export const Footer = () => (
  <Container>
    <Text>© Sebastià Limones, 2023</Text>
    <Text>|</Text>
    <Text>Tots els drets reservats</Text>
    <Text>|</Text>
    <StyledLink to="/subscriute">Suscríbete</StyledLink>
  </Container>
)