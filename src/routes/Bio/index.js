import React from 'react';
import styled from 'styled-components';
import media from '../../constants/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2em;
  font-family: 'Playfair Display', serif;  /* Set the font to Playfair Display */
  font-size: 16px;  /* Set the font size */
  line-height: 13.3px;  /* Set the line height */
  ${media.smallScreen`
    
  `}
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.5em;
`;

const Paragraph = styled.p`
  font-size: 1em;  /* Adjusted to fit the overall font size you provided */
  line-height: 1.6;
  margin-bottom: 1em;
`;

const Highlight = styled.span`
  font-weight: bold;
`;

export const Bio = () => {
  return (
    <Container>
      <Paragraph>
        Hola, soy Sebastià y acompaño procesos personales. Me formé como <Highlight>terapeuta gestalt</Highlight> en el Aula Balear de Gestalt y también en <Highlight>Psicoterapia Integrativa</Highlight> en el Programa SAT (SAT III) de Claudio Naranjo.
      </Paragraph>
      <Paragraph>
        Además, tengo formación en <Highlight>constelaciones familiares</Highlight> y un <Highlight>Máster en mediación</Highlight>. También me gradué en <Highlight>derecho</Highlight> y ejercí como <Highlight>abogado</Highlight> durante varios años.
      </Paragraph>
    </Container>
  );
};