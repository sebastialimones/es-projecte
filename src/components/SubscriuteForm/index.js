import React from 'react';
import styled from 'styled-components';

import media from '../../constants/media';

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
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

export const SubscriuteForm = (props) => (
  <Form onSubmit={ props.handleSubmit }>
    <SubTitle>Subscri-te per rebre les noves publicacions</SubTitle>
    <Row>
      <TextInput placeholder="Nom" onChange={ props.handleFirstNameChange } value={ props.firstName } />
      <TextInput placeholder="Cognom" onChange={ props.handleLastNameChange } value={ props.lastName } />
    </Row>
    <Row>
      <TextEmail placeholder="E-mail" onChange={ props.handleEmailChange } value={ props.email } />
    </Row>
    <Row>
      <Submit type="submit" value="Ho vull rebre" />
    </Row>
  </Form>
);