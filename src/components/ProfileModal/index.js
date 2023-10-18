import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import media from '../../constants/media';
import IMG_5717 from '../../../src/assets/IMG_5717.png';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

const StyledModal = styled(Modal)`
  &.ReactModal__Content {
    top: 5em;
    left: 50%;
    transform: translateX(-50%);
    margin: 4em;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    overflow: auto;
    WebkitOverflowScrolling: 'touch';
    border-radius: 5px;
    outline: none;
    position: fixed;
    border: none;
    width: auto;
    height: auto;
    ${media.smallScreen`
      height: auto;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
      padding: 0.5em;
      border-radius: 4px;
      minWidth: 80vw;
      minHeight: 50vh;
    `}
  }

  &.ReactModal__Overlay {
    z-index: 21000
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Name = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PhoneNumber = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: black;
`;

const ProfileModal = ({ isOpen, onRequestClose }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Perfil"
    >
      <ModalContent>
        <StyledCloseIcon onClick={onRequestClose} />
        <Avatar src={IMG_5717} alt="Tia" />
        <Name>Tià Limones</Name>
        <PhoneNumber>651 77 66 45</PhoneNumber>
        <a href="mailto:sebas.limones@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
          <EmailIcon style={{ cursor: 'pointer' }} />
        </a>
      </ModalContent>
    </StyledModal>
  );
};

export default ProfileModal;
