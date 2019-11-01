import React, {Component} from 'react';
import './NavBar.css';
import Home from '../Home/Home';
import Users from '../Users/Users';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class NavBar extends Component {
 
   
   render(){ 
   
    return (

        <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li><p>You are logged in as {this.props.user.email}</p></li>
          <li className="right">
            <Link to="/login" onClick={() => this.props.signOut()} className="active">Sign out</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
           <Route path="/users">
            <Users />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </div>
    </Router>
    )}
      
}
