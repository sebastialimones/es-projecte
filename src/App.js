import React from 'react';
import { Provider } from 'react-redux';
import { Routes } from './routes';
import store from './store';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId:'GTM-NQ553C7'
};

TagManager.initialize(tagManagerArgs)

export const App = () => (
  <Provider store={ store }>
    <Routes />
  </Provider>
);
