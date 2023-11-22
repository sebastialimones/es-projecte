import React from 'react';
import { Navigation } from '../../components/Navigation';

export const Nav = ({ setIsModalOpen, setIsDockOpen, handleLinkClick, onNonDockContactClick }) => {
  return (
    <div>
      <Navigation 
        onContactClick={() => {
          if (onNonDockContactClick) {
            onNonDockContactClick();
          } else {
            setIsModalOpen(true);
            setIsDockOpen(false);
          }
        }}
        handleLinkClick={handleLinkClick} 
      />
    </div>
  );
};