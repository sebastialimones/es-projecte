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
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const NavContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center; // Centers the flex items
  align-items: center;
  padding: 0;
  gap: 30px;
  // Shared pseudo-element for the hover background
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%; // Equal to the width of a single nav link
    background-color: #F6EDDD;
    transform: translateX(0);
    transition: transform 0.3s ease-out;
    border-radius: 20px;
    z-index: -1;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-flex; // Allows the element to fit its content
  justify-content: center;
  align-items: center;
  margin: 0; // If using gap, you might not need margins
  padding: 12px 20px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; // Adjust as needed
    left: 50%; // Center the pseudo-element
    transform: translateX(-50%) scaleX(0); // Initially scaled to 0
    transform-origin: center bottom;
    width: calc(100% - 40px); // Adjusted width to prevent overflow
    // Subtracting total horizontal padding from 100% width
    // Ensure this matches the horizontal padding of the NavLink
    height: 2px;
    background-color: transparent; // Initially transparent
    transition: transform 0.3s, background-color 0.3s;
    z-index: 1;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
    background-color: ${props => props.theme.mainColor || mainColor}; // Color on hover
  }

  // Change text color on hover
  &:hover {
    color: ${props => props.theme.mainColor || mainColor};
  }

  // Active state styles
  &.active {
    color: ${props => props.theme.mainColor || mainColor};
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
`;

const DesktopMenuItem = styled.div`
  display: inline-flex; // Allows the element to fit its content
  justify-content: center;
  align-items: center;
  margin: 0; // If using gap, you might not need margins
  padding: 12px 20px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; // Adjust as needed
    left: 50%; // Center the pseudo-element
    transform: translateX(-50%) scaleX(0); // Initially scaled to 0
    transform-origin: center bottom;
    width: calc(100% - 40px); // Adjusted width to prevent overflow
    // Subtracting total horizontal padding from 100% width
    // Ensure this matches the horizontal padding of the NavLink
    height: 2px;
    background-color: transparent; // Initially transparent
    transition: transform 0.3s, background-color 0.3s;
    z-index: 1;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
    background-color: ${props => props.theme.mainColor || mainColor}; // Color on hover
  }

  // Change text color on hover
  &:hover {
    color: ${props => props.theme.mainColor || mainColor};
  }

  // Active state styles
  &.active {
    color: ${props => props.theme.mainColor || mainColor};
  }
`;

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Styles applied to the internal `SwitchBase` component's `root` class.
          '&.Mui-checked': {
            // Styles when the switch is checked (on)
            color: '#FF6F50', // Handle color when on
            '& + .MuiSwitch-track': {
              backgroundColor: '#FF6F50', // Track color when on
            },
          },
  
        },
      },
    },
  },
});


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
            <NavContainer>
              <StyledNavLink exact to="/" activeClassName="active">
                <span>inicio</span>
              </StyledNavLink>
              <StyledNavLink to="/blog" activeClassName="active">
                <span>artículos</span>
              </StyledNavLink>
              <StyledNavLink to="/bio" activeClassName="active">
                <span>bio</span>
              </StyledNavLink>
              <StyledNavLink to="/books" activeClassName="active">
                <span>libros</span>
              </StyledNavLink>
              {/* If DesktopMenuItem is intended to look like StyledNavLink, wrap its text in a span as well */}
              <DesktopMenuItem onClick={handleNonDockContactClick}>
                <span>contacto</span>
              </DesktopMenuItem>
            </NavContainer>
          </DesktopMenuContainer>
        }
        {!isMobile && 
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
        }
      </Container>
    </NavbarWrapper>
  );
};

