import React from 'react';
import { Navigation } from '../../components/Navigation';

export const Nav = ({ setIsModalOpen, setIsDockOpen }) => {
  return (
    <div>
      <Navigation onContactClick={() => {
        setIsModalOpen(true);
        setIsDockOpen(false);
      }} />
    </div>
  );
};

export default Nav;