import Button from 'antd/lib/button';
import Prismic from 'prismic-javascript';
import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Button type="primary">Button</Button>
        </p>
      </div>
    );
  }
}

export default App;
