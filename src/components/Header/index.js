import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TimelineMax, Power2, gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'
import { useLocation } from 'react-router-dom'

import { Logo } from '../Logo';
import { Navigation } from '../../containers/Navigation';
import { red, Sizes } from '../../constants';

export const height = '5.5em';

const Container = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
`;

const Subtitle = styled.div`
  margin-bottom: 0.5em;
  font-style: italic;
`;

const RedLine = styled.div`
  border-top: 2px solid ${red};
`;

export const Header = () => {
  const redLineRef = useRef(null);
  const SubtitleRef = useRef(null)
  const location = useLocation();

  const tl = new TimelineMax();
  // Force CSSPlugin to not get dropped during build. Error only in production.
  gsap.registerPlugin(CSSPlugin)

  useEffect( () => {
    tl.fromTo(SubtitleRef.current, 1, { x: "-100%", opacity: 0}, { x: "0%", ease: Power2.easeInOut, opacity: 1} )    
  });

  const subtitleMapper = (location) => {
    switch(location) {
      case "/":
        return "Terapia gestalt y mediación"
      case "/blog/qui-som":
        return "" 
      case "/blog":
        return "Artículos"
      case "/books":
        return "Biblioteca"
      case "/subscriute":
        return "Suscríbete"
      case "/cookiesPolicy":
        return "Cookies"
      default:
        return "/"
      };
  };

  return (
    <React.Fragment>
      <Container >
        <Logo size={ Sizes.S } />
        <Navigation />
      </Container>
        <Subtitle ref={ SubtitleRef }>
          { subtitleMapper(location.pathname) }
        </Subtitle>
      <RedLine ref={ redLineRef } />
    </React.Fragment>
  )
};
