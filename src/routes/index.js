import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Article } from './Article';
import Home from './Home';
import HomeDraft from './Home/index2';
import { Books } from './Books';
import { Layout } from './Layout';
import { Subscriute } from './Subscriute';
import { CookiesPolicy } from './CookiesPolicy';
import { Blog } from './Blog';
import { Bio } from './Bio';
import useIsMobile from '../hooks/isMobile';
import HomeMobile from './HomeMobile';

export const Routes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderWithLayout = (Component, extraProps = {}, route) => (props) => {
    const isMobile = useIsMobile();
    
    if (route === '/homedraft' && isMobile) {
      return (
        <Layout {...props}>
          <HomeMobile {...props} {...extraProps} />
        </Layout>
      );
    } else {
      return (
        <Layout {...props}>
          <Component {...props} {...extraProps} />
        </Layout>
      );
    }
  };

  return (  
    <Router>
      <Switch>
      <Route 
        exact 
        path="/" 
        component={renderWithLayout(Home, { setIsModalOpen })}
      />
      <Route 
        exact 
        path="/homedraft" 
        component={renderWithLayout(HomeDraft, { setIsModalOpen }, '/homedraft')}
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
