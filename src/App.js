import React from 'react';
import { Provider } from 'react-redux';

import { Routes } from './routes';
import store from './store';

export const App = () => (
  <Provider store={ store }>
    <Routes />
  </Provider>
);
