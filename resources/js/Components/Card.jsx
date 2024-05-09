import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

const Card = ({ imgSrc, title, label, price, href, category }) => {
    const categoryMap = {
        1: "Barbati",
        2: "Femei",
        3: "Copii",
        4: "Mystery Vault",
    };
    return (
        <>
            <div className="cards-link">
                <Link href={href}>
                    <img src={imgSrc} className="cards" alt={title} />
                </Link>
                <div className="button-cards-container">
                    <Link href={href} className="button-cards-link">
                        <FontAwesomeIcon icon={faHeart} className="heart" />
                    </Link>
                    <span className="label-cards">{label}</span>
                </div>
            </div>
            <div className="details">
                <div className="shoe-name">{title}</div>
                <div className="shoe-category">{categoryMap[category]}</div>
                <div className="shoe-price">{price}</div>
            </div>
        </>
    );
};

export default Card;
