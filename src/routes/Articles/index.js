import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { ArticleItem } from '../../components/ArticleItem';
import store from '../../store';

const { dispatch } = store;

export const ArticlesRoute = ({ articles }) => {
  useEffect(() => {
    dispatch.articles.getList();
  },[]);

  return [
    <Helmet key="helmet">
      <meta name="og:description" content="Articles Es Projecte" />
    </Helmet>,
  ].concat(articles
    .filter((article) => !article.tags.indexOf('post'))
    .map((article) =>
    <ArticleItem key={ article.uid } article={ article } />
  ));
}

const mapStateToPros = (state) => ({
  articles: Object.keys(state.articles)
    .map((uid) => state.articles[uid])
    .sort((article1, article2) =>
      DateTime.fromISO(article1.data_publicacio) < DateTime.fromISO(article2.data_publicacio)
      ? 1
      : -1
    )
})

export const Articles = connect(mapStateToPros)(ArticlesRoute);

