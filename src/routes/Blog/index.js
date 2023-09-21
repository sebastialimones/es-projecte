import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { ArticleItem } from '../../components/ArticleItem';
import store from '../../store';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Container = styled.div`
  display: flex; 
  align-items: flex-start;
  `;

const ArticlesContainer = styled.div`
  flex: 4; /* Occupy 80% of available space */
`; 

const SidebarContainer = styled.div`
  flex: 1; /* Occupy 20% of available space */
  padding-left: 20px; 
  padding-top: 29px;
`;

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

  useEffect(() => {
    if (articles.length > 0) {
      archivesMenu();
    } else {
      dispatch.articles.getList()
    }
  }, [articles]);

  useEffect(() => {
    if (selectedMonth) {
      const selectedDate = new Date(selectedMonth);
      
      const filtered = articles.filter((article) => {
        const articleDate = new Date(article.data_publicacio);

        const hasPostTag = article.tags && article.tags.includes('post');
        // Compare the year and month of the article with the selected date
        return (
          articleDate.getFullYear() === selectedDate.getFullYear() &&
          articleDate.getMonth() === selectedDate.getMonth() &&
          hasPostTag
        );
      });
      
      setFilteredArticles({ [selectedMonth]: filtered });;
    } else {
      // No month selected, show all articles
      setFilteredArticles({articles});
    }
  }, [selectedMonth, articles]);

  const archivesMenu = () => {
    const articleFilter = articles.filter(item => item.tags && item.tags.includes('post'));
    createArchiveList(articleFilter)
  };
  const createArchiveList = (articleFilter) => {
    const archiveMap = new Map(); // Use a Map to store unique year-month combinations
  
    // Iterate through the articles to extract year and month information
    articleFilter.forEach(item => {
      if (item.data_publicacio) {
        const date = new Date(item.data_publicacio);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const key = `${month} ${year}`; // Include the year in the key
  
        archiveMap.set(key, { title: key }); // Use the key as the title
      }
    });
  
    // Convert the Map values to an array of archive objects
    const archives = Array.from(archiveMap.values());
  
    // Sort the archive objects in descending order based on date
    archives.sort((a, b) => {
      const dateA = new Date(a.title);
      const dateB = new Date(b.title);
      return dateB - dateA;
    });
    setArchives(archives);
    return archives;
  };

  const handleArchiveClick = (month) => {
    setSelectedMonth(month);
  };

  return (
    <Container>
      <Helmet key="helmet">
        <meta name="og:description" content="Articles Es Projecte" />
      </Helmet>
      {/* <ArticlesContainer>
        {filteredArticles
          .filter((article) => !article.tags.indexOf('post'))
          .map((article) => (
            <ArticleItem key={article.uid} article={article} />
        ))}
      </ArticlesContainer> */}
      <ArticlesContainer>
        {Object.keys(filteredArticles).map((month) => (
          <div key={month}>
            {Array.isArray(filteredArticles[month])
              ? filteredArticles[month]
                  .filter((article) => !article.tags || article.tags.includes('post'))
                  .map((article) => (
                    <ArticleItem key={article.uid} article={article} />
                  ))
              : null}
          </div>
        ))}
      </ArticlesContainer>
      <SidebarContainer>
        { archives
        ? 
          <Sidebar
            archives={archives}
            social={sidebar.social}
            showAllArchives={showAllArchives}
            onShowAllArchives={() => setShowAllArchives(true)}
            onArchiveClick={handleArchiveClick}
          />
        :
        undefined
        }
      </SidebarContainer>
    </Container>
  );
};

const mapStateToPros = (state) => ({
  articles: Object.keys(state.articles)
    .map((uid) => state.articles[uid])
    .sort((article1, article2) =>
      DateTime.fromISO(article1.data_publicacio) < DateTime.fromISO(article2.data_publicacio)
      ? 1
      : -1
  )
});

export const Blog = connect(mapStateToPros)(BlogRoute);
