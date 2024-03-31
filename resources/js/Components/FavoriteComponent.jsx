import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteComponent(props) {
    return (
        <div className="favorites-container">
            <div className="favorite-inner-container">
                <img src={props.image} />
                <div className="favorite-left-side">
                    <p className="favorite-name">{props.name}</p>
                    <p className="favorite-avalability">{props.avalibility}</p>
                    <p className="favorite-size">Marime: {props.size}</p>
                </div>
                <div className="favorite-right-side">
                    <p className="favorite-price">{props.price} RON</p>
                    <button className="btn btn-dark favorite-cart-button">
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                    <button className="btn btn-dark favorite-cart-button">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="heart-favorite"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
