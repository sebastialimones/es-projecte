import React from 'react';
import styled from 'styled-components';
import { BookItem } from '../BookItem';

const Container = styled.div` 
  display: flex;
  flex-Wrap: wrap;
  justify-Content: space-around;
  overflow: hidden;
  margin-top: 1em;
`;

export const ListOfBooks = ({ books }) => {

  return (
    <Container>
      {
        books
          .filter(book => !book.tags.indexOf('book'))
          .map((book) =>
          <BookItem key={ book.uid } book={ book } /> )
      } 
    </Container>
  );
};
