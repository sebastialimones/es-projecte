import React from 'react';
import styled from 'styled-components';
import { BookItem } from '../BookItem';
import media from '../../constants/media';

const BooksContainer = styled.div` 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  margin-top: 1em;
  padding-top: 3em;
  ${media.smallScreen`
    padding-top: 1.5em;
  `}
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
            .map((book, index) =>
              <BookItem key={book.uid} book={book} isFirst={index === 0} />
            )
        } 
      </BooksContainer>
    </Container>
  );
};
