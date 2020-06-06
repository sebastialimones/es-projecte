import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import media from '../../constants/media';
import  { red, lightGrey } from '../../constants';
import Emoji from 'a11y-react-emoji';
import { TimelineMax, Power2 } from 'gsap';

const Wrapper = styled.div`
  font-size: 1em;
  position: fixed;
  bottom: 2em;
  padding: 1em;
  max-width: 20em;
  border: 1px solid ${ red };
  border-radius: 0.1em;
  background-color: #ffffff;

  ${media.smallScreen`
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: auto;
  `}
`;

const CookieText = styled.p`
  line-height: 1.5;
  font-size: 0.85rem;
  height: 100%;
  width: auto;
`;

const ButtonContainer = styled.div`
  ${media.smallScreen`
    margin-left: 0;
    width: auto;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonElement = styled.button`
  background-color: white;
  border: 1px solid ${ lightGrey };
  border-radius: 1em;
  padding: 8px;
  padding-left: 1em;
  padding-right: 1em;
:hover { background-color: ${ lightGrey } };
`;

const Link = styled.a`
  text-decoration: underline;
`;

export const CookiesContent = ({ onAccept }) => {
  const WrapperRef = useRef(null);
  const tl = new TimelineMax();
  
  useEffect( () => {
    tl.fromTo(WrapperRef.current, 1.5, { x: "-100%", opacity: 0}, { x: "0%", ease: Power2.easeInOut, opacity: 1} )    
  });

  return (
    <Wrapper ref={ WrapperRef }>
      <CookieText>
      <Emoji symbol="🍪" label="cookie"/> Per acceptar les cookies, prem Ok. Per saber-ne més: <Link href="./cookiesPolicy">Aquí</Link>
      </CookieText>
      <ButtonContainer>
        <ButtonElement onClick={ onAccept }>
          Ok!
        </ButtonElement>
      </ButtonContainer>
    </Wrapper>
  );
};
