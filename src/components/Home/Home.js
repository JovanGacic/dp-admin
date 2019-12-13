import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { getData } from '../../actions';
import DataListItem from "../DataListItem/DataListItem";


class Home extends Component {

state = {
  array: []
}

 async componentDidMount(){
   await this.getData();
}

  renderData(){
    const { data } = this.props;
    return data.map((item,key) => 
  
      //<li key={key}>{item.nesto}</li>
      <DataListItem key={key} item={item}/>
  
    );
  }

  render() {

      return (
        <div>
          <NavBar logoutUser={this.handleLogout}/>
          <h2>Home</h2>
          <div>{this.renderData()}</div>
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
     data: state.auth.data
  }
}

export default connect(mapStateToProps)(Home);