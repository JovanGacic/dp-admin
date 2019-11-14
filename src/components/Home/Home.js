import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';


class Home extends Component {

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
     logoutError: state.auth.logoutError
  }
}

export default connect(mapStateToProps)(Home);