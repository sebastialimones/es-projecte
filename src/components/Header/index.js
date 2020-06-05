import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TimelineMax, Power2 } from 'gsap';

import { Logo } from '../Logo';
import { Navigation } from '../../containers/Navigation';
import { red, Sizes } from '../../constants';

export const height = '5.5em';

const Container = styled.header`
  align-items: center;
  display: flex;
  height: ${height};
  justify-content: space-between;
`;

const RedLine = styled.div`
  border-top: 2px solid ${red};
`;

export const Header = () => {
  const redLineRef = useRef(null);
  const tl = new TimelineMax();

  useEffect( () => {
    tl.fromTo(redLineRef.current, 1.5, { x: "-100%", opacity: 0}, { x: "0%", ease: Power2.easeInOut, opacity: 1} )    
  });

  return (
    <React.Fragment>
      <Container >
        <Logo size={ Sizes.S } />
        <Navigation />
      </Container>
      <RedLine ref={ redLineRef } />
    </React.Fragment>
  )
};
