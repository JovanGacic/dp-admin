import React, {Component} from "react";
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { getData } from '../../actions';
import { getRole } from '../../actions';
import DataListItem from "../DataListItem/DataListItem";
import { ToastContainer, toast } from 'react-toastify';
import './Home.css';


class Home extends Component {

 async componentDidMount(){
   await this.getData();
   //console.log(this.props.user.user.uid);
   await this.getRole();
}

state = {
  searchString: ''
}

  renderData(){
    const { data } = this.props;
    return data.map((item,key) => 
      <DataListItem key={key} id={item.id} item={item}/>
    );
  }

  render() {

      return (
        <div className="home">
          <NavBar logoutUser={this.handleLogout}/>
          <h2>Orders</h2>
            <div className="body">
            <div className="lmnt">{this.renderData()}</div>
          </div>
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </div>
        );
  }

  onChange(value){
    this.setState({searchString:value});
} 

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  } 

  getData = async() => {
    const { dispatch } = this.props;
    dispatch(getData());
  } 

  getRole = async() => {
    const { dispatch, user } = this.props;
    dispatch(getRole(user.user.uid));
  }

}
function mapStateToProps(state){
  return {
     data: state.auth.data,
     user: state.auth.user
  }
}

export default connect(mapStateToProps)(Home);