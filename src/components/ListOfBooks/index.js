import React from 'react';
import styled from 'styled-components';
import { BookItem } from '../BookItem';

const BooksContainer = styled.div` 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  margin-top: 1em;
`;

const Container = styled.div` 
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow: hidden;
`;

export const ListOfBooks = ({ books }) => {
  return (
    <Container>
      <BooksContainer>
        {
          books
            .filter(book => !book.tags.indexOf('book'))
            .map((book) =>
            <BookItem key={ book.uid } book={ book } /> )
        } 
      </BooksContainer>
    </Container>
  );
};
