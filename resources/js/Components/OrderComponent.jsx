import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function OrderComponent(props) {
    return (
        <div className="orders-container">
            <img src={props.image} />
            <div className="orders-left-side">
                <p className="orders-name">{props.name}</p>
                <p className="orders-size">Marime: {props.size}</p>
                <p className="orders-size">Cantitate: {props.quantity}</p>
            </div>
            <div className="orders-right-side">
                <h4 className="orders-price">{props.price} RON</h4>
            </div>
        </div>
    );
}
