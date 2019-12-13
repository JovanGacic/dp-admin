import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Users.css";

import Navbar from '../NavBar/NavBar';
import { logoutUser, addUser, addUserRole } from '../../actions';
import firebase from 'firebase';


class Users extends Component {
constructor(props){
    super(props);
 
    this.validatePassword = this.validatePassword.bind(this);
    
}

    state = {
        email:'',
        password:'',
        repeatedPassword: '',
        role:''
    }

    render(){
        const { registrationError,registrationErrorMsg } = this.props;
        return(
            <div>
                <Navbar logoutUser={this.handleLogout}/>
                <div className="register">     
                    <label>Add a new user</label>
                    <input type="text" placeholder="Email" onChange={event => this.handleEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" onChange={event => this.handlePassword(event.target.value)}/>
                    <input type="password" placeholder="Repeat password" onChange={event => this.handleRepeatPassword(event.target.value)}/>
                    <div>
                    <label><input className="radio" type="radio" value="admin" 
                                    checked={this.state.role === 'admin'}
                                    onChange={event => this.handleRole(event.target.value)}
                                    />
                                    Admin
                                    </label>
                    <label><input className="radio" type="radio" value="sales"
                                    checked={this.state.role === 'sales'}
                                    onChange={event => this.handleRole(event.target.value)}
                                    />
                                    Sales
                                    </label>
                    </div>
                    <button onClick={() => this.addUserAndRole(this.state.email, this.state.password, this.state.role)}>Register</button>
                    { registrationError ? 
                    <label>{registrationErrorMsg}</label>
                    : null
                    }
                </div>
            </div>
        )}
    
    handlePassword(value){
        this.setState({password:value});
    }

    handleRepeatPassword(value){
        this.setState({repeatedPassword:value});
    }

    handleEmail(value){
        this.setState({email:value});
    }

    validatePassword(){
        if(this.state.password !== this.state.repeatedPassword){
            this.setState({registrationError:'Provided passwords do not match.'});
            return -1;
        }
        else
            return 0;
    }

    handleRole(value){
        this.setState({role:value});
    }

    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
      } 

    addUserAndRole = (email, password, role) => {
        const { dispatch } = this.props;
        dispatch(addUser(email, password, role));
      
      } 
}

function mapStateToProps(state){
    return {
        registrationError: state.auth.registrationError,
        registrationErrorMsg: state.auth.registrationErrorMsg
    };
}

export default connect(mapStateToProps)(Users);