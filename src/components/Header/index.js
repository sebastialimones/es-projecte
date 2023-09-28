import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { TimelineMax, Power2, gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { useTagFilter } from '../../context/tagFilterContext';
import { Logo } from '../Logo';
import { Navigation } from '../../containers/Navigation';
import { red, Sizes } from '../../constants';

export const height = '5.5em';

const Container = styled.div``;

const LogoContainer = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
`;

const Subtitle = styled.div`
  font-style: italic;
`;

const RedLine = styled.div`
  border-top: 2px solid ${red};
`;

const TagContainer = styled.div`
  font-size: 1.1em;
  padding-bottom: 0.4em;
`;

const Tag = styled.a`
  color: gray;
  font-size: 0.8em;
  padding-right: 0.3em;
  margin-right: 0.3em;
  border-radius: 0.1em;
  background-color: ${(props) => {
    return props.backgroundColor;
  }};
`;

export const Header = () => {
  const redLineRef = useRef(null);
  const SubtitleRef = useRef(null);
  const TagRef = useRef(null)
  const location = useLocation();
  const { tagFilter } = useTagFilter();
  const [headerContent, setHeaderContent] = useState();

  const tl = new TimelineMax();
  gsap.registerPlugin(CSSPlugin);
  
  useEffect( () => {
    tl.fromTo(SubtitleRef.current, 1, { x: "-100%", opacity: 0}, { x: "0%", ease: Power2.easeInOut, opacity: 1} )    
  });

  useEffect(() => {
    if (location.pathname === '/blog' && tagFilter) {
      setHeaderContent(<Tag ref={TagRef} backgroundColor={tagFilter.color}>#{tagFilter.text}</Tag>);
    } else {
      setHeaderContent(<Subtitle ref={SubtitleRef}>{subtitleMapper(location.pathname)}</Subtitle>);
    }
  }, [location.pathname, tagFilter]);

  const subtitleMapper = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Terapia gestalt y mediación';
      case '/blog/qui-som':
        return '';
      case '/blog':
        return 'Artículos';
      case '/books':
        return 'Biblioteca';
      case '/subscriute':
        return 'Suscríbete';
      case '/cookiesPolicy':
        return 'Cookies';
      default:
        return '/';
    }
  };

  return (
    <Container>
      <LogoContainer>
        <Logo size={Sizes.S} />
        <Navigation />
      </LogoContainer>
      <TagContainer>{headerContent}</TagContainer>
      <RedLine ref={redLineRef} />
    </Container>
  );
};