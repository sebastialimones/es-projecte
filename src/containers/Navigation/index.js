import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../components/Icon';
import { Navigation } from '../../components/Navigation';

export const Nav = ({ setIsModalOpen }) => {
  return (
    <div>
      <Navigation onContactClick={() => setIsModalOpen(true)} />
    </div>
  );
};

export default Nav;