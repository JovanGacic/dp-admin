import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { getData } from '../../actions';


class Home extends Component {

state = {
  dataList: {}
}

  async componentDidMount(){
    const x = await this.getData();
    this.setState({dataList:x});
  }

  renderObj = () => { 
    const { data } = this.props;
    Object.keys(data).map((obj, i) => {
      return (
        <div>
          {data[obj].nesto}
          <h1>4</h1>
        </div>
      )})}

  render() {
  
    const { isLoggingOut, logoutError } = this.props;
      return (
        <div>
          <NavBar logoutUser={this.handleLogout}/>
          <h2>Home</h2>
          {this.renderObj()}
        </div>
        );
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  } 

  getData = () => {
    console.log('udri');
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