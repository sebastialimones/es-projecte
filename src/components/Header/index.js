import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Logo } from '../Logo';
import { Nav } from '../../containers/Navigation';
import {  Sizes, superLightGrey, red } from '../../constants';
// import { SubscribeButton } from '../../elements/buttonElement';
import { useSpring, animated } from '@react-spring/web';
import media, {sizes} from '../../constants/media';
import IMG_5717 from '../../../src/assets/IMG_5717.png'
import ProfileModal from '../../components/ProfileModal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { mainColor } from '../../constants';

const Container = styled.div`
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const DockMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70vw;
  background: ${mainColor};  // You can adjust this color
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 200;

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

const LogoContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  ${media.smallScreen`
    flex-grow: 0;
    padding-left: 1em;
    /* font-size: '44px', */
  `}
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
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

const Avatar = styled.img`
  width: 40px; // Adjust the size as needed
  height: 40px;
  border-radius: 50%; // Makes the image circular
  margin-right: 10px; // Space between the avatar and the logo or other elements
  cursor: pointer;
  text-decoration: none;
`;

const customStyles = {
  content: {
    top: '5em',
    left: '50%', // Center the modal horizontally
    transform: 'translateX(-50%)', // Adjust for exact centering
    margin: '4em',
    padding: '20px', // Padding around the content
    background: 'rgba(255, 255, 255, 0.9)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '5px', // Gives a slight rounded corner
    outline: 'none',
    position: 'fixed',
    border: 'none',
    width: 'auto',  // Adjust to fit content width
    height: 'auto', // Adjust to fit content height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: superLightGrey,
},
  overlay: {
    zIndex: 900,
  },
};

const mobileStyles = {
  height: 'auto',
  top: '50%',
  left: '50%',
  margin: 0,
  transform: 'translate(-50%, -50%)',
  padding: '0.5em',
  borderRadius: '4px',
  minWidth: '80vw', 
  minHeight: '50vh',
  zIndex: 1000,
};

const mobileMenuIconStyles = {
  fontSize: '44px',
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= sizes.smallScreen);
  const dockMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= sizes.smallScreen);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const mergedStyles = isSmallScreen 
    ? { ...customStyles, content: { ...customStyles.content, ...mobileStyles } }
    : customStyles;


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
      if (dockMenuRef.current && menuIconRef.current) {  // Additional check here
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
    setIsDockOpen(prev => !prev);
    setRotation(prev => (prev === 0 ? -180 : 0));
  };
  
  return (
    <NavbarWrapper isScrolled={isScrolled}>
      <Container>
        <ProfileModal 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          contentLabel="Profile Modal"
          style={mergedStyles}
        />
        <animated.div style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            transform: rotateAnimation.rotation.to(r => `rotate(${r}deg)`),
            fontSize: '40px',
            zIndex: 201
        }}>
            {rotation >= -90 ?
                <MenuIcon onClick={handleClick} fontSize="inherit" /> :
                <CloseIcon onClick={handleClick} fontSize="inherit" />
            }
        </animated.div>
        <LogoContainer>
            <Avatar src={IMG_5717} alt="Tia" onClick={() => setIsModalOpen(true)}/>
          <Logo size={Sizes.S} />
        </LogoContainer>
        <DockMenu ref={dockMenuRef} className={isDockOpen ? 'open' : ''}>
          <MenuContainer>
              <Nav setIsModalOpen={setIsModalOpen} style={isSmallScreen ? mobileMenuIconStyles : null} />
          </MenuContainer>          
          {/* <SubscribeButtonStyled>
            <SubscribeButton />
          </SubscribeButtonStyled> */}
        </DockMenu>
      </Container>
    </NavbarWrapper>
  );
};
