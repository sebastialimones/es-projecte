import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const height = '3em';

const Container = styled.footer`
  align-items: center;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row-reverse;
  height: ${height};
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 0.8em;
`;

export const Footer = () => (
  <Container>
    <StyledLink to="/subscriute">Subscriute</StyledLink>
  </Container>
)