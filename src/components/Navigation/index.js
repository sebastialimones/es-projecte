import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  link-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: inline;
  margin: 0.5em;
`;

export const Navigation = () => (
  <List>
    <ListItem><Link to="/articles">Articles</Link></ListItem>
    <ListItem><Link to="/articles/projecte">Projecte</Link></ListItem>
    <ListItem><Link to="/articles/qui-som">Qui som</Link></ListItem>
  </List>
);
