import React from 'react';
import { Navigation } from '../../components/Navigation';

export const Nav = ({ setIsModalOpen, setIsDockOpen, handleLinkClick }) => {
  return (
    <div>
      <Navigation 
        onContactClick={() => {
          setIsModalOpen(true);
          setIsDockOpen(false);
        }}
        handleLinkClick={handleLinkClick} 
      />
    </div>
  );
};