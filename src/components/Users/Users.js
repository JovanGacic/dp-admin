import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Users.css";

import Navbar from '../NavBar/NavBar';
import { logoutUser, addUser } from '../../actions';


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
        const { registrationError,registrationErrorMsg,role} = this.props;
        if ( role === 'admin') {
            return (
                <div>
                    <Navbar logoutUser={this.handleLogout}/>
                    <div className="register">     
                        <label>Add a new user</label>
                        <div className="textField">
                            <TextField id="outlined-basic1" label="Email" variant="outlined" onChange={event => this.handleEmail(event.target.value)}/>
                        </div>
                        <div className="textField">
                            <TextField id="outlined-basic2" label="Password" type="password" variant="outlined" onChange={event => this.handlePassword(event.target.value)}/>
                        </div>
                        <div className="textField">    
                            <TextField id="outlined-basic3" label="Repeat password" type="password" variant="outlined" onChange={event => this.handleRepeatPassword(event.target.value)}/>
                        </div>
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
                        <Button onClick={() => this.addUserAndRole(this.state.email, this.state.password, this.state.role)}>Register</Button>
                        { registrationError ? 
                        <label>{registrationErrorMsg}</label>
                        : null
                        }
                    </div>
                </div>
            )}
           else {
                return <h2>You do not have authorization for the USERS menu.</h2>
           }
        }

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
        registrationErrorMsg: state.auth.registrationErrorMsg,
        role: state.auth.role
    };
}

export default connect(mapStateToProps)(Users);