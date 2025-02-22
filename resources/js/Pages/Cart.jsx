import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { usePage } from "@inertiajs/react";
import ItemCart from "@/Components/ItemCart";
import { useState } from "react";
import ProductSlider from "@/Components/ProductSlider";
import Card from "@/Components/Card";
import { useAuth } from "@/Components/includes/useAuth";
import { Inertia } from "@inertiajs/inertia";

export default function Cart({ orderItems, total, bestseller, order }) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    const [voucher, setVoucher] = useState("");

    const applyVoucher = () => {
        Inertia.post("/cart/voucher", { voucher });
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
            <p className="cart-title">Cosul Meu</p>
            <div className="cart-container">
                <div className="cart-container-left">
                    {orderItems.length == 0 ? (
                        <div className="cart-no-product">
                            <h3>Nu exista produse in cosul de cumparaturi</h3>
                        </div>
                    ) : (
                        orderItems.map((item, index) => (
                            <ItemCart
                                key={index}
                                id={item.id}
                                name={item.product.title}
                                quantity={item.quantity}
                                price={`${item.product.price} RON`}
                                avalability={item.product.is_active}
                                size={item.size}
                                image={"/storage/" + item.product.img_src}
                                category={item.product.category}
                            />
                        ))
                    )}
                </div>
                <div className="cart-container-right">
                    <p className="cart-summary">Sumar Comanda</p>
                    <p className="cart-summary-item">Cost: {total + " RON"}</p>
                    <p className="cart-summary-item">
                        Cost livrare:{" "}
                        {total >= 450
                            ? "GRATUIT"
                            : orderItems.length == 0
                            ? "0 RON"
                            : "20 RON"}
                    </p>
                    {order && order.total_discounted_price ? (
                        <p className="cart-summary-item">
                            Voucher: {order.voucher ? "-" : ""}{" "}
                            {order.total_price - order.total_discounted_price}{" "}
                            RON
                        </p>
                    ) : (
                        ""
                    )}

                    <p className="cart-total">Total: </p>
                    <p className="cart-total-value">
                        {orderItems.length == 0
                            ? "0 RON"
                            : total >= 450
                            ? order.total_discounted_price + " RON"
                            : order.total_discounted_price + 20 + " RON"}
                    </p>
                    {orderItems.length !== 0 ? (
                        <>
                            <button
                                className="btn btn-dark cart-button"
                                onClick={() =>
                                    (window.location.href = "/cart/checkout")
                                }
                            >
                                Pasul urmator
                            </button>
                            <hr />
                            <>
                                <p className="cart-voucher-title">Voucher</p>
                                <input
                                    type="text"
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                    placeholder="Voucher/Cod Promotional"
                                />
                                <button
                                    className="btn btn-dark product-heart-button cart-button"
                                    onClick={applyVoucher}
                                >
                                    Aplica Voucher
                                </button>
                                {order.voucher == null ? (
                                    ""
                                ) : (
                                    <p>Voucher folosit: {order.voucher.code}</p>
                                )}
                            </>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <h3 className="cart-title-recomandation">Produse Recomandate</h3>
            <ProductSlider>
                {bestseller.map((card, index) => (
                    <Card
                        key={index}
                        className="card"
                        imgSrc={"/storage/" + card.img_src}
                        title={card.title}
                        label={card.label}
                        price={card.price + " RON"}
                        href={card.href}
                        category={card.category}
                    />
                ))}
            </ProductSlider>
            <Footer></Footer>
        </div>
    );
}
