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
`;
const CardContainer = styled.div` 
  margin-bottom: 1em;
`;
const BookBackContainer = styled.div` 
  margin: 0.7em;
`;
const Title = styled.div`
  font-weight: bold; 
  font-size: 1.5em;
  margin-bottom: 0.6em;
`;
const Author = styled.div` 
  margin-bottom: 0.7em;
  font-weight: bold; 
`;
const Sinopsis = styled.div` 
  margin-bottom: 1em;
`;
const Quote = styled.div`
  margin-top: 1em;
  font-style: oblique;
`;
const Rating = styled.div` 
  position: fixed;
  bottom: 0;
  margin-bottom: 1.5em;
`;
const ImageContainer = styled.div` 
  margin: 1em;
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 400,
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
                  <img src={ book.imatge_principal.llibre.url } alt={ book.titol[0].text } />
              </ImageContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card className={classes.root} onClick={ handleClick } >
              <BookBackContainer >
                <Title>
                  {
                `${ book.titol[0].text } `
                  }
                </Title>
                <Author>
                  {
                `${ book.author[0].text } `
                  }
                </Author>
                <Sinopsis>
                  {
                    book.contingut[0].text  
                  }
                </Sinopsis>
                <Quote>
                  {
                    book.quote[0] ? book.quote[0].text : null 
                  }
                </Quote>
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
