import React from 'react';
import { Helmet } from 'react-helmet';

import { Home as HomeComponent } from './Home';

export const Home = () => [
  <Helmet key="helmet">
    <meta name="description" content="Es Projecte" />
  </Helmet>,
  <HomeComponent key="route" />
];
