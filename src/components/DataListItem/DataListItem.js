import React from "react";
import './DataListItem.css';

export default function DataListItem (props) {
  //  console.log(props.item.id);
    return (
        <div className="dataList">
            <li className="listItem" key={props.id}><a href='a' className="anchor">{props.item.nesto}</a></li>
        </div>
    )
}