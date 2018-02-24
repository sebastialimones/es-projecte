import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Article } from './Article';
import { Articles } from './Articles';
import { Home } from './Home';
import { Layout } from './Layout';

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Layout>
        <Route exact path="/articles" component={ Articles } />
        <Route exact path="/articles/:uid" component={ Article } />
      </Layout>
    </Switch>
  </Router>
);
