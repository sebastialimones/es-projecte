import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Sizes } from '../../constants';
import media from '../../constants/media';

const FirstTD = styled.td`
  padding-right: ${({ size }) => size === Sizes.S ? '0.5em' : '1.8em'};
`;

const Title = styled.h1`
  font-family: 'Gravitas One', sans-serif;
  font-size: ${({ size }) => size === Sizes.S ? '2em' : '3em'};
  ${({ size }) => size === Sizes.S
    ? media.smallScreen`font-size: 1.5em;`
    : media.smallScreen`font-size: 2em;`
  }
  font-weight: normal;
`;

const SubTitle = styled.h4`
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
        { 
          size === Sizes.S
          ? false
          : <td />
        }
        <td colSpan={ Sizes.S === size ? "2" : "1" }>
          <SubTitle>{ `` }</SubTitle>
        </td>
      </tr>
    </tbody>
  </table>
);
