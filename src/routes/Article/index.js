import PrismicDOM from 'prismic-dom';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { Article as ArticleComponent } from '../../components/Article';

export const ArticleRoute = ({ article, fetchArticle }) => {
  const match = useRouteMatch();

  useEffect(() => {
    fetchArticle(match.params.uid);
  }, [match.params.uid, fetchArticle]);

  if (!article) {
    return null;
  }

  return (
    <>
      <Helmet key="helmet">
        <meta property="og:url" content={`http://www.esprojecte.io/articles/${article.uid}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={PrismicDOM.RichText.asText(article.titol)} />
        <meta property="og:description" content={PrismicDOM.RichText.asText(article.contingut).slice(0, 100) + '...'} />
        <meta property="og:image" content={article.imatge_principal.url} />
        <meta property="og:image:width" content="375" />
        <meta property="og:image:height" content="224" />
      </Helmet>
      <ArticleComponent key={article.id} article={article} isPost={!article.tags.indexOf('projecte') && !article.tags.indexOf('qui-som')} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: state.articles[ownProps.match.params.uid],
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (uid) => dispatch.articles.getOne(uid),
});

export const Article = connect(mapStateToProps, mapDispatchToProps)(ArticleRoute);