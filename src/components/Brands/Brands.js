import React from "react";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import NavBar from '../NavBar/NavBar';


/*const state = {

}*/


function Brands (props) {
    //console.log(props);
    return(
         <NavBar logoutUser={handleLogout}/>
    )
}

const handleLogout = props => {
    const { dispatch } = props;
    dispatch(logoutUser());
  } 

const mapStateToProps = state => ({
      
})
    
export default connect(mapStateToProps)(Brands);