import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {fetchAppState} from './actions/actions';
import App from './containers/App';
import './styles/App.css';

const store = configureStore();

store.dispatch(fetchAppState());


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);