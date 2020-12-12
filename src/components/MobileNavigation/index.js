import React from 'react';
import Dock from 'react-dock';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '../Icon';

const ItemLink = styled(Link)`
  font-size: 1.5em;
`;

const CloseContainer = styled.div`
  margin: 1em;
  position: absolute;
  right: 0;
  top: 0;
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const NavigationContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 15em;
  justify-content: space-around;
  margin: auto 0;
`;

export const MobileNavigation = ({ isVisible, toggleVisibility }) => (
  <Dock position="right" isVisible={ isVisible } size={ 1 }>
    <CloseContainer>
      <Icon onClick={ toggleVisibility } type="times" />
    </CloseContainer>
    <ContentContainer>
      <NavigationContainer>
        <ItemLink to="/">Articles</ItemLink>
        <ItemLink to="/articles/projecte">Projecte</ItemLink>
        <ItemLink to="/articles/qui-som">Qui som?</ItemLink>
        <ItemLink to="/books">Llibres</ItemLink>
        <ItemLink to="/subscriute">Subscriu-te</ItemLink>
      </NavigationContainer>
    </ContentContainer>
  </Dock>
);
