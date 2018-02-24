import Prismic from 'prismic-javascript';
import React, { Component } from 'react';

import { Routes } from './routes';

class App extends Component {

  componentDidMount() {
    const apiEndpoint = 'https://esprojecte.prismic.io/api/v2';
    Prismic.getApi(apiEndpoint).then(function(api) {
      return api.query(""); // An empty query will return all the documents
    }).then(function(response) {
      console.log("Documents: ", response.results);
    }, function(err) {
      console.log("Something went wrong: ", err);
    });
  }

  render() {
    return (
      <Routes />
    );
  }
}

export default App;
