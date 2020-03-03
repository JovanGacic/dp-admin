import React, { Component } from "react";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import NavBar from '../NavBar/NavBar';
import TextField from '@material-ui/core/TextField';


class Brands extends Component {

  render(){ 
    return (
      <div>
         <NavBar logoutUser={this.handleLogout}/>
         <TextField id="name" label="Naziv brenda" variant="outlined" onChange={event => this.handleName(event.target.value)} />
         <TextField id="name" label="Prioritet" variant="outlined" onChange={event => this.handleName(event.target.value)} />
      </div>
    )
   }

   handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  } 
}



const mapStateToProps = state => ({
      
})

    
export default connect(mapStateToProps)(Brands);