import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Article } from './Article';
import { Articles } from './Articles';
import { Home } from './Home';
import { Layout } from './Layout';

const renderWithLayout = (Component) => (props) => (
  <Layout { ...props }>
    <Component { ...props } />
  </Layout>
);

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/articles/:uid" component={ renderWithLayout(Article) } />
      <Route exact path="/articles" component={ renderWithLayout(Articles) } />
    </Switch>
  </Router>
);
