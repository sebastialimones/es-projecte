import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  cursor: ${({ onClick }) => onClick ? 'pointer': 'auto'};
`;

export const Icon = ({ onClick, type }) => (
  <Span onClick={ onClick }>
    <i className={ `fas fa-${type}` }></i>
  </Span>
);
