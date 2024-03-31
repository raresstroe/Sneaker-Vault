import React from "react";
import Header from "../Components/Header";
import { Link, usePage } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Card from "../Components/Card";
import ProductSlider from "../Components/ProductSlider";
import Footer from "../Components/Footer";
import { useState } from "react";
import GridPictures from "@/Components/GridPictures";
import { useAuth } from "@/Components/includes/useAuth";

const cardsDataSale = [
    {
        index: 1,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Reducere",
        price: "Pret: 100 RON",
    },
    {
        index: 2,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Reducere",
        price: "Pret: 200 RON",
    },
    {
        index: 3,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Reducere",
        price: "Pret: 300 RON",
    },
];
export default function Product() {
    const { array } = usePage().props;
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);

    let sizes = array[0].size.split(",");
    let pictures = Object.values(array[0].pics);

    const [activeItem, setActiveItem] = useState(0);
    const handleClick = (index) => {
        setActiveItem(index);
    };
    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
            />
            <div className="product-container">
                <GridPictures pictures_array={pictures} />
                <div className="product-info">
                    <span className="product-label">{array[0].label}</span>
                    <h3 className="product-name">{array[0].title}</h3>
                    <div className="price-logo-container">
                        <h2 className="product-price">
                            {array[0].price} <span> cu TVA</span>
                        </h2>
                        <img src={array[0].brand} alt="brand-logo" />
                    </div>

                    <select
                        name="product-sizes"
                        id="product-size"
                        defaultValue="1"
                    >
                        <option value="1" disabled>
                            Alege Marimea
                        </option>
                        {sizes.map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <div className="product-description-container">
                        <p
                            className="product-description"
                            dangerouslySetInnerHTML={{
                                __html: array[0].short_description,
                            }}
                        ></p>
                    </div>
                    <Link className="size-table">Tabel de masuri</Link>
                    <div className="add-to-cart-container">
                        <Button variant="dark" className="add-to-cart">
                            Adauga in cos
                        </Button>
                        <button className="btn btn-dark product-heart-button">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="product-heart"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <h3 className="similar-products">Produse Similare</h3>
            <ProductSlider>
                {cardsDataSale.map((card, index) => (
                    <Card
                        key={index}
                        className="card"
                        imgSrc={card.imgSrc}
                        title={card.title}
                        label={card.label}
                        price={card.price}
                    />
                ))}
            </ProductSlider>
            <div className="product-content-container">
                <span
                    className={`product-content-item ${
                        activeItem === 0 ? "active" : ""
                    }`}
                    onClick={() => handleClick(0)}
                >
                    Descriere
                </span>
                {/* <span
                    className={`product-content-item ${
                        activeItem === 1 ? "active" : ""
                    }`}
                    onClick={() => handleClick(1)}
                >
                    Recenzii
                </span> */}
                <span
                    className={`product-content-item ${
                        activeItem === 2 ? "active" : ""
                    }`}
                    onClick={() => handleClick(2)}
                >
                    Despre Brand
                </span>
            </div>
            <div
                className={`product-content-description ${
                    activeItem === 0 ? "active" : ""
                }`}
                onClick={() => handleClick(0)}
                dangerouslySetInnerHTML={{
                    __html: array[0].long_description,
                }}
            ></div>
            <div
                className={`product-content-brand ${
                    activeItem === 2 ? "active" : ""
                }`}
                onClick={() => handleClick(2)}
                dangerouslySetInnerHTML={{
                    __html: array[0].brand_text,
                }}
            ></div>
            <Footer></Footer>
        </div>
    );
}
