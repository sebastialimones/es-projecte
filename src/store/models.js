import Prismic from 'prismic-javascript';

import { parseArticle } from './parsers';

const apiEndpoint = 'https://esprojecte.prismic.io/api/v2';

export const articles = {
  state: {},
  reducers: {
    addList(state, payload) {
      const newArticles = payload.reduce((acc, article) => {
        acc[article.uid] = article;
        return acc;
      }, {});
      return {
        ...state,
        ...newArticles,
      }
    },
  },
  effects: {
    async getList() {
      try {
        const api = await Prismic.getApi(apiEndpoint);
        const response = await api.query(
          [
            Prismic.Predicates.at('document.type', 'article'),
            Prismic.Predicates.at('document.tags', ['post']),
          ],
          { pageSize : 100 },
        );
        const booksResponse = await api.query(
          [
            Prismic.Predicates.at('document.type', 'article'),
            Prismic.Predicates.at('document.tags', ['book'])
          ],
          { pageSize : 100 },
        );
        const articles = response.results.map(parseArticle);
        const books = booksResponse.results.map(parseArticle);
        const allPost = [ ...articles, ...books]
        this.addList(allPost);
      } catch (error) {
        console.log('in da error');
        console.log(error);
      }
    },
    async getOne(uid) {
      try {
        const api = await Prismic.getApi(apiEndpoint);
        const article = await api.getByUID('article', uid);
        const parsedArticle = parseArticle(article);
        this.addList([parsedArticle])
      } catch (error) {
        console.log('in da error');
        console.log(error);
      }
    },
  }
};
