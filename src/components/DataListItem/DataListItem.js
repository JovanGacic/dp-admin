import React, {Component} from "react";
import { isTemplateElement } from "@babel/types";

export default function DataListItem (props) {
  
    return (
        <li key={props.key}>{props.item.nesto}</li>
    )
}