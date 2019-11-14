import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Registration from './components/Registration/Registration';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import { Provider } from 'react-redux'; 
import './App.css';
import configureStore from './configureStore';
import { connect } from 'react-redux';

const store = configureStore();

function App() {
  const {isAuthenticated, isVerifying } = props;
  return (
  <Provider store = {store}>
    <Router>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/" isAuthenticated={isAuthenticated} component={Home}/>
        <Route exact path="/users" component={Users}/>
      <div className="App">
      </div>
      </Router>
    </Provider>
  );
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
