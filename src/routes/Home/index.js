import React from 'react';
import styled from 'styled-components';

import background from './sky_bird.jpg';
import { Logo } from '../../components/Logo';
import { Navigation } from '../../components/Navigation';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 100%;
  background: url(${background}) center center fixed;
  background-size: cover;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ContainerLinks = styled.div`
  margin-top: 1em;
`;

export const Home = () => (
  <Container>
    <Content>
      <div>
        <Logo />
      </div>
      <ContainerLinks>
        <Navigation />
      </ContainerLinks>
    </Content>
  </Container>
);
