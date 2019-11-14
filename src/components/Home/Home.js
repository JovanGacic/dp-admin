import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';


class Home extends Component {
  constructor(props){
    super(props);

  }

  render() {
    const { isLoggingOut, logoutError } = this.props;

    return (
      <div>
        <button onClick={this.handleLogout}>CLICK</button>
        <NavBar logoutUser={this.logoutUser}/>
        <h2>Home</h2>
      </div>
      );
  }

  handleLogout = () => {
    console.log('alo')
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }
} 

function mapStateToProps(state){
  return {
     isLoggingOut: state.auth.isLoggingOut,
     logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Home);