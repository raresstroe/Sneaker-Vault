import React from "react";
import Header from "@/Components/Header";
import { Link, usePage } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Card from "@/Components/Card";
import ProductSlider from "@/Components/ProductSlider";
import Footer from "@/Components/Footer";
import { useState } from "react";
import GridPictures from "@/Components/GridPictures";
import { useAuth } from "@/Components/includes/useAuth";
import { Inertia } from "@inertiajs/inertia";

export default function Product({
    array,
    similiar_products,
    orderItems,
    total,
}) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);

    const category = array[0].category;
    let sizes = [];
    if (array[0].size !== null) {
        sizes = array[0].size.split(",");
    }
    let pictures = Object.values(array[0].pics);

    const [activeItem, setActiveItem] = useState(0);
    const handleClick = (index) => {
        setActiveItem(index);
    };

    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        const selectedSize = document.getElementById("product-size").value;
        if (selectedSize === "1") {
            alert("Alege o marime");
            return;
        }

        Inertia.post("/cart/add", {
            product_id: array[0].id,
            quantity: quantity,
            size: selectedSize,
            price: array[0].price,
        });
    };

    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
                orderItems={orderItems}
                total={total}
            />
            <div className="product-container">
                <GridPictures pictures_array={pictures} />
                <div className="product-info">
                    <span className="product-label">{array[0].label}</span>
                    <h3 className="product-name">{array[0].title}</h3>
                    <div className="price-logo-container">
                        <h2 className="product-price">
                            {array[0].price} RON <span> cu TVA</span>
                        </h2>
                        {array[0].brand && (
                            <img src={array[0].brand} alt="brand-logo" />
                        )}
                    </div>
                    {array[0].size && (
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
                    )}
                    <p className="product-category">Categorie: {category}</p>
                    {array[0].short_description && (
                        <div className="product-description-container">
                            <p
                                className="product-description"
                                dangerouslySetInnerHTML={{
                                    __html: array[0].short_description,
                                }}
                            ></p>
                        </div>
                    )}
                    {array[0].size && (
                        <Link className="size-table">Tabel de masuri</Link>
                    )}
                    <div className="add-to-cart-container">
                        <Button
                            variant="dark"
                            className="add-to-cart"
                            onClick={addToCart}
                        >
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
                {similiar_products.map((card, index) => (
                    <Card
                        key={index}
                        className="card"
                        imgSrc={"/storage/" + card.img_src}
                        title={card.title}
                        label={card.label}
                        price={card.price + " RON"}
                        href={card.href}
                        category={category}
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
                {array[0].brand && (
                    <span
                        className={`product-content-item ${
                            activeItem === 2 ? "active" : ""
                        }`}
                        onClick={() => handleClick(2)}
                    >
                        Despre Brand
                    </span>
                )}
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
