import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Article } from './Article';
import { Home } from './Home';
import { Books } from './Books';
import { Layout } from './Layout';
import { Subscriute } from './Subscriute';
import { CookiesPolicy } from './CookiesPolicy';
import { Blog } from './Blog';

const renderWithLayout = (Component) => (props) => (
  <Layout { ...props }>
    <Component { ...props } />
  </Layout>
);

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ renderWithLayout(Home) } />
      <Route exact path="/blog" component={ renderWithLayout(Blog) } />
      <Route exact path="/articles/:uid" component={ renderWithLayout(Article) } />
      <Route exact path="/books" component={ renderWithLayout(Books) } />
      <Route exact path="/subscriute" component={ renderWithLayout(Subscriute) } />
      <Route exact path="/cookiesPolicy" component={ renderWithLayout(CookiesPolicy) } />
    </Switch>
  </Router>
);
