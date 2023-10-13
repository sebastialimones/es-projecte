import React, { useState, useEffect } from 'react';
import { withRouter, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '../../components/Icon';
import { MobileNavigation } from '../../components/MobileNavigation';
import { Navigation as DesktopNavigation } from '../../components/Navigation';
import media from '../../constants/media';

const SmallScreen = styled.div`
  display: none;
  margin-right: 1em;
  ${media.smallScreen`display: block;`}
`;

const LargeScreen = styled.div`
  display: block;
  margin-right: 1em;
  ${media.smallScreen`display: none;`}
`;

export const Nav = ({ setIsModalOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [route, setRoute] = useState();
  const match = useRouteMatch();
  
  useEffect(() => {
    if(route !== match){
        setIsVisible( false );
    };
    setRoute(match)
  },[match, route]);

  const toggleVisibility = () => {
    setIsVisible( !isVisible );
  };

  return (
    [
    <SmallScreen key="small">
      <div>
        {
          !isVisible && <Icon onClick={ toggleVisibility } type="bars" />
        }
        <MobileNavigation
          isVisible={ isVisible }
          toggleVisibility={ toggleVisibility }
        />
      </div>
    </SmallScreen>,
    <LargeScreen key="large">
      <DesktopNavigation onContactClick={() => setIsModalOpen(true)}/>
    </LargeScreen>
  ]);
};


export const Navigation = withRouter(Nav);