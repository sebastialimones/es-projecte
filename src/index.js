import React from 'react';
import ReactDOM from 'react-dom';
import 'vanilla-rough-notation';
import { TagFilterProvider } from './context/tagFilterContext'; 
import './index.css';
import { App } from './App';
import Modal from 'react-modal';

Modal.setAppElement('#root');
  ReactDOM.render(
    <TagFilterProvider> 
      <App/>
    </TagFilterProvider>,
  document.getElementById('root')
  );
