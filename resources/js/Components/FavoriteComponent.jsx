import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";

export default function FavoriteComponent(props) {
    const categoryMap = {
        1: "Barbati",
        2: "Femei",
        3: "Copii",
        4: "Mystery Vault",
    };

    const ItemCategory = categoryMap[props.category];

    const remove = () => {
        Inertia.delete(`/favorites/remove/${props.id}`);
    };

    const addToCart = () => {
        let selectedSize = props.size;

        Inertia.post("/cart/add", {
            product_id: props.productId,
            quantity: 1,
            size: selectedSize,
            price: props.price,
        });
    };
    return (
        <div className="favorites-container">
            <div className="favorite-inner-container">
                <img src={props.image} />
                <div className="favorite-left-side">
                    <p className="favorite-name">{props.name}</p>
                    <p>Categorie: {ItemCategory}</p>
                    <p className="favorite-avalability">
                        {props.avalability == 1 ? "In Stoc" : "Indisponibil"}
                    </p>
                    <p className="favorite-size">
                        {props.size == 0 ? "" : "Marime: " + props.size}
                    </p>
                </div>
                <div className="favorite-right-side">
                    <p className="favorite-price">{props.price} RON</p>
                    <button
                        className="btn btn-dark favorite-cart-button"
                        onClick={addToCart}
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                    <button
                        className="btn btn-dark favorite-cart-button"
                        onClick={remove}
                    >
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
