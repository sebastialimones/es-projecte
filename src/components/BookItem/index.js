import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import Card from '@material-ui/core/Card';
import StarRatings from 'react-star-ratings';
import { substackdarkerYellowBackground } from '../../constants';

const MaxContainer = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 15em;
  margin: 1em;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const CardContainer = styled.div` 
  margin-bottom: 1em;
`;

const BookBackContainer = styled.div` 
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: ${substackdarkerYellowBackground};
`;

const MiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: auto;
  flex-grow: 3;
  overflow-y: auto;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.7em;
  margin-bottom: 0.3em;
  color: #333;
  text-align: center;
`;

const Author = styled.div` 
  margin-bottom: 0.5em;
  font-weight: bold;
  font-size: 1.2em;
  color: #555;
  text-align: center;
`;

const Sinopsis = styled.div` 
  margin-bottom: 1em;
  font-size: 0.9em;
  color: #777;
  text-align: center;
  max-width: 90%;
`;

const Quote = styled.div`
  margin-top: 1em;
  font-style: oblique;
  color: #999;
  text-align: center;
  max-width: 90%;
  overflow-y: auto;
  flex: 1;
`;

const Rating = styled.div` 
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  flex-grow: 1;
`;

const ImageContainer = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
`;

const useStyles = makeStyles({
  root: {
    border: '0.1px solid rgba(0,0,0,0.1)',
    minWidth: 275,
    height: 400,
    transition: 'box-shadow 0.5s ease-out',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.2)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    backgroundColor: substackdarkerYellowBackground,
    '&:hover': {
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const BookItem = ({ book, isFirst }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!isFirst) return;
    const timer = setTimeout(() => {
      setIsFlipped(true);
      const flipBackTimer = setTimeout(() => {
        setIsFlipped(false);
      }, 1500);
  
      return () => clearTimeout(flipBackTimer);  
    }, 500);
  
    return () => clearTimeout(timer); 
  }, []);
  
  const handleClick = (event) => {
    event.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <MaxContainer>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <CardContainer>
          <Card className={classes.root} onClick={handleClick}>
            <ImageContainer key={book.imatge_principal.llibre.url}>
              <source srcSet={book.imatge_principal.llibre.urlWebP} type="image/webp" />
              <img 
                src={`${book.imatge_principal.llibre.url}&w=300&h=400&auto=format`} 
                alt={book.titol[0].text} 
                loading="lazy"
                style={{ 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: '13px',
                }} 
              />
            </ImageContainer>
          </Card>
        </CardContainer>
        <CardContainer>
          <Card className={classes.root} onClick={handleClick}>
            <BookBackContainer>
              <TopContent>
                <Title>{book.titol[0].text}</Title>
              </TopContent>
              <MiddleContent>
                <Author>{book.author[0].text}</Author>
                <Sinopsis>{book.contingut[0].text}</Sinopsis>
                <Quote>{book.quote[0] ? book.quote[0].text : null}</Quote>
              </MiddleContent>
              <Rating>
                <StarRatings
                  rating={book.rating ? book.rating : 0}
                  starRatedColor='rgb(255, 234, 0)'
                  numberOfStars={5}
                  name='rating'
                  starDimension='25px'
                />
              </Rating>
            </BookBackContainer>
          </Card>
        </CardContainer>
      </ReactCardFlip>
    </MaxContainer>
  )
};
