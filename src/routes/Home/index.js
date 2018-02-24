import React from 'react';
import styled from 'styled-components';

import background from './sky_bird.jpg';

const red = '#EA1616';

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

const FirstTD = styled.td`
  padding-right: 1em;
`;

const Title = styled.h1`
  font-size: 4em;
  font-weight: normal;
`;

const SubTitle = styled.h4`
  color: ${red};
  text-transform: uppercase;
`;

const List = styled.ul`
  link-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: inline;
  margin: 0.5em;
`

export const Home = () => (
  <Container>
    <Content>
      <div>
        <table>
          <tbody>
            <tr>
              <FirstTD>
                <Title>es</Title>
              </FirstTD>
              <td>
                <Title>projecte</Title>
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <SubTitle>{ `eines per a l'adultesa` }</SubTitle>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ContainerLinks>
        <List>
          <ListItem>Articles</ListItem>
          <ListItem>Projecte</ListItem>
          <ListItem>Qui som</ListItem>
        </List>
      </ContainerLinks>
    </Content>
  </Container>
);
