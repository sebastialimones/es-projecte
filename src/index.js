import React from 'react';
import ReactDOM from 'react-dom';
import 'vanilla-rough-notation';
import { TagFilterProvider } from './context/tagFilterContext'; 
import './index.css';
import { App } from './App';

const backgroundColor = '#fff4e4';

  ReactDOM.render(
    <TagFilterProvider> 
      <App/>
    </TagFilterProvider>,
  document.getElementById('root')
  );
