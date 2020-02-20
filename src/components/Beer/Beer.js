import React, { Component } from 'react';
import { logoutUser, addBeer, getAllBeers, deleteBeer, updateBeer } from '../../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from '../NavBar/NavBar';
import SingleBeer from '../SingleBeer/SingleBeer';
import { ToastContainer, toast } from 'react-toastify';
import './Beer.css';

class Beer extends Component {

    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount(){
        await this.getAllBeers();
    }

    state = {
        name: '',
        price: '',
        volume: '',
        files: [],
        beers: [],
        searchString: ''
    }

    render() {
        return (
         <div>
            <NavBar logoutUser={this.handleLogout}/>
            <div className="container">
            <h4>Add a new beer</h4>
            
                
                <div className="textField">
                    <TextField id="name" label="Naziv piva" variant="outlined" onChange={event => this.handleName(event.target.value)} />
                </div>
                <div className="textField">
                    <TextField id="volume" label="Zapremina piva" variant="outlined" onChange={event => this.handleVolume(event.target.value)} />
                </div>
                <div className="textField">
                    <TextField id="price" label="Cena piva" variant="outlined" onChange={event => this.handlePrice(event.target.value)} />
                </div>
                <div className="img">
                    <input type='file' name="uploadedimage" accept="image/png, .jpeg, .jpg, image/gif" value={this.state.file}
                        onChange={this.onChange}></input>
                </div>
                <div className="btn">
                    <Button className='btn' variant="contained" color="primary" onClick={this.addBeer}>Add beer</Button>
                    {/* {this.state.files.map(x => 
                        <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
                        )} */}
                </div>
                
            
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            </div>
            <div className="search">
            <h4>Edit beer</h4>
                <TextField id="outlined-basic" variant="outlined" value={this.state.searchString} label="Pretraga" onChange={event => this.onSearch(event.target.value)} />       
                    {this.renderBeers().filter(
                            e => e.props.item.name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) > -1) }
            </div>
            
        </div>
          );
    }
  
    handleLogout = () => {
      const { dispatch } = this.props;
      dispatch(logoutUser());
    } 

    handleVolume(value) {
        this.setState({volume:value});
    }

    handlePrice(value) {
        this.setState({price:value});
    }

    handleName(value) {
        this.setState({name:value});
    }

    addBeer = () => {
        const {dispatch} = this.props;
        dispatch(addBeer(this.state.name, this.state.price, this.state.volume,this.state.files[0]));
    }
    
    
   onChange(e) {
     var files = e.target.files;
     console.log(files);
     var filesArr = Array.prototype.slice.call(files);
     console.log(filesArr);
     this.setState({ files: [...this.state.files, ...filesArr] });
   }
    
   //   removeFile(f) {
   //        this.setState({ files: this.state.files.filter(x => x !== f) }); 
   //   }

   getAllBeers = () => {
    const { dispatch } = this.props;
    dispatch(getAllBeers());
  } 

  onSearch(e) {
    this.setState({searchString:e});
  }

  renderBeers(){
    
    const { beers } = this.props;

    return beers.map((item) => 
       <SingleBeer key={item.id} id={item.id} item={item} deleteBeer={this.deleteBeer} updateBeer={this.updateBeer}/>
    );
  }

  deleteBeer = (beerId) => {
    const { dispatch } = this.props;
    dispatch(deleteBeer(beerId));
  }

  
    updateBeer = (beerId) => {
        const { dispatch } = this.props;
        dispatch(updateBeer(beerId))
    }

}

 
function mapStateToProps(state){
    return {
        beers: state.auth.beers
    }
  }
  
  export default connect(mapStateToProps)(Beer);