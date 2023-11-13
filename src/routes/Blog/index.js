import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { ArticleItem } from '../../components/ArticleItem';
import ButtonContainer from '../../components/Button';
import store from '../../store';
import { useTagFilter } from '../../context/tagFilterContext';
import media from '../../constants/media';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  ${media.mediumScreen`
    flex-direction: column;
  `}
  ${media.smallScreen`
  `}
`;

const ArticlesContainer = styled.div`
  flex: 4; 
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

const SidebarContainer = styled.div`
  flex: 1; /* Occupy 20% of available space */
  padding-left: 20px;
  ${media.mediumScreen`
    padding-left: 0px;
  `}
`;

const ImageContainer = styled.div`
  float: left;
  height: 14em;
  width: 40%;
  ${media.smallScreen`width: 100%;`}
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

const TagContainer = styled.p`
  font-size: 1.1em;
  position: absolute; // Keeps the element positioned absolutely relative to its parent
  top: -19px; // Positions the container 10 pixels from the top of its parent
  left: 0px; // Keeps the original left positioning
  z-index: 10; // Keeps the z-index to ensure it stays above other elements
`;

const ParentContainer = styled.div`
  position: relative; // or use 'position: absolute;' based on your layout
`;

const TagText = styled.span`
  margin-left: 8px;
`;

const Tag = styled.a`
  color: gray;
  font-size: 0.8em;
  padding: 0.5em;
  padding-right: 10px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  display: inline-flex;
  align-items: center;
  border-radius: 20px; 
  cursor: pointer;
  border: 1px solid gray;
  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled.span`
  cursor: pointer;
  &:after {
    content: '×'; // multiplication sign as close button
    font-size: 1.1em;
  }
  &:hover {
    color: red; // Change color on hover
  }
`;
  
const LoaderContainer = styled.div`
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
`;

const LoaderArticleContainer = styled.div``;

const { dispatch } = store;

