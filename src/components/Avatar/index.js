import React from 'react';
import { Logo } from '../../components/Logo';
import IMG_5717 from '../../../src/assets/IMG_5717.png'
import styled from 'styled-components';
import media from '../../constants/media';
import {  Sizes } from '../../constants';

const LogoContainer = styled.header`
  display: flex;
  align-items: center;
  padding-left: 9em;
  flex-grow: 1;
  ${media.smallScreen`
    justify-content: start;
    padding: 18px;
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

const AvatarComponent = ({ setIsModalOpen }) => {
  return (
    <LogoContainer>
      <Avatar src={IMG_5717} alt="Tia" onClick={() => setIsModalOpen(true)}/>
      <Logo size={Sizes.S} />
    </LogoContainer>
  );
};

export default AvatarComponent;