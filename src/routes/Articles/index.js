import Prismic from 'prismic-javascript';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { ArticleItem } from '../../components/ArticleItem';

export class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.fetchArticles()
  }

  fetchArticles = () => {
    const apiEndpoint = 'https://esprojecte.prismic.io/api/v2';
    Prismic
      .getApi(apiEndpoint)
      .then((api) =>
        api.query(
          [
            Prismic.Predicates.at('document.type', 'article'),
            Prismic.Predicates.at('document.tags', ['post']),
          ],
          { orderings : '[my.article.data_publicacio desc]' }
        )
      )
      .then((response) => {
        this.setState({
          articles: response.results.map(result => ({
            ...result.data,
            id: result.id,
            uid: result.uid
          }))
        });
      })
      .catch((error) => {
        console.log('in da error');
        console.log(error);
      });
  }

  render() {
    return [
      <Helmet key="helmet">
        <meta name="description" content="Articles Es Projecte" />
      </Helmet>,
    ].concat(this.state.articles.map((article) =>
      <ArticleItem key={ article.id } article={ article } />
    ));
  }
}
