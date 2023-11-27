import PrismicDOM from 'prismic-dom';
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedDate } from '../FormattedDate';
import { ReadingTime } from '../ReadingTime';
import { grey, mainColor } from '../../constants';
import media from '../../constants/media';

const Container = styled.article`
  padding: 2em 0;
  border-bottom: 1px solid ${mainColor};
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
    color: ${mainColor};
  }
`;

const MetadataContainer = styled.div`
  color: ${grey};
  font-size: 0.8em;
  margin: 0.5em 0;
  margin-bottom: 1.6em;
`;

const TagContainer = styled.p`
  font-size: 1.1em;
`;

const Tag = styled.a`
  color: gray;
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

const getRandomColorFromPalette = () => {
  const colorPalette = ['#ECEE81', '#8DDFCB', '#EDB7ED', '#FFB3B3', '#FFDBA4', '#C1EFFF']; 
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
};

const generateTagColors = (tags) => tags.map(() => getRandomColorFromPalette());

export const ArticleItem = ({ article, handleTagClick }) => {
  const [tagColors] = useState(() => generateTagColors(article.mytags));

  return(
    <Container>
      <ImageContainer>
        <Link to={`/articles/${article.uid}`}>
          <Image imageUrl={article.imatge_principal.url} loading="lazy" />
        </Link>
      </ImageContainer>
      <ContentContainer>
        <Link to={`/articles/${article.uid}`}>
          <Title>
            {PrismicDOM.RichText.asText(article.titol)}
          </Title>
        </Link>
        {article.mytags.length ? (
          <TagContainer>
            {article.mytags.map((tag, index) => (
              tag.text ? (
                <Tag
                  key={tag.text}
                  style={{ backgroundColor: tagColors[index] }}
                  href="#"
                  onClick={() => handleTagClick({ text: tag.text, color: tagColors[index] })}
                >
                  #{tag.text}
                </Tag>
              ) : null
            ))}
          </TagContainer>
        ) : null}
        <MetadataContainer>
          <ReadingTime text={PrismicDOM.RichText.asText(article.contingut)} />
          <DateContainer><FormattedDate date={article.data_publicacio} /></DateContainer>
        </MetadataContainer>
        <ShortContent>{PrismicDOM.RichText.asText(article.contingut)}</ShortContent>
      </ContentContainer>
    </Container>
  );
};
