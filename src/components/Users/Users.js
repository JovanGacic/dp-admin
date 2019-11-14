import React, { Component } from 'react';
import "./Users.css";

class Users extends Component {
constructor(props){
    super(props);
 
    this.validatePassword = this.validatePassword.bind(this);
}

    state = {
        email:'',
        password:'',
        repeatedPassword: '',
        registrationError:'',
        role:''
    }

    render(){

        return(
            <div>     
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
                <button className="register" onClick={() => this.register((this.state.email, this.state.password))}>Register</button>
                <label>{this.state.registrationError}</label>
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

    register(email, password){
        
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


}

export default Users;