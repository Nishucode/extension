// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ChatButton } from './ChatButton';


ReactDOM.render(
  <Provider store={store}>
    <ChatButton />
  </Provider>,
  document.getElementById('root')
);

