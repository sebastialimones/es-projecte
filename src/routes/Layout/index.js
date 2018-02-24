import React from 'react';
import styled from 'styled-components';

import { Header } from '../../components/Header';

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
`;

export const Layout = ({ children }) => (
  <Container>
    <Header />
    { children }
  </Container>
);
