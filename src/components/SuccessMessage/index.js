import React from 'react';
import styled from 'styled-components';

const SubTitle = styled.h4`
  line-height: 1.5;
  margin-bottom: 1em;
  text-align: center;
  width: 100%;
`;

export const SuccessMessage = () => (
  <SubTitle>
    Gràcies per apuntar-te!
  </SubTitle>
);