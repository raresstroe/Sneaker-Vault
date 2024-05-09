import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ItemCart(props) {
    const [quantity, setQuantity] = useState(props.quantity);

    const remove = () => {
        Inertia.delete(`/cart/remove/${props.id}`);
    };
    const updateQuantity = (newQuantity) => {
        newQuantity = Math.max(newQuantity, 1);

        Inertia.put(`/cart/update/${props.id}`, { quantity: newQuantity })
            .then(() => {
                setQuantity(newQuantity);
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
            });
    };

    const categoryMap = {
        1: "Barbati",
        2: "Femei",
        3: "Copii",
        4: "Mystery Vault",
    };

    const ItemCategory = categoryMap[props.category];

    return (
        <div>
            <div className="cart-image-container">
                <img src={props.image} />
                <div className="cart-items-left">
                    <p className="cart-item-name">{props.name}</p>
                    <p>Categorie: {ItemCategory}</p>
                    <p>{props.avalability == 1 ? "In stoc" : "Indisponibil"}</p>
                    {props.category != 4 ? (
                        <p className="cart-item-size">Mărime: {props.size}</p>
                    ) : (
                        ""
                    )}
                    <button
                        className="btn btn-danger product-heart-button cart-delete-product"
                        onClick={remove}
                    >
                        Sterge Produs
                    </button>
                </div>
                <div className="cart-items-right">
                    <p className="cart-price">{props.price}</p>
                    <div className="cart-quantity-container">
                        <button
                            className="cart-item-quantity-button"
                            onClick={() =>
                                updateQuantity(Math.max(quantity - 1, 1))
                            }
                        >
                            -
                        </button>
                        <p className="cart-quantity-value">{quantity}</p>
                        <button
                            className="cart-item-quantity-button"
                            onClick={() => updateQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
