import styled from 'styled-components';

export const Button = styled.button`
  min-height: 2rem;
  border-radius: 1.4rem;
  min-width: 3rem;
  padding: 0.8rem 1rem;
  color: white;
  box-shadow: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px black;
  }
`;
