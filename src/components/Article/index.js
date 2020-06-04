import PrismicDOM from 'prismic-dom';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { ReadingTime } from '../ReadingTime';
import { grey } from '../../constants';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { annotate } from 'rough-notation';

const Container = styled.div`
  margin-top: 2em;
`;

const Title = styled.h1``

const MetadataContainer = styled.div`
  color: ${grey};
  font-size: 0.8em;
  margin: 1em 0 2em 0;
`;

const TitleArticle = styled.div`
  & > p {
    margin: 1em 1em ;
  }
  margin-bottom: 2em;
`;

const Content = styled.div`
  & > p {
    margin: 1em 0 ;
  }
  /* .highlight {
    background-color:#FFFF00;
  } */
`;

export const Article = ({ article, isPost }) => {
  useScrollToTop()
  const highlight = useRef(null);

  useEffect( () => {
    const annotation = annotate(highlight.current, { type: 'underline' });
    annotation.show();
  },
  []);

  return(
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
      
    { article.titol[0] && <TitleArticle dangerouslySetInnerHTML={ { __html: PrismicDOM.RichText.asHtml(article.titol) } } /> }
      <Content dangerouslySetInnerHTML={ { __html: PrismicDOM.RichText.asHtml(article.contingut) } } ref={ highlight } />
    </Container>
  )
};
