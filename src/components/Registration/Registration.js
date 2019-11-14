import React, {Component} from "react";
import {
    Link
  } from "react-router-dom";
import './Registration.css'

export default class Registration extends Component {

constructor(props){
    super(props);
    this.validatePassword = this.validatePassword.bind(this);
}

    state = {
        email:'',
        password:'',
        repeatedPassword: '',
        registrationError:'',
    }

  render() {
      return (
      <div>
            <div className="registration">
                <input type="text" placeholder="Email" onChange={event => this.handleEmail(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={event => this.handlePassword(event.target.value)}/> 
                <input type="password" placeholder="Repeat password" onChange={event => this.handleRepeatPassword(event.target.value)}/>
                <button onClick={() => this.register(this.state.email, this.state.password)}>Register</button>
                <button onClick={this.toggleRegister}>Cancel</button>
                <label>{this.state.registrationError}</label>    
                <div>
                    <Link to="/login">
                        <button className="register">Back to log in</button>
                    </Link>
                    <label>{this.state.loginError}</label> 
                </div>   
            </div> 
        </div>
      );
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
} 