import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PrismicDOM from 'prismic-dom';

import { ReadingTime } from '../ReadingTime';
import { grey, mainColor } from '../../constants';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import media from '../../constants/media';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

const Container = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  ${media.smallScreen`
    padding-left: 10px;
  `}
`;

const Title = styled.h1`
`;

const MetadataContainer = styled.div`
  color: ${grey};
  font-size: 0.8em;
  margin: 1em 0 2em 0;
  `;

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3em;
  padding-top: 5em;
  ${media.smallScreen`
    padding-top: 1.5em;
  `}
`;

const TitleArticle = styled.div`
 flex: 2;
 color: ${mainColor};  
 font-size: 3em;
 ${media.smallScreen`
  font-size: 1.5em;
  `}
`;

const StyledIconContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  float: right;
  padding-left: 1em;
  position: relative;
  ${media.smallScreen`
    padding-top: 0em;
    padding-bottom: 0em;
  `}
`;

const IconButton = styled.button`
  border: none;         
  outline: none;        
  background: none;
  padding: 0;
  margin: 0; 
  box-shadow: none;
  padding-top: 0.3em;
`;

const Content = styled.div`
  margin-top: ${({ hasImage }) => (hasImage ? '3.5em' : '6em')};
  & > p {
    margin: 1em 0;
  }
`;

const ImageContainer = styled.div`
  height: 14em;
  width: 50%;
  ${media.smallScreen`width: 100%;`}
  padding-bottom: 1.5;
`;

const Image = styled.div`
  background-image: url('${({ imageUrl }) => imageUrl}');
  background-size: cover;
  height: 100%;
  width: 100%;
  border-radius: 6px;
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: ${props => props.scrollProgress}%; // Height will be based on scroll progress
  background-color: ${mainColor};
  z-index: 9999;
  transition: height 0.2s ease-in-out;
  display: ${props => (props.scrolledBelowMenu ? 'block' : 'none')};
  ${media.smallScreen`width: 10px;`}
`;

const Tooltip = styled.div`
  background-color: ${mainColor};
  color: white;
  padding: 5px 10px;
  position: absolute;
  top: -10px;  // You might need to adjust these values
  left: 10px;    // You might need to adjust these values
  border-radius: 5px;
  font-size: 0.8em;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
`;

const Separator = styled.div`
  border-bottom: 1px solid ${grey};
  height: 1.5em;
  margin-left: 0.5em;
  margin-right: 1em;
`;

const handleEmailClick = () => {
  const subject = encodeURIComponent('Echalé un vistazo a este post!');
  const body = encodeURIComponent(`Creo que te puede interesar: ${window.location.href}`);
  window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
};

const handleFacebookClick = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share-dialog', 'width=800,height=600');
};


export const Article = ({ article, isPost }) => {
  useScrollToTop();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolledBelowMenu, setScrolledBelowMenu] = useState(false);
  const [isContentLong, setIsContentLong] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);

    // Check if content is longer than viewport
    if (document.documentElement.scrollHeight > window.innerHeight) {
        setIsContentLong(true);
    } else {
        setIsContentLong(false);
    }

    return () => {
        window.removeEventListener('scroll', updateScrollProgress);
    };
}, []);

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

  const handleShare = () => {
    const url = window.location.href;

    if (window.innerWidth <= 768) {  // Mobile
        window.location.href = `whatsapp://send?text=${url}`;
    } else {  // Desktop
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
              console.log('ion da dektio')
                setShowTooltip(true);
                setTimeout(() => setShowTooltip(false), 2000);  // Hide tooltip after 2 seconds
            }).catch(err => {
                console.error('Could not copy the URL', err);
            });
        } else {
            alert(`Copy and share this link: ${url}`);
        }
    }
  };

  return (
    <Container>
      {isPost && [
        <Title key="title">{PrismicDOM.RichText.asText(article.titol)}</Title>,
        <MetadataContainer key="metadata">
          <ReadingTime text={PrismicDOM.RichText.asHtml(article.contingut)} />
        </MetadataContainer>,
      ]}
  
      {article.titol[0] && (
        <SubHeaderContainer>
          <TitleArticle dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(article.titol) }} />  
        </SubHeaderContainer>
      )}
      <ProgressBar scrollProgress={scrollProgress} scrolledBelowMenu={scrolledBelowMenu && isContentLong} />
      {article.imatge_principal?.url && (
        <ImageContainer>
          <Image imageUrl={ article.imatge_principal.url } />
        </ImageContainer>
      )}
      <Content hasImage={!!article.imatge_principal?.url} dangerouslySetInnerHTML={{ __html: contentHTML }} />
      <Separator />
      <FooterContainer>
        <span>Publicado en {new Date(article.data_publicacio).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
        <StyledIconContainer>
          <IconButton onClick={handleEmailClick}>
              <EmailIcon />
          </IconButton>
          <IconButton onClick={handleFacebookClick}>
              <FacebookIcon />
          </IconButton>
          <IconButton onClick={handleShare}>
              <ShareOutlinedIcon />
              <Tooltip show={showTooltip}>Link copiado</Tooltip>
          </IconButton>
      </StyledIconContainer>
      </FooterContainer>
    </Container>
  );
};