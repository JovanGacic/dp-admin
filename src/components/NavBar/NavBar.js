import React, {Component} from 'react';
import './NavBar.css';
import {
    Link
  } from "react-router-dom";

export default class NavBar extends Component {

   // as {this.props.user.email}
   render(){ 
   
    return (


        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/beers">Beers</Link>
            </li>
            <li><p>You are logged in</p></li>
            <li className="right">
              <Link to="/login" onClick={() => this.props.logoutUser()} className="active">Sign out</Link>
            </li>
          </ul>

        
        </div>
  
    )}
      
}
