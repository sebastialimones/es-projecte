import React from 'react';
import styled from 'styled-components';
import media from '../../constants/media';

const Container = styled.div`
  padding-top: 1.5em; 
  color: #FAF8F0;
  position: relative;
  z-index: 20000;
  width: 50%;
`;

const HomeRoute2 = () => {

  return (
    <>
      <Container>
        Si bien es verdad que todo el mundo me desaconsejaba este diseño web a mi me pareció una manera preciosa de explicar la percepción en la gestalt. En gestalt hablamos de figura y de fondo. La figura se nos hace presentes en algunos momentos y en otros desaparece en el fondo, como este texto.
      </Container>
      <Container>
        ¿Qué se te hace figura en tu vida ahora mismo? 
      </Container>
      <Container>
        Me llamo Sebastià Limones y trabajo como terapeuta gestalt. 
      </Container>
      <Container>
        Trabajo en Palma de Mallorca presencialmente y online en este bendito y a veces maldito, mundo digital.
      </Container>
    </>
    );
};

export default HomeRoute2;