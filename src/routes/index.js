import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Article } from './Article';
import { Articles } from './Articles';
import { Layout } from './Layout';
import { Subscriute } from './Subscriute';

const renderWithLayout = (Component) => (props) => (
  <Layout { ...props }>
    <Component { ...props } />
  </Layout>
);

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ renderWithLayout(Articles) } />
      <Route exact path="/articles/:uid" component={ renderWithLayout(Article) } />
      <Route exact path="/subscriute" component={ renderWithLayout(Subscriute) } />
    </Switch>
  </Router>
);
