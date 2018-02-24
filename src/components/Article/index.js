import PrismicDOM from 'prismic-dom';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2em;
`;

const Content = styled.div`
  & > p {
    margin: 1em 0 ;
  }
`;

export const Article = ({ article }) => (
  <Container>
    <Content dangerouslySetInnerHTML={ { __html: PrismicDOM.RichText.asHtml(article.contingut) } } />
  </Container>
)
