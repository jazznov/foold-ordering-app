import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import appState from '../reducers/index';

const middleware = [thunk];

export default (initialState) => {
  return createStore(
    appState,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
};