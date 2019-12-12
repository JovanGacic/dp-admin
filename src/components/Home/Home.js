import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { getData } from '../../actions';


class Home extends Component {

state = {
  array: []
}

 async componentDidMount(){
   await this.getData();
   // setTimeout(() => {
      console.log(this.props);  
   // }, 2000); 
}



  render() {
  
    //const { isLoggingOut, logoutError, data } = this.props;
   
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

  getData = async() => {
    const { dispatch } = this.props;
    dispatch(getData());
  
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