import React from "react";

export default function ItemCartSummary(props) {
    return (
        <div>
            <div className="cart-image-container">
                <img src={props.image} className="summary-img" />
                <div className="cart-items-left summary">
                    <p className="cart-item-name">{props.name}</p>
                    <p className="cart-item-size">
                        {props.size == 0 ? "" : "Mărime: " + props.size}
                    </p>
                </div>
                <div className="cart-items-right summary">
                    <p className="cart-price summary">{props.price}</p>
                    <div className="cart-quantity-container">
                        <p className="cart-quantity-value summary">
                            Cantitate: {props.quantity}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
