import React, {Component} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';


class EditBeer extends Component {

    state = {
        name: this.props.name,
        price: this.props.price,
        volume: this.props.volume
    }

handleName(name){
    this.setState({name});
}

handlePrice(price){
    this.setState({price});
}

handleVolume(volume){
    this.setState({volume});
}

    render(){
        return(
          <Card>
            <CardContent style={{display: 'flex', width: '80%', flexWrap: 'wrap', margin: 'auto'}} >
              <TextField style={{width: '100%', padding: '5px'}} className="field" id="name" label="New name" variant="outlined" onChange={event => this.handleName(event.target.value)} value={this.state.name}/>
              <TextField style={{width: '100%', padding: '5px'}} className="field" id="price" label="New price" variant="outlined" onChange={event => this.handlePrice(event.target.value)} value={this.state.price} />
              <TextField style={{width: '100%', padding: '5px'}} className="field" id="volume" label="New volume" variant="outlined" onChange={event => this.handleVolume(event.target.value)} value={this.state.volume}/>
            </CardContent>
          </Card>
          
        )
    }

}


export default EditBeer;