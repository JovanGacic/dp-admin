import React, {Component} from 'react';
import { connect } from 'react-redux';
import './NavBar.css';
import {
    Link 
  } from "react-router-dom";

class NavBar extends Component {
  
  render(){ 
    const { role } = this.props;

    return (


        <div>
          <ul>
            <li><Link to="/">Orders</Link></li> 

            { role === 'admin' && <li><Link to="/users">Users</Link></li> }
            { role === 'admin' && <li><Link to="/beers">Beers</Link></li> }
            <li className="right"><Link to="/login" onClick={() => this.props.logoutUser()} className="active">Sign out</Link></li>
          </ul>
        </div>
  
    )}
      
}

function mapStateToProps(state){
  return {
     role: state.auth.role
  }
}

export default connect(mapStateToProps)(NavBar);