import React from 'react';
import styled from 'styled-components';

import { ErrorMessage } from '../ErrorMessage';
import { SubscriuteForm } from '../SubscriuteForm';
import { SuccessMessage } from '../SuccessMessage';
import { lightGrey } from '../../constants';
import media from '../../constants/media';

const Container = styled.div`
  margin: 0 auto 0 auto;
  padding-top: 4em;
  width: 70%;
  ${media.mediumScreen`width: 100%;`}
`;

const Content = styled.div`
  background-color: ${lightGrey};
  border-radius: 2px;
  padding: 2em;
`;

const componentMap = {
  editing: SubscriuteForm,
  error: ErrorMessage,
  success: SuccessMessage,
}

export const Subscriute = (props) => {
  const Component = componentMap[props.status];
  return (
    <Container>
      <Content>
        <Component { ...props } />
      </Content>
    </Container>
  );
};