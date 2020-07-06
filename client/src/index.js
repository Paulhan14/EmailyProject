import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
/* Redux-Thunk:
Allows you to create actions creators that returns a function instead of an action.
This brings features like delayed dispatch of actions 
and dispatch of action when a condition is met.*/
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

/*
The store has the following responsibilities:

Holds application state;
Allows access to state via getState();
Allows state to be updated via dispatch(action);
Registers listeners via subscribe(listener);
Handles unregistering of listeners via the function returned by subscribe(listener).
*/
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // Provider tag knows changes in store and notice all children components
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
