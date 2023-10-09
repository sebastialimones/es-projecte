import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Logo } from '../Logo';
import { Navigation } from '../../containers/Navigation';
import { substackYellowBackground, Sizes } from '../../constants';
// import { SubscribeButton } from '../../elements/buttonElement';
import { useSpring, animated } from '@react-spring/web';
import media, {sizes} from '../../constants/media';

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${substackYellowBackground};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 0.5px solid rgba(255, 1, 0, ${props => props.borderOpacity || 0});
`;

const LogoContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 3em;
  ${media.smallScreen`
    padding-left: 1em;
  `}
`;

const NavbarWrapper = styled.div`
  position: relative;
  padding-top: calc(${props => props.isScrolled ? '0.5em' : '1em'});  
`;

const SubscribeButtonStyled = styled.div`
  padding-right: 3em;
  ${media.smallScreen`
    padding-right: 1em;
  `}
`;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const AnimatedTopRow = animated(TopRow);

  const logoAnimation = useSpring({
    transform: typeof window !== 'undefined' && window.innerWidth > sizes.smallScreen
    ? (isScrolled ? 'translateY(0%) scale(0.8)' : 'translateY(50%) scale(1)')
    : 'none',
    opacity: 1,
    config: { tension: 170, friction: 26 }
  });

  const headerAnimation = useSpring({
    height: isScrolled ? '5em' : '6em',
    borderOpacity: isScrolled ? 0 : 1,
    config: { tension: 170, friction: 26 }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarWrapper isScrolled={isScrolled}>
      <Container>
        <AnimatedTopRow borderOpacity={headerAnimation.borderOpacity} style={headerAnimation}>
          <MenuContainer>
            <Navigation />
          </MenuContainer>
          <LogoContainer>
            <animated.div style={logoAnimation}>
              <Logo size={Sizes.S} />
            </animated.div>
          </LogoContainer>
          {/* <SubscribeButtonStyled>
            <SubscribeButton />
          </SubscribeButtonStyled> */}
        </AnimatedTopRow>
      </Container>
    </NavbarWrapper>
  );
};