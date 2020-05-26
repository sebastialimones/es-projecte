import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blueFarnam } from '../../constants/index'

export const height = '3em';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
  height: ${height};
  color: ${blueFarnam};
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 1em;
  color: red;
`;

const Text = styled.p`
  margin-right: 1rem;
  text-align: center;
`;

export const Footer = () => (
  <Container>
    <Text>© Es projecte 2020</Text>
    <Text>|</Text>
    <Text>Tots els drets reservats</Text>
    <Text>|</Text>
    <StyledLink to="/subscriute">Subscriu-te</StyledLink>
  </Container>
)