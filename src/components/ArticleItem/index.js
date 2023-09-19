import PrismicDOM from 'prismic-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedDate } from '../FormattedDate';
import { ReadingTime } from '../ReadingTime';
import { grey, red } from '../../constants';
import media from '../../constants/media';

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
  ${media.smallScreen`width: 100%;`}
`;

const Image = styled.div`
  background-image: url('${({ imageUrl }) => imageUrl}');
  background-size: cover;
  height: 100%;
  width: 100%;
  border-radius: 6px;
`;

const ContentContainer = styled.div`
  float: left;
  margin-left: 2em;
  width: 50%;
  ${media.smallScreen`
    margin: 1em 0 0 0;
    width: 100%;
  `}
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

const TagContainer = styled.p`
  font-size: 0.8em;
`;

const Tag = styled.span`
  background-color: ${red};
  color: white;
  font-size: 0.8em;
  padding-right: 0.3em;
  margin-right: 0.3em;
  border-radius: 0.1em;
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

function getRandomColorFromPalette() {
  const colorPalette = ['#ECEE81', '#8DDFCB', '#82A0D8', '#EDB7ED', '#FFB3B3', '#FFDBA4', '#C1EFFF']; 
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
}

export const ArticleItem = ({ article }) => (
  <Container>
    <ImageContainer>
      <Image imageUrl={ article.imatge_principal.url } />
    </ImageContainer>
    <ContentContainer>
      <Link to={ `/articles/${article.uid}` }>
      <Title>
        {PrismicDOM.RichText.asText(article.titol)}
        {article.mytags.length ? (
          <TagContainer>
            {article.mytags.map((tag) => (
              <Tag 
                key={tag.text}
                style={{ backgroundColor: getRandomColorFromPalette() }}
              >
                #{tag.text}
              </Tag>
            ))}
          </TagContainer>
        ) : null}
      </Title>   
      </Link>
      <MetadataContainer>
        <ReadingTime text={ PrismicDOM.RichText.asText(article.contingut) } />
        <DateContainer><FormattedDate date={ article.data_publicacio } /></DateContainer>
      </MetadataContainer>
      <ShortContent>{ PrismicDOM.RichText.asText(article.contingut) }</ShortContent>
    </ContentContainer>
  </Container>
);
