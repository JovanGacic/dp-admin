import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Beer from './components/Beer/Beer';
import Brands from './components/Brands/Brands';

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';

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
        <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/beers" component={Beer}/>
        <ProtectedRoute isAuthenticated={isAuthenticated} isVerifying={isVerifying} exact path="/users" component={Users}/>
        <ProtectedRoute isAuthenticated={isAuthenticated} isVerifying={isVerifying} exact path="/brands" component={Brands}/>
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
