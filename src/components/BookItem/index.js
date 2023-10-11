import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import Card from '@material-ui/core/Card';
import StarRatings from 'react-star-ratings';

const MaxContainer = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 15em;
  margin: 1em;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
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
  background-color: #f5f5f5;
`;

const MiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1; // This ensures that the middle content takes up all available space
  align-items: center;
  width: 100%;
`;

const TopContent = styled.div`
  margin-bottom: 1em; // Add some margin for spacing
`;

const Title = styled.div`
  font-weight: bold; 
  font-size: 1.7em;
  margin-bottom: 0.6em;
  color: #333;
  text-align: center; // Center the text
`;

const Author = styled.div` 
  margin-bottom: 0.7em;
  font-weight: bold; 
  font-size: 1.2em;
  color: #555;
  text-align: center; // Center the text
`;

const Sinopsis = styled.div` 
  margin-bottom: 1em;
  font-size: 0.9em;
  color: #777;
  text-align: center; // Center the text
  max-width: 90%; // Limit the width to ensure readability
`;

const Quote = styled.div`
  margin-top: 1em;
  font-style: oblique;
  color: #999;
  text-align: center; // Center the text
  max-width: 90%; // Limit the width to ensure readability
`;

const Rating = styled.div` 
  position: fixed;
  bottom: 0;
  margin-bottom: 1.5em;
`;

const ImageContainer = styled.div` 
  display: flex; // Use flex for centering
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  height: 100%; // Take full height of the card
  padding: 1em; // Add some padding around the image
  box-sizing: border-box; // Ensure padding doesn't increase the size of the container
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 400,
    transition: 'box-shadow 0.3s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px', // Add border radius to the card
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

export const BookItem = ({ book }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const classes = useStyles();
  
  const handleClick = (event) => {
    event.preventDefault();
    setIsFlipped(!isFlipped);
  };

    return (
      <MaxContainer>
        <ReactCardFlip isFlipped={ isFlipped } flipDirection="horizontal">
          <CardContainer>
            <Card className={classes.root} onClick={ handleClick } >
              <ImageContainer key={ book.imatge_principal.llibre.url }>
              <img 
                src={ book.imatge_principal.llibre.url } 
                alt={ book.titol[0].text } 
                style={{ 
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '13px', // Add border radius to the image
                }} 
              />
              </ImageContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className={classes.root} onClick={ handleClick } >
            <BookBackContainer>
            <TopContent>
              <Title>{ book.titol[0].text }</Title>
            </TopContent>
            <MiddleContent>
              <Author>{ book.author[0].text }</Author>
              <Sinopsis>{ book.contingut[0].text }</Sinopsis>
              <Quote>{ book.quote[0] ? book.quote[0].text : null }</Quote>
            </MiddleContent>
            <Rating>
              <StarRatings
                rating={ book.rating ? book.rating : 0 }
                starRatedColor='rgb(255, 234, 0)'
                numberOfStars={ 5 }
                name='rating'
                starDimension='35px'
              />
            </Rating>
          </BookBackContainer>
        </Card>
      </CardContainer>
    </ReactCardFlip>
  </MaxContainer>
    )
};
