import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PrismicDOM from 'prismic-dom';

import { ReadingTime } from '../ReadingTime';
import { grey, red } from '../../constants';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const Container = styled.div`
  margin-top: 2em;
`;

const Title = styled.h1``;

const MetadataContainer = styled.div`
  color: ${grey};
  font-size: 0.8em;
  margin: 1em 0 2em 0;
`;

const TitleArticle = styled.div`
  & > p {
    margin: 1em 1em;
  }
  margin-bottom: 2em;
`;

const Content = styled.div`
  & > p {
    margin: 1em 0;
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 10;
  width: ${props => props.scrollProgress}%; /* Updated to use props */
  height: 2px; /* Adjust the height as needed */
  background-color: ${red}; /* Progress bar color */
  z-index: 9999;
  transition: width 0.2s ease-in-out;
  display: ${props => (props.scrolledBelowMenu ? 'block' : 'none')}; /* Conditional rendering */
`;

export const Article = ({ article, isPost }) => {
  useScrollToTop();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolledBelowMenu, setScrolledBelowMenu] = useState(false); // New state variable

  const contentHTML = PrismicDOM.RichText.asHtml(article.contingut)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
    
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(scrolled);
    
      // Check if the user scrolled below the main menu
      if (window.innerWidth <= 768) {
        // Use mobileMainMenuHeight for screens with width less than or equal to 768px (adjust as needed)
        if (scrollTop > mobileMainMenuHeight) {
          setScrolledBelowMenu(true);
        } else {
          setScrolledBelowMenu(false);
        }
      } else {
        // Use the default mainMenuHeight for larger screens
        if (scrollTop > mainMenuHeight) {
          setScrolledBelowMenu(true);
        } else {
          setScrolledBelowMenu(false);
        }
      }
    };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  // Replace 'mainMenuHeight' with the actual height of your main menu
  const mainMenuHeight = 89;
  const mobileMainMenuHeight = 77;

  return (
    <Container>
      <ProgressBar scrollProgress={scrollProgress} scrolledBelowMenu={scrolledBelowMenu} />
      {isPost && [
        <Title key="title">{PrismicDOM.RichText.asText(article.titol)}</Title>,
        <MetadataContainer key="metadata">
          <ReadingTime text={PrismicDOM.RichText.asHtml(article.contingut)} />
        </MetadataContainer>,
      ]}
      {article.titol[0] && (
        <TitleArticle dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(article.titol) }} />
      )}
      <Content dangerouslySetInnerHTML={{ __html: contentHTML }} />
    </Container>
  );
};