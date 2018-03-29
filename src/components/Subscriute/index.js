import React from 'react';
import styled from 'styled-components';

import { lightGrey } from '../../constants';
import media from '../../constants/media';

const Container = styled.div`
  margin: 4em auto 0 auto;
  width: 70%;
  ${media.mediumScreen`width: 100%;`}
`;

const Form = styled.form`
  align-items: center;
  background-color: ${lightGrey};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  padding: 2em;
`;

const Message = styled.p`
  margin-top: 1em;
`;

const Submit = styled.input.attrs({
  type: 'submit',
})`
  background-color: #000;
  border-radius: 30px;
  color: #fff;
  font-family: inherit;
  font-size: 1em;
  padding: 0.3em 1.7em;
  ${media.mediumScreen`width: 100%;`}
`;

const SubTitle = styled.h4`
  line-height: 1.5;
  margin-bottom: 1em;
  text-align: center;
  width: 30%;
  ${media.mediumScreen`width: 50%;`}
  ${media.smallScreen`width: 100%;`}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0.7em;
  width: 100%;
  ${media.mediumScreen`
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
  `}
`;

const TextInput = styled.input.attrs({
  type: 'text',
})`
  border: none;
  font-size: 0.8em;
  padding: 0.5em;
  ${media.mediumScreen`width: 100%;`}
`;

const TextEmail = styled.input.attrs({
  type: 'email',
})`
  border: none;
  font-size: 0.8em;
  padding: 0.5em;
  width: 20em;
  ${media.mediumScreen`width: 100%;`}
`;

export const Subscriute = () => (
  <Container>
    <Form>
      <SubTitle>Subscri-te per rebre les noves publicacions</SubTitle>
      <Row>
        <TextInput placeholder="Nom" />
        <TextInput placeholder="Cognom" />
      </Row>
      <Row>
        <TextEmail placeholder="E-mail" />
      </Row>
      <Row>
        <Submit type="submit" value="Ho vull rebre" />
      </Row>
    </Form>
    <Message>* Me compromet a posar un botó de unsubscribe gran. Serà més difícil donar-se d'alta que donar-se de baixa.</Message>
  </Container>
);