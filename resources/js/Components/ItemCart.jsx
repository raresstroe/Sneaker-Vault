import React from "react";
import { useState } from "react";

export default function ItemCart(props) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <div className="cart-image-container">
                <img src={props.image} />
                <div className="cart-items-left">
                    <p className="cart-item-name">{props.name}</p>
                    <p>{props.avalibility}</p>
                    <p className="cart-item-size">Mărime: {props.size}</p>
                    <button className="btn btn-danger product-heart-button cart-delete-product">
                        Sterge Produs
                    </button>
                </div>
                <div className="cart-items-right">
                    <p className="cart-price">{props.price}</p>
                    <div className="cart-quantity-container">
                        <button
                            className="cart-item-quantity-button"
                            onClick={() =>
                                setQuantity((prevQuantity) =>
                                    Math.max(prevQuantity - 1, 1)
                                )
                            }
                        >
                            -
                        </button>
                        <p className="cart-quantity-value">{quantity}</p>
                        <button
                            className="cart-item-quantity-button"
                            onClick={() =>
                                setQuantity((prevQuantity) => prevQuantity + 1)
                            }
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
