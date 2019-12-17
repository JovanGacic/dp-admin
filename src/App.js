import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Registration from './components/Registration/Registration';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import { Provider } from 'react-redux'; 
import './App.css';
import configureStore from './configureStore';
import { connect } from 'react-redux';

const store = configureStore();


function App(props) {
    const {isAuthenticated, isVerifying } = props;

  return (
   <Router>
     
      <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route exact path="/users" component={Users}/>
    </Switch>
    </Router>
  );
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
