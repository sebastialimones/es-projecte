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
        Hola, me llamo Sebastià y acompaño procesos personales. Me formé como terapeuta gestalt en el Aula Balear de Gestalt y también en Psicoterapia Integrativa en el Programa SAT (SAT III) de Claudio Naranjo.
      </Paragraph>
      <Paragraph>
        Además, tengo formación en constelaciones familiares y un Máster en mediación. Me gradué en derecho allá por 2007 y ejercí como abogado durante varios años tanto en Barcelona como en Mallorca.
      </Paragraph>
      <Paragraph>
        
      </Paragraph>
    </Container>
  );
};