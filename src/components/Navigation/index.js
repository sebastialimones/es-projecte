import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { red } from '../../constants';

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  display: inline;
  margin: 0.5em;
  &:hover {
    color: ${red};
  }
`;

export const Navigation = () => (
  <List>
    <ListItem><Link to="/blog">Artículos</Link></ListItem>
    <ListItem><Link to="/articles/qui-som">Bio</Link></ListItem>
    <ListItem><Link to="/books">Biblioteca</Link></ListItem>
  </List>
);
