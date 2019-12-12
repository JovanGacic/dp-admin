import React from 'react';
import {
    BrowserRouter as Router,
   // Route,
  } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './configureStore';

const store = configureStore();

function Root(){
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
}

export default Root;
