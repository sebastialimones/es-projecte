import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Nav } from '../../containers/Navigation';
import {  mainColor } from '../../constants';
import { useSpring, animated } from '@react-spring/web';
import media from '../../constants/media';
import ProfileModal from '../../components/ProfileModal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FreudTransparent48x48 from '../../assets/FreudTransparent48x48.png';
import useIsMobile from '../../hooks/isMobile';

const NavbarWrapper = styled.div`
  padding-top: calc(${props => props.isScrolled ? '0.5em' : '1em'});  
`;

const Container = styled.div`
  display: flex;
  align-items: center; // Align items vertically
  justify-content: space-between; // Space out the logo and the menu
  z-index: 100;
  top: 0;
  left: 0;

  ${media.smallScreen`
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1.2em;
  `}
`;

const DockMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
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

const MobileMenuContainer = styled.div`
  ${media.smallScreen`
    
  `}
`;

const SubscribeButtonStyled = styled.div`
  padding-right: 3em;
  ${media.smallScreen`
    padding-right: 1em;
  `}
`;

const StyledNavLink = styled(NavLink)`
  margin: 0 15px;
  text-decoration: none;
  color: inherit; // Or any default color you prefer

  &:hover {
    color: ${props => props.theme.mainColor}; // Assuming mainColor is in your theme
  }

  &.active {
    text-decoration: underline;
    text-decoration-color: ${mainColor}; // Underline color
  }
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

const DesktopMenuContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 15px; // Adjust spacing between links
    text-decoration: none; // Optional: style as needed
    color: inherit; // Optional: style as needed
    &:hover {
      color: ${mainColor}; // Change color on hover
    }
  }

  // Add more styles as needed
`;
const DesktopMenuItem = styled.div`
  margin: 0 15px; 
  cursor: pointer;
  // Add more styling as needed
`;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFreudifyActive, setIsFreudifyActive] = useState(false);
  const dockMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  const location = useLocation();
  const isMobile = useIsMobile();

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

  useEffect(() => {
    document.body.style.cursor = isFreudifyActive ? `url(${FreudTransparent48x48}), auto` : 'default';
  }, [isFreudifyActive]);

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

  const handleChange = (event) => {
    setIsFreudifyActive(event.target.checked);
  };

  const handleNonDockContactClick = () => {
    setIsModalOpen(true);
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
          <Logo isMenuOpen={isDockOpen}>Tià Limones</Logo>
        </Link>
        {
          isMobile ?
          <MobileMenuContainer>
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
          </MobileMenuContainer>
          :
          <DesktopMenuContainer>
            <StyledNavLink exact to="/" activeClassName="active">
              inicio
            </StyledNavLink>
            <StyledNavLink to="/blog" activeClassName="active">
              artículos
            </StyledNavLink>
            <StyledNavLink to="/books" activeClassName="active">
              libros
            </StyledNavLink>
            <StyledNavLink to="/bio" activeClassName="active">
              bio
            </StyledNavLink>
            <DesktopMenuItem onClick={handleNonDockContactClick}>
              contacto
            </DesktopMenuItem>
          </DesktopMenuContainer>
        }
        {!isMobile && 
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isFreudifyActive}
                    onChange={handleChange}
                    name="Freudify"
                    style={{ color: mainColor }}
                  />           
                }
                label="Freudify"
              />
            </FormGroup>
          </FormControl>
        }
      </Container>
    </NavbarWrapper>
  );
};

