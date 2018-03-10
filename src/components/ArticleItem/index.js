import PrismicDOM from 'prismic-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { grey, red } from '../../constants';

const Container = styled.article`
  padding: 2em 0;
  border-bottom: 1px solid ${red};
  &::after {
    content: '';
    clear: both;
    display: block;
  }
`;

const ImageContainer = styled.div`
  float: left;
  height: 14em;
  width: 40%;
`;

const Image = styled.div`
  background-image: url('${({ imageUrl }) => imageUrl}');
  background-size: cover;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  float: left;
  margin-left: 2em;
  width: 50%;
`;

const Title = styled.h3`
  font-weight: normal;
  font-size: 1.5em;
  &:hover {
    color: ${red};
  }
`;

const MetadataContainer = styled.div`
  color: ${grey};
  font-size: 0.8em;
  margin: 2em 0;
`;

const Time = styled.p`
  text-transform: uppercase;
`;

const DateContainer = styled.p`
  margin-top: 0.2em;
`;

const fontSize = '1em';
const lineHeight = 1.4;
const linesToShow = 3;

const ShortContent = styled.p`
  font-size: ${fontSize};
  height: calc(${fontSize} * ${lineHeight} * ${linesToShow});
  line-height: ${lineHeight};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ArticleItem = ({ article }) => (
  <Container>
    <ImageContainer>
      <Image imageUrl={ article.imatge_principal.url } />
    </ImageContainer>
    <ContentContainer>
      <Link to={ `/articles/${article.uid}` }><Title>{ PrismicDOM.RichText.asText(article.titol) }</Title></Link>
      <MetadataContainer>
        <Time>{ `temps de lectura: 6 min` }</Time>
        <DateContainer>{ article.data_publicacio }</DateContainer>
      </MetadataContainer>
      <ShortContent>{ PrismicDOM.RichText.asText(article.contingut) }</ShortContent>
    </ContentContainer>
  </Container>
);
