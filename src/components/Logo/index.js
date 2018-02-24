import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { red, Sizes } from '../../constants';

const FirstTD = styled.td`
  padding-right: ${({ size }) => size === Sizes.S ? '0.5em' : '2em'};
`;

const Title = styled.h1`
  font-family: 'Gravitas One', sans-serif;
  font-size: ${({ size }) => size === Sizes.S ? '2em' : '3em'};
  font-weight: normal;
`;

const SubTitle = styled.h4`
  color: ${red};
  text-transform: uppercase;
`;

export const Logo = ({ size }) => (
  <table>
    <tbody>
      <tr>
        <FirstTD size={ size }>
          <Link to="/"><Title size={ size }>es</Title></Link>
        </FirstTD>
        <td>
          <Link to="/"><Title size={ size }>projecte</Title></Link>
        </td>
      </tr>
      <tr>
        <td />
        <td>
          <SubTitle>{ `eines per a l'adultesa` }</SubTitle>
        </td>
      </tr>
    </tbody>
  </table>
);
