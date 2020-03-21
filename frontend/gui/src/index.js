import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as actionTypes from './store/actions/actionTypes';

import reducer from './store/reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

// Check for token and update application state if required
// aka keep log in persistent across pages and refresh
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: actionTypes.AUTH_START });
}


// attach store into actual application
// make the store (which has the states) a property of the provider
// which connects to the app
const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

// the app is now passed in
ReactDOM.render(app, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//serviceWorker.register();