import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media from '../../constants/media';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-right: 35px;
  margin-top: 3em;
  font-size: 28.8px;
  font-family: 'Noe Display Medium', sans-serif; 
  ${media.smallScreen`
    padding-right: 10px;
  `}
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
    <ListItem onClick={onContactClick} style={{ cursor: 'pointer' }}>Contacto</ListItem>
    </List>
);
