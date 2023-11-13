import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import media from '../../constants/media';
import IMG_5717 from '../../../src/assets/IMG_5717.png';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '../Logo';

const StyledModal = styled(Modal)`
  &.ReactModal__Content {
    background: #FAF8F0; // Changed background color
    border-radius: 10px; // Rounded corners for the card effect
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); // Optional: Shadow for depth
    width: 80vw; // More horizontal width
    max-width: 600px; // Max width for larger screens
    margin: 4em auto; // Centered horizontally with margin
    padding: 20px;

    ${media.smallScreen`
      width: 60vw;
      border-radius: 8px;
      padding: 1em;
    `}
  }
  &:focus {
    outline: none;
  }


  &.ReactModal__Overlay {
    z-index: 21000;
  }
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  align-items: center; // Centers items vertically
  justify-content: center; // Centers items horizontally
  gap: 80px; // Adds space between the avatar and the details

  ${media.smallScreen`
    flex-direction: column;
    align-items: stretch; 
    gap: 10px; // Adds space between the avatar and the details

  `}
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Aligns items to the start of the flex container
`;


const StyledCloseIcon = styled(CloseIcon)`
  position: absolute; // Position it absolutely relative to the nearest positioned ancestor
  top: 0px; // Adjust the value as needed for the top right corner
  right: 0px; // Adjust the value as needed for the top right corner
  cursor: pointer;
  font-size: 24px;
  color: black;
`;
const Name = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PhoneNumber = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;
const EmailContainer = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline; // Optional: underline on hover for visual feedback
  }
`;

const EmailText = styled.span`
  font-size: 18px; // Sets the size of the email text
  color: inherit; // Inherits the color from the parent or defaults to the body color
`;

const ProfileModal = ({ isOpen, onRequestClose }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Perfil"
    >
      <ModalContent>
        <Avatar src={IMG_5717} alt="Tia" />
        <DetailsContainer>
          <StyledCloseIcon onClick={onRequestClose} />
          <Logo isLink={false}>Tià Limones</Logo>
          <Name>Gestaltista</Name>
          <PhoneNumber>651 77 66 45</PhoneNumber>
          <EmailContainer onClick={() => window.location = 'mailto:sebas.limones@gmail.com'}>
            <EmailText>sebas.limones@gmail.com</EmailText>
          </EmailContainer>
        </DetailsContainer>
      </ModalContent>
    </StyledModal>
  );
};

export default ProfileModal;
