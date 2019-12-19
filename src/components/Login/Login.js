import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Login.css';

import {
    
  } from "react-router-dom";

class Login extends Component {


    state = {
        user: {},
        email:'',
        password:'',
        loginError:'',
    }
    
    render(){
        const { loginError, isLoggingIn, isAuthenticated, loginErrorMessage } = this.props;

        if (isAuthenticated){
            return <Redirect to="/" />
        } 
        else {
            return(  
            <form noValidate autoComplete="off">
                   <div style={{margin:"auto"}}>
                        <img src={require("../../assets/logo_transparent.png")} alt="Daj Pivo" style={{height:"40%", width:"40%"}}></img>
                    </div>
                    <h2>DP - Admin</h2>
                    <div className="textField">
                        <TextField id="outlined-basic1" label="Email" variant="outlined" onChange={event => this.handleEmail(event.target.value)} />
                    </div>
                    <div className="textField">
                        <TextField id="outlined-basic2" label="Password" type="password" variant="outlined" onChange={event => this.handlePassword(event.target.value)} />
                    </div>
                    <div className="button">
                        <Button className="loginBtn" onClick={() => this.login(this.state.email, this.state.password)} variant="contained" color="primary">
                        {isLoggingIn ? <CircularProgress color="inherit" size={24}/> : 'Log in'}
                        </Button>
                    </div> 
                    <div>
                        {loginError ? <label style={{color:"red"}}>{loginErrorMessage}</label> : null}
                    </div>      
            </form>
            )
        }
    }

    handlePassword(value){
        this.setState({password:value});
    }

    handleEmail(value){
        this.setState({email:value});
    }

    login(email, password){
        const {dispatch} = this.props;
        dispatch(loginUser(email,password))
    }

    signOut(){
        this.props.signOut()
        .then( () => {
                 console.log("Success.");
                })
        .catch( (err) => {
                console.log("There was an error while logging out. " + err.message);
            });
    }
}

function mapStateToProps(state){
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        loginErrorMessage: state.auth.loginErrorMessage
    };
}

export default connect(mapStateToProps)(Login);

