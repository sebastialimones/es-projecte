import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mainColor } from '../../constants';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ListItem = styled.li`
  display: inline;
  margin: 0.5em;
`;

export const Navigation = ({ onContactClick }) => (
  <List>
    <ListItem><Link to="/blog">Artículos</Link></ListItem>
    <ListItem><Link to="/articles/qui-som">Bio</Link></ListItem>
    <ListItem><Link to="/books">Biblioteca</Link></ListItem>
    <ListItem onClick={ onContactClick } style={{ cursor: 'pointer' }}>Contacto</ListItem>
  </List>
);
