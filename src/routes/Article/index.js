import Prismic from 'prismic-javascript';
import React, { Component } from 'react';

import { Article as ArticleComponent } from '../../components/Article';

export class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchArticle(this.props.match.params.uid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.uid !== nextProps.match.params.uid) {
      this.setState({ article: undefined }, () => {
        this.fetchArticle(nextProps.match.params.uid);
      });
    }
  }

  fetchArticle = (uid) => {
    const apiEndpoint = 'https://esprojecte.prismic.io/api/v2';
    Prismic
      .getApi(apiEndpoint)
      .then((api) => api.getByUID('article', this.props.match.params.uid))
      .then((article) => {
        this.setState({
          article: {
            ...article.data,
            tags: article.tags,
          },
        })
      })
      .catch((error) => {
        console.log('in da error');
        console.log(error);
      });
  }

  render() {
    const { article } = this.state;
    if (!article) {
      return false;
    }

    return (
      <ArticleComponent article={ article } isPost={ article.tags.indexOf('projecte') === -1 && article.tags.indexOf('qui-som') === -1 } />
    );
  }
}
