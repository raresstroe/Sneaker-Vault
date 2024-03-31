import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { usePage } from "@inertiajs/react";
import ItemCart from "@/Components/ItemCart";
import { useState } from "react";
import ProductSlider from "@/Components/ProductSlider";
import Card from "@/Components/Card";
import { useAuth } from "@/Components/includes/useAuth";

export default function Cart() {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);

    const [voucher, setVoucher] = useState("");
    const cardsData = [
        {
            index: 1,
            imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
            title: "Adidas Superstar",
            label: "Nou",
            price: "Pret: 300 RON",
        },
        {
            index: 2,
            imgSrc: "https://static.ftshp.digital/img/p/1/0/7/8/7/8/0/1078780.jpg",
            title: "Nike Air Force 1",
            label: "Reducere",
            price: "Pret: 600 RON",
        },
        {
            index: 3,
            imgSrc: "https://static.ftshp.digital/img/p/7/8/1/6/3/3/781633.jpg",
            title: "NIKE AIR PRESTO MID UTILITY",
            label: "Nou",
            price: "Pret: 800 RON",
        },
    ];

    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
            />
            <p className="cart-title">Cosul Meu</p>
            <div className="cart-container">
                <div className="cart-container-left">
                    <ItemCart
                        name="Adidas Superstar"
                        price="300 RON"
                        size="42"
                        image="../images/shoe1.png"
                        avalibility="In stoc"
                    ></ItemCart>
                    <ItemCart
                        name="Adidas Superstar"
                        price="300 RON"
                        size="42"
                        image="../images/shoe1.png"
                        avalibility="In stoc"
                    ></ItemCart>
                </div>
                <div className="cart-container-right">
                    <p className="cart-summary">Sumar Comanda</p>
                    <p className="cart-summary-item">Cost</p>
                    <p className="cart-summary-item">Cost livrare</p>
                    <p className="cart-total">Total: </p>
                    <p className="cart-total-value">300 RON </p>
                    <button
                        className="btn btn-dark cart-button"
                        onClick={() =>
                            (window.location.href = "/cart/checkout")
                        }
                    >
                        Pasul urmator
                    </button>
                    <hr />
                    <p className="cart-voucher-title">Voucher</p>
                    <input
                        type="text"
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value)}
                        placeholder="Voucher/Cod Promotional"
                    />
                    <button
                        className="btn btn-dark product-heart-button cart-button"
                        onClick={() => applyVoucher(voucher)}
                    >
                        Aplica Voucher
                    </button>
                </div>
            </div>
            <h3 className="cart-title-recomandation">Produse Recomandate</h3>
            <ProductSlider>
                {cardsData.map((card, index) => (
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
            <Footer></Footer>
        </div>
    );
}
