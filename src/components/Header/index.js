import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Nav } from '../../containers/Navigation';
import {  mainColor } from '../../constants';
import { useSpring, animated } from '@react-spring/web';
import media from '../../constants/media';
import ProfileModal from '../../components/ProfileModal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';

const NavbarWrapper = styled.div`
  padding-top: calc(${props => props.isScrolled ? '0.5em' : '1em'});  
`;

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const Logo = styled.div`
  font-family: 'PlaakBold';
  font-size: 2.5em;
  margin-top: -9px;
  border-bottom:  4px solid ${mainColor};
  display: inline-block;
  position: relative; /* Set position to relative, absolute, or fixed */
  z-index: 300; /* Set z-index higher than DockMenu's z-index */
`;

const DockMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  /* width: calc(70vw - 30px); // For larger screens */
  width: 100%;
  background: ${mainColor};
  transform: translateX(100%);
  transition: transform 0.2s ease-in-out;
  z-index: 200;
  box-sizing: border-box;

  &.open {
    transform: translateX(0);
  }

  .close-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100vh;
    cursor: pointer;
    color: black;
    font-size: 3.5em;
  }

  ${media.smallScreen`
    width: 100%;
  `}
`;

const MenuContainer = styled.div`
  ${media.smallScreen`
    
  `}
`;

const SubscribeButtonStyled = styled.div`
  padding-right: 3em;
  ${media.smallScreen`
    padding-right: 1em;
  `}
`;

const mobileMenuIconStyles = {
  fontSize: '44px',
};

const iconContainerStyles = {
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const StyledIcon = styled(animated.div)`
  position: absolute;
  top: 10px;
  right: 40px;
  font-size: 40px;
  z-index: 201;
  vertical-align: middle;

  ${media.smallScreen`
    right: 10px;
  `}
`;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const dockMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  const location = useLocation();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dockMenuRef.current && menuIconRef.current) { 
        if (!dockMenuRef.current.contains(event.target) && !menuIconRef.current.contains(event.target)) {
          setIsDockOpen(false);
        }
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rotateAnimation = useSpring({
    rotation: isDockOpen ? -80 : 0,
    config: { tension: 170, friction: 26 },
    onRest: () => {
        setRotation(isDockOpen ? -180 : 0);
    }
  });

  const handleClick = () => {
    setIsDockOpen(prev => {
      return !prev;
    });
    setRotation(prev => (prev === 0 ? -180 : 0));
  };

  const handleLinkClick = (path) => {
    if (!path || location.pathname === path) {
      setIsDockOpen(false);
    }
  };

  return (
    <NavbarWrapper isScrolled={isScrolled}>
        <ProfileModal 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          contentLabel="Profile Modal"
        />
      <Container>
      <Link to="/">
        <Logo isMenuOpen={isDockOpen}>Limones</Logo>
      </Link>
        <MenuContainer>
          <StyledIcon
            style={{
              transform: rotateAnimation.rotation.to(r => `rotate(${r}deg)`),
            }}
          >
            <div style={iconContainerStyles}>
              {rotation >= -90 ?
                  <MenuIcon onClick={handleClick} fontSize="inherit" /> :
                  <CloseIcon onClick={handleClick} fontSize="inherit" />
              }
            </div>
          </StyledIcon>
          <DockMenu ref={dockMenuRef} className={isDockOpen ? 'open' : ''}>
          <Nav 
            setIsModalOpen={setIsModalOpen} 
            setIsDockOpen={setIsDockOpen}
            closeDock={() => handleClick(true)} 
            handleLinkClick={handleLinkClick}
            style={media.smallScreen ? mobileMenuIconStyles : null} 
          />          
        </DockMenu>
        </MenuContainer>          
      </Container>
    </NavbarWrapper>
  );
};
