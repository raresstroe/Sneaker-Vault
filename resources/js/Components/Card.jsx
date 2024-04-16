import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

const Card = ({ imgSrc, title, label, price, href }) => {
    return (
        <div className="cards-link">
            <Link href={href}>
                <img src={imgSrc} className="cards" alt={title} />
            </Link>
            <div className="button-cards-container">
                <Link href="button-cards-link" className="button-cards-link">
                    <FontAwesomeIcon icon={faHeart} className="heart" />
                </Link>
                <span className="label-cards">{label}</span>
            </div>
            <div className="details">
                <div className="shoe-name">{title}</div>
                <div className="shoe-price">{price}</div>
            </div>
        </div>
    );
};

export default Card;
