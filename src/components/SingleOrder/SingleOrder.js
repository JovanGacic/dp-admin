import React from 'react';
 import CardMedia from '@material-ui/core/CardMedia';
import './SingleOrder.css';

export default class SingleOrder extends React.Component {

   renderOrders(){

    return this.props.orders.map((item,key) => 
        <div className="flex-container" key={key}>
            <div  className="image">
            <CardMedia
                component="img"
                alt={item.name}
                height="200"
                width="200"
                image={item.imgUrl}
                title="Contemplative Reptile"
              />
                {/* <img style={{width:"200px", height:"200px"}}
                src={item.imgUrl}
                alt={item.name}
                />    */}
            </div>
        <div className="info">Kolicina: {item.quantity} <br></br>
                              Cena: {item.price} RSD
        </div>
        
        </div>  
    );
  }

  render() {

      return (
          <div>{this.renderOrders()}</div>
        );
  }
}