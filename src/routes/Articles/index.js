import Prismic from 'prismic-javascript';
import React, { Component } from 'react';

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
          { orderings : '[my.blog_post.data_publicacio desc]' }
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
    console.log(this.state.articles);
    return (
      this.state.articles.map((article) =>
        <ArticleItem key={ article.id } article={ article } />
      )
    );
  }
}
