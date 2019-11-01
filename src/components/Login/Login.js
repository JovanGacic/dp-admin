import React, { Component } from 'react';
import './Login.css';
import NavBar from '../NavBar/NavBar';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

class Login extends Component {

    constructor(props){
        super(props);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    state = {
        email:'',
        password:'',
        repeatedPassword: '',
        toggleRegistration: false,
        loginError:'',
        registrationError:'',
    }
    
    render(){
        
        const {
            user,
            // error,
             signOut,
         } = this.props;
         
        return(
            
            <div>
                {
                user 
                ? (
                    <div> 
                       <NavBar user={user} signOut={signOut} />
                    </div>
                  )
                : ( 
                <div className="login">
                <input type="text" placeholder="Email" onChange={event => this.handleEmail(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={event => this.handlePassword(event.target.value)}/>
                {
                    this.state.toggleRegistration
                    ? (
                       <div>
                            <input type="password" placeholder="Repeat password" onChange={event => this.handleRepeatPassword(event.target.value)}/>
                            <button onClick={() => this.register(this.state.email, this.state.password)}>Register</button>
                            <button onClick={this.toggleRegister}>Cancel</button>
                            <label>{this.state.registrationError}</label>
                       </div>
                      )
                    : (   <div>
                            <button onClick={() => this.login(this.state.email, this.state.password)}>Log in</button>
                            <button className="register" onClick={this.toggleRegister}>Register</button>
                            <label>{this.state.loginError}</label> 
                          </div>  )
                } 
                </div>
                  )
                }
              
            </div>
        )
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

    login(email, password){
       this.props.signInWithEmailAndPassword(email, password)
       .then(
           () => {
              console.log('Success.');
              this.setState({loginError:''})}
       )
       .catch(
          err => {
              console.log('There was an error when trying to log you in. ' + err)
              this.setState({loginError:err.message})
        }
       );
    }

    toggleRegister(){
        this.setState({toggleRegistration:!this.state.toggleRegistration});
    }

    register(email, password){
        if (this.validatePassword() === 0){
            this.props.createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                console.log('Success.');
                this.setState({registrationError:''})}
            )
            .catch(
            err => {
                console.log('There was an error when trying to sign you up. ' + err)
                this.setState({registrationError:err.message})
            }
            );
        }
    }

    validatePassword(){
        if(this.state.password !== this.state.repeatedPassword){
            this.setState({registrationError:'Provided passwords do not match.'});
            return -1;
        }
        else
            return 0;
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

export default withFirebaseAuth({
    firebaseAppAuth})(Login);

