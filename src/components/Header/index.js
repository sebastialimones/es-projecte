import React from 'react';
import styled from 'styled-components';

import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { red, Sizes } from '../../constants';

const Container = styled.header`
  align-items: center;
  border-bottom: 2px solid ${red};
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
`;

export const Header = () => (
  <Container>
    <Logo size={ Sizes.S } />
    <Navigation />
  </Container>
);
