import React from "react";

export default function OrderDropdown(props) {
    return (
        <div className="order-dropdown-component">
            <img src={props.imgSrc} alt="product-image" />
            <div>
                <p className="dropdown-header-text dropdown-header-title">
                    {props.name}
                </p>
                <p className="dropdown-header-text">Pret: {props.price} RON</p>
                <p className="dropdown-header-text">
                    Cantitate: {props.quantity}
                </p>
            </div>
        </div>
    );
}
