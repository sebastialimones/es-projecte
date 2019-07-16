import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const height = '3em';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
  height: ${height};
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 1em;
  color: red;
`;

export const Footer = () => (
  <Container>
    <StyledLink to="/subscriute">Subscriu-te</StyledLink>
  </Container>
)