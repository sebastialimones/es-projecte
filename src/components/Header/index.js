import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Nav } from '../../containers/Navigation';
import {  mainColor } from '../../constants';
import { useSpring, animated } from '@react-spring/web';
import media from '../../constants/media';
import ProfileModal from '../../components/ProfileModal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

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
  font-family: 'Raisonne-demibold';
  font-size: 2.5em;
  margin-top: -9px;
  border-bottom:  4px solid ${mainColor};
  display: inline-block;
`;

const DockMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;  // Adjust to account for padding
  height: 100vh;
  width: calc(70vw - 30px);
  background: ${mainColor};  // You can adjust this color
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
    color: black; // Adjust color as needed
    font-size: 3.5em; // Adjust size as needed
  }
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

const iconStyles = {
  position: 'absolute',
  top: '10px',
  right: '40px',
  fontSize: '40px',
  zIndex: 201,
  verticalAlign: 'middle'
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const dockMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  
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
          <animated.div style={{ 
              ...iconStyles,
              transform: rotateAnimation.rotation.to(r => `rotate(${r}deg)`)
          }}>
            <div style={iconContainerStyles}>
              {rotation >= -90 ?
                  <MenuIcon onClick={handleClick} fontSize="inherit" /> :
                  <CloseIcon onClick={handleClick} fontSize="inherit" />
              }
            </div>
          </animated.div>
          <DockMenu ref={dockMenuRef} className={isDockOpen ? 'open' : ''}>
          <Nav 
            setIsModalOpen={setIsModalOpen} 
            setIsDockOpen={setIsDockOpen}
            closeDock={() => handleClick(true)} 
            style={media.smallScreen ? mobileMenuIconStyles : null} 
          />          
        </DockMenu>
        </MenuContainer>          
      </Container>
    </NavbarWrapper>
  );
};