const sidebar = {
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export const BlogRoute = ({ articles }) => {
  const [archives, setArchives] = useState([]);
  const [showAllArchives, setShowAllArchives] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const { setTagFilter } = useTagFilter();
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingArchives, setIsLoadingArchives] = useState(true);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [activeTagColor, setActiveTagColor] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsLoadingPosts(true);
    dispatch.articles.getList();
  }, [location.pathname]);

  useEffect(() => {
      if (articles.length > 0) {
          const articleFilter = articles.filter((item) => item.tags && item.tags.includes('post'));
          createArchiveList(articleFilter);
          setIsLoadingArchives(false);
          setIsLoadingPosts(false);
      }
  }, [articles]);

  
  useEffect(() => {
    if(selectedMonth){
      const selectedDate = new Date(selectedMonth);
  
      const filtered = articles.filter((article) => {
        const articleDate = new Date(article.data_publicacio);
  
        const hasPostTag = article.tags && article.tags.includes('post');
        return (
          articleDate.getFullYear() === selectedDate.getFullYear() &&
          articleDate.getMonth() === selectedDate.getMonth() &&
          hasPostTag
        );
      });
  
      setFilteredArticles({ [selectedMonth]: filtered });
    } else {
      setFilteredArticles({ articles });
    }
  }, [selectedMonth, articles]);
  
  const createArchiveList = (articleFilter) => {
    const archiveMap = new Map();

    articleFilter.forEach((item) => {
      if (item.data_publicacio) {
        const date = new Date(item.data_publicacio);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const key = `${month} ${year}`;

        archiveMap.set(key, { title: key });
      }
    });

    const archives = Array.from(archiveMap.values());

    archives.sort((a, b) => {
      const dateA = new Date(a.title);
      const dateB = new Date(b.title);
      return dateB - dateA;
    });
    setArchives(archives);
    return archives;
  };

  const isArticleFromSelectedMonth = (article, selectedMonth) => {
    if (!article.data_publicacio) {
      return false;
    }

    const articleDate = new Date(article.data_publicacio);
    const selectedDate = new Date(selectedMonth);

    return (
      articleDate.getFullYear() === selectedDate.getFullYear() &&
      articleDate.getMonth() === selectedDate.getMonth()
    );
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    const filteredByMonth = articles.filter((article) => {
      return isArticleFromSelectedMonth(article, month);
    });
    setFilteredArticles({ 'filtered':filteredByMonth });
  };

  const handleSeeAllClick = () => {
    setSelectedMonth(null);
    setFilteredArticles({ 'articles':articles });
    setActiveTag(null); 
    };

  const handleTagClick = (selectedTag) => {
    const filtered = articles.filter((article) => {
      return !selectedTag || article.mytags.some((mytag) => mytag.text === selectedTag.text);
    });
    setTagFilter(selectedTag);
    setActiveTag(selectedTag.text);
    setFilteredArticles({ 'filtered': filtered });
    const getRandomColorFromPalette = () => {
      const colorPalette = ['#ECEE81', '#8DDFCB', '#EDB7ED', '#FFB3B3', '#FFDBA4', '#C1EFFF']; 
      const randomIndex = Math.floor(Math.random() * colorPalette.length);
      return colorPalette[randomIndex];
    };
    setActiveTagColor(getRandomColorFromPalette());
  };

  const toggleShowAllArticles = () => {
    setShowAllArticles(!showAllArticles);
  };
  const buttonLabel = showAllArticles ? 'Ver menos' : 'Ver todos';

  const handleTagClose = () => {
    console.log(articles)
    setActiveTag(null);
    setActiveTagColor(null);
    setFilteredArticles({articles}); 
  };

  return (

    <Container>
      <Helmet key="helmet">
        <meta name="og:description" content="Articles Es Projecte" />
      </Helmet>
      <ArticlesContainer>
        {
          activeTag && (
            <ParentContainer>
              <TagContainer>
              <Tag style={{ backgroundColor: activeTagColor }}>
                  <CloseButton onClick={handleTagClose} />
                  <TagText>
                    {activeTag}
                  </TagText>
                </Tag>
              </TagContainer>
            </ParentContainer>
          )
        }
        {isLoadingPosts ? (
          <>
            {Array.from({ length: 3 }, (_, index) => (
              <LoaderContainer key={index}>
                <LoaderArticleContainer>
                  <ImageContainer>
                    <Skeleton variant="rectangular" width={300} height={218} />
                  </ImageContainer>
                  <ContentContainer>
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                      <Skeleton />
                      <Skeleton width="70%" />
                    </Box>
                  </ContentContainer>
                </LoaderArticleContainer>
              </LoaderContainer>
            ))}
          </>
        ) : (
          Object.keys(filteredArticles).map((key) => (
            <div key={key}>
              {Array.isArray(filteredArticles[key])
                ? filteredArticles[key]
                    .filter((article) => !article.tags || article.tags.includes('post'))
                    .slice(0, showAllArticles ? filteredArticles[key].length : 8)
                    .map((article) => (
                      <ArticleItem
                        key={article.uid}
                        article={article}
                        handleTagClick={handleTagClick}
                        isLoadingPosts={isLoadingPosts}
                      />
                    ))
                : null}
            </div>
          ))
        )}
        {
          (filteredArticles.articles && filteredArticles.articles.length > 5) ||
          (filteredArticles.filtered && filteredArticles.filtered.length > 5) ? (
            <ButtonContainer label={buttonLabel} onClick={toggleShowAllArticles} />
          ) : null
        }
      </ArticlesContainer>
      <SidebarContainer>
        {archives ? (
          <Sidebar
            archives={archives}
            social={sidebar.social}
            showAllArchives={showAllArchives}
            onShowAllArchives={() => setShowAllArchives(true)}
            onArchiveClick={handleMonthClick}
            selectedMonthClick={selectedMonth}
            onSeeAllClick={handleSeeAllClick}
            isLoadingArchives={isLoadingArchives}
          />
        ) : undefined}
      </SidebarContainer>
    </Container>
  )
};

const mapStateToProps = (state) => ({
  articles: Object.keys(state.articles)
    .map((uid) => state.articles[uid])
    .sort(
      (article1, article2) =>
        DateTime.fromISO(article1.data_publicacio) < DateTime.fromISO(article2.data_publicacio) ? 1 : -1
    ),
});

export const Blog = connect(mapStateToProps)(BlogRoute);