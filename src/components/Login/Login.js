import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Login.css';

import {
    Link
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
            <div>
                <div className="login">
                    <h2>Daj Pivo Admin</h2>
                    
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={event => this.handleEmail(event.target.value)} />
                    <TextField id="outlined-basic" label="Password" type="password" variant="outlined" onChange={event => this.handlePassword(event.target.value)} />
                    <div className="button">
                        <Button className="loginBtn" onClick={() => this.login(this.state.email, this.state.password)} variant="contained" color="primary">
                        {isLoggingIn ? <CircularProgress color="secondary" /> : 'Log in'}
                        </Button>
                        {/* <button className="loginBtn" onClick={() => this.login(this.state.email, this.state.password)}>Log in</button> */}
                        {/* <Link style={{margin:"10px"}} to="/registration">
                            <button>Register</button>
                        </Link> */}
                        <label style={{color:"red"}}>{loginErrorMessage}</label> 
                    </div>   
                </div> 
            </div>
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
    //    this.props.signInWithEmailAndPassword(email, password)
    //    .then(
    //        () => {
    //           console.log('Success.');
    //           this.setState({loginError:''})}
    //    )
    //    .catch(
    //       err => {
    //           console.log('There was an error when trying to log you in. ' + err)
    //           this.setState({loginError:err.message})
    //     }
    //    );
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

