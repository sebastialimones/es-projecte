import React from 'react';
import { Dock } from 'react-dock';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { substackYellowBackground } from '../../constants';
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
  background-color: ${substackYellowBackground};
`;

const NavigationContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 15em;
  justify-content: space-around;
  margin: auto 0;
`;

const Item = styled.div`
  font-size: 1.5em;
`;

export const MobileNavigation = ({ isVisible, toggleVisibility, onContactClick }) => {
  const handleContactClick = () => {
    toggleVisibility();
    onContactClick();
  };

  return (
    <Dock position="top" isVisible={isVisible} size={1}>
      <CloseContainer>
        <Icon onClick={toggleVisibility} type="times" />
      </CloseContainer>
      <ContentContainer>
        <NavigationContainer>
          <ItemLink to="/blog">artículos</ItemLink>
          <ItemLink to="/bio">bio</ItemLink>
          <ItemLink to="/books">libros</ItemLink>
          <Item onClick={ handleContactClick } style={{ cursor: 'pointer' }}>
            contacto
          </Item>
        </NavigationContainer>
      </ContentContainer>
    </Dock>
  );
};
