import React from 'react';
import Modal from 'react-modal';
import IMG_5717 from '../../../src/assets/IMG_5717.png'
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

const ProfileModal = ({ isOpen, onRequestClose, style }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Perfil"
      style={style}
    >
      <div style={styles.modalContent}>
        <CloseIcon onClick={onRequestClose} style={styles.closeIcon} />
        <img src={IMG_5717} alt="Tia" style={styles.avatar} />
        <h2 style={styles.name}>Tià Limones</h2>
        <p style={styles.phoneNumber}>651 77 66 45</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <a href="mailto:sebas.limones@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
            <EmailIcon style={{ cursor: 'pointer' }} />
          </a>
        </div>
      </div>
    </Modal>
    );
  };
  
  const styles = {
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    avatar: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
    },
    name: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    phoneNumber: {
      fontSize: '18px',
      marginBottom: '20px',
    },
    closeButton: {
      marginTop: '20px',
    },
    closeIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      fontSize: '24px',
      color: 'black' 
    },
  };

export default ProfileModal;