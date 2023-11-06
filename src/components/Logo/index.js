import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColor } from '../../constants';

const StyledLogo = styled.div`
  font-family: 'PlaakBold';
  font-size: 2.5em;
  margin-top: -9px;
  display: inline-block;
  position: relative;
  z-index: 300;
  border-bottom: 4px solid ${mainColor};
  overflow: hidden;
`;

export const Logo = ({ children }) => (
  <Link to="/">
    <StyledLogo>{children}</StyledLogo>
  </Link>
);