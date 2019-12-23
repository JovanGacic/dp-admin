import React from 'react';
import './SingleOrder.css';

export default class SingleOrder extends React.Component {

   renderOrders(){

    return this.props.orders.map((item,key) => 
        <div key={key}>
            <div  className="card">
                <img style={{width:"200px", height:"200px"}}
                src={item.imgUrl}
                alt={item.name}
                />   
            </div>
        <div className="quantity">Kolicina: {item.quantity}</div>
        </div>  
    );
  }

  render() {

      return (
          <div>{this.renderOrders()}</div>
        );
  }
}