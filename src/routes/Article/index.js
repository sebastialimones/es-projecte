import PrismicDOM from 'prismic-dom';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { Article as ArticleComponent } from '../../components/Article';
import store from '../../store';

const { dispatch } = store;

class ArticleRoute extends Component {


  componentDidMount() {
    this.fetchArticle(this.props.match.params.uid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.uid !== nextProps.match.params.uid) {
      this.fetchArticle(nextProps.match.params.uid);
    }
  }

  fetchArticle = (uid) => {
    dispatch.articles.getOne(uid);
  }

  render() {
    const { article } = this.props;
    if (!article) {
      return false;
    }

    return [
      <Helmet key="helmet">
        <meta property="og:url" content={ `http://www.esprojecte.io/articles/${article.uid}` } />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={ PrismicDOM.RichText.asText(article.titol) } />
        <meta property="og:description" content={ PrismicDOM.RichText.asText(article.contingut).slice(0, 100) + '...' } />
        <meta property="og:image" content={ article.imatge_principal.url} />
        <meta property="og:image:width" content="375" />
        <meta property="og:image:height" content="224" />
      </Helmet>,
      <ArticleComponent key="route" article={ article } isPost={ !article.tags.indexOf('projecte') && !article.tags.indexOf('qui-som') } />
    ];
  }
}

const mapStateToProps = (state, ownProps) => ({
  article: state.articles[ownProps.match.params.uid],
});

export const Article = connect(mapStateToProps)(ArticleRoute);