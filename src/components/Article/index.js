import PrismicDOM from 'prismic-dom';
import React from 'react';
import styled from 'styled-components';

import { ReadingTime } from '../ReadingTime';
import { grey } from '../../constants';

const Container = styled.div`
  margin-top: 2em;
`;

const Title = styled.h1``

const MetadataContainer = styled.div`
  color: ${grey};
  font-size: 0.8em;
  margin: 1em 0 2em 0;
`;

const Content = styled.div`
  & > p {
    margin: 1em 0 ;
  }
`;

export const Article = ({ article, isPost }) => (
  <Container>
    {
      isPost &&
      [
        <Title key="title">{ PrismicDOM.RichText.asText(article.titol) }</Title>,
        <MetadataContainer key="metadata">
          <ReadingTime text={ PrismicDOM.RichText.asText(article.contingut) } />
        </MetadataContainer>
      ]
    }
    <Content dangerouslySetInnerHTML={ { __html: PrismicDOM.RichText.asHtml(article.contingut) } } />
  </Container>
)
