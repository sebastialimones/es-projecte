import React from 'react';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    gray: {
      main: '#6D6E6F',
    },
  },
});

const StyledButtonContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
`;

const ButtonContainer = ({ label, onClick }) => (
  <StyledButtonContainer>
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="gray" onClick={onClick}>
        {label}
      </Button>
    </ThemeProvider>
  </StyledButtonContainer>
);

export default ButtonContainer;