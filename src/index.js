import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './components/App';

const root = document.getElementById('root');

render((
  <Provider store={ store }>
    <App />
  </Provider>
), root);
