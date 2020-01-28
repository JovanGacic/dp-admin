import React from 'react';
 import CardMedia from '@material-ui/core/CardMedia';
import './SingleBeer.css';

export default function SingleBeer (props) {

      return (  
        <div className="flex-container" key={props.id}>
            <div  className="image">
            <CardMedia
                component="img"
                alt={props.item.name}
                height="200"
                width="200"
                image={props.item.downloadUrl}
                title={props.item.name}
              />
                {/* <img style={{width:"200px", height:"200px"}}
                src={item.imgUrl}
                alt={item.name}
                />    */}
            </div>
            <div className="info">Ime: {props.item.name} <br></br>
                                  Cena: {props.item.price} RSD
            </div>
        
        </div>  
      )
    
  }
