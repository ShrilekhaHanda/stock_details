import React from 'react';
import ReactDom from 'react-dom';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './components/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
  middleware.push(thunk)
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));