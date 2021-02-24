import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import persistState from 'redux-localstorage';

import reducers from './reducers';


const isClient = typeof window !== 'undefined';
const middlewares = [thunk, promise];
const statesToPersist = [
  'auth',
  'customer',
  'exchange',
  'transaction',
  'recipient',
  'system',
  'flinks',
  'company'
];

let reduxDevToolsCompose =
  process.browser && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.REACT_APP_ENV === 'dev'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null;
const composeEnhancers = reduxDevToolsCompose || compose;

const enhancers = [applyMiddleware(...middlewares)];
if (isClient) enhancers.push(persistState(statesToPersist));

const store = createStore(
  combineReducers({ ...reducers }),
  composeEnhancers(...enhancers)
);

export default store;
