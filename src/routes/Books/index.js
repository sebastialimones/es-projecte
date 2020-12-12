import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { ListOfBooks } from '../../components/ListOfBooks';
import store from '../../store';

const { dispatch } = store;

export const BooksRoute = ({ articles }) => {
  useEffect(() => {
    dispatch.articles.getList();
  },[]);
  
  return (
    <Helmet key="helmet">
      <meta name="og:description" content="Libros Es Projecte" />
    </Helmet>,
    <ListOfBooks  books={ articles } />
  );
}

const mapStateToPros = (state) => ({
  articles: Object.keys(state.articles)
    .map((uid) => state.articles[uid])
    .sort((article1, article2) =>
      DateTime.fromISO(article1.data_publicacio) < DateTime.fromISO(article2.data_publicacio)
      ? 1
      : -1
  )
});

export const Books = connect(mapStateToPros)(BooksRoute);
