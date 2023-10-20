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

export const Navigation = ({ onContactClick, handleLinkClick }) => (
  <List>
    <ListItem><Link to="/" onClick={() => handleLinkClick('/')}>Inicio</Link></ListItem>
    <ListItem><Link to="/homedraft" onClick={() => handleLinkClick('/homedraft')}>Inicio2</Link></ListItem>
    <ListItem><Link to="/blog" onClick={() => handleLinkClick('/blog')}>Artículos</Link></ListItem>
    <ListItem><Link to="/bio" onClick={() => handleLinkClick('/bio')}>Bio</Link></ListItem>
    <ListItem><Link to="/books" onClick={() => handleLinkClick('/books')}>Biblioteca</Link></ListItem>
    <ListItem onClick={onContactClick} style={{ cursor: 'pointer' }}>Contacto</ListItem>
  </List>
);