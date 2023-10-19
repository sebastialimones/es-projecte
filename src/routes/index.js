import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Article } from './Article';
import Home from './Home';
import { Books } from './Books';
import { Layout } from './Layout';
import { Subscriute } from './Subscriute';
import { CookiesPolicy } from './CookiesPolicy';
import { Blog } from './Blog';
import { Bio } from './Bio';

const renderWithLayout = (Component, extraProps = {}) => (props) => (
  <Layout { ...props }>
    <Component { ...props } {...extraProps} />
  </Layout>
);

export const Routes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (  
    <Router>
      <Switch>
      <Route 
        exact 
        path="/" 
        component={renderWithLayout(Home, { setIsModalOpen })}
      />     
      <Route exact path="/blog" component={ renderWithLayout(Blog) } />
      <Route exact path="/bio" component={renderWithLayout(Bio)} />
      <Route exact path="/articles/:uid" component={ renderWithLayout(Article) } />
      <Route exact path="/books" component={ renderWithLayout(Books) } />
      <Route exact path="/subscriute" component={ renderWithLayout(Subscriute) } />
      <Route exact path="/cookiesPolicy" component={ renderWithLayout(CookiesPolicy) } />
      </Switch>
    </Router>
  );
};
