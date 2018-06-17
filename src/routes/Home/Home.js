import { DateTime } from 'luxon';
import React from 'react';
import styled from 'styled-components';

import { Logo } from '../../components/Logo';
import { Navigation } from '../../components/Navigation';

const backgrounds = [
  `background: rgb(0,201,255);
  background: linear-gradient(90deg, rgba(0,201,255,1) 0%, rgba(146,254,157,1) 100%);`,
];

const randomNumberWeekday = DateTime.local().weekday % backgrounds.length;

const background = backgrounds[randomNumberWeekday];

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 100%;
  ${background}
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