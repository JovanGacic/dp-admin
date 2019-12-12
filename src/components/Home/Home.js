import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { getData } from '../../actions';


class Home extends Component {

  constructor(){
    super();
    console.log('cao');
    getData();
  }

  render() {
  
    const { isLoggingOut, logoutError } = this.props;
      return (
        <div>
          <NavBar logoutUser={this.handleLogout}/>
          <h2>Home</h2>
        </div>
        );
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  } 

}
function mapStateToProps(state){
  return {
     isLoggingOut: state.auth.isLoggingOut,
     logoutError: state.auth.logoutError,
     data: state.auth.data
  }
}

export default connect(mapStateToProps)(Home);