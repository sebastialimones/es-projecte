import React from 'react';
import styled from 'styled-components';
import media from '../../constants/media';
import IMG_5717 from '../../../src/assets/IMG_5717.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center horizontally in a column container
  justify-content: center; // Center vertically
  padding-top: 2em;
  font-size: 1.5em;
  line-height: 0.2em;
  max-width: 80%;
  margin: 0 auto; // Center the container itself horizontally
  ${media.smallScreen`
    
  `}
`;

const Paragraph = styled.p`
  font-size: 1em;  /* Adjusted to fit the overall font size you provided */
  line-height: 1.2;
  margin-bottom: 1em;
`;


const Avatar = styled.img`
  width: 180px; // Adjust the size as needed
  height: 180px;
  border-radius: 50%; // Makes the image circular
  margin-right: 10px; // Space between the avatar and the logo or other elements
  text-decoration: none;
  margin-bottom: 1em;
`;


export const Bio = () => {
  return (
    <Container>
      <Paragraph>
        Hola, me llamo Sebastià y acompaño procesos personales. Me formé como terapeuta gestalt en el Aula Balear de Gestalt y también en Psicoterapia Integrativa en el Programa SAT (SAT III) de Claudio Naranjo.
      </Paragraph>
      <Paragraph>
        Además, tengo formación en constelaciones familiares y un Máster en mediación de conflictos. Me gradué en derecho allá por 2007 y ejercí como abogado durante varios años tanto en Barcelona como en Mallorca.
      </Paragraph>
      <Avatar src={IMG_5717} alt="Sebastià"/>
      <Paragraph>
      Ahora, la terapia es mi oficio. <br></br><br></br>Como he llegado hasta aquí es de esas cosas que sólo con la perspectiva que da el paso de los años podré llegar a entender. Lo que tengo claro es que estoy comprometido con este oficio y intento ejercerlo de una manera honesta y transparente.
      </Paragraph>
      <Paragraph>
        Te invito a contactarme si necesitas más información, estoy abierto a conversar sobre todo lo que envuelva el proceso terapéutico y las dudas que puedas tener sobre ello. También te invito a leer algún artículo, allí quizás me transparento más en mi forma de ver el mundo y la terapia.
      </Paragraph>
    </Container>
  );
};