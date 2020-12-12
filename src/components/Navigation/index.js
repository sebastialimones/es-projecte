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
    <ListItem><Link to="/">Articles</Link></ListItem>
    <ListItem><Link to="/articles/projecte">Projecte</Link></ListItem>
    <ListItem><Link to="/articles/qui-som">Qui som?</Link></ListItem>
    <ListItem><Link to="/books">Llibres</Link></ListItem>
    <ListItem><Link to="/subscriute">Subscriu-te</Link></ListItem>
  </List>
);
