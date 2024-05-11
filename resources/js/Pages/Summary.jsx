import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Header from "@/Components/Header";
import ItemCartSummary from "@/Components/ItemCartSummary";
import Footer from "@/Components/Footer";
import { useAuth } from "@/Components/includes/useAuth";

export default function Summary({ order, orderItems, total }) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);

    const shippingAddress = order.shipping_address
        .split(";")
        .map((item) => item.trim());
    const username = shippingAddress[0];
    const city = shippingAddress[1];
    const county = shippingAddress[2];
    const address = shippingAddress[3];
    const postalCode = shippingAddress[4];
    const phone = shippingAddress[5];

    const handleSubmit = () => {
        Inertia.post("/cart/summary/send");
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
            <div className="summary-container">
                <div className="summary-shipping-method">
                    <p className="summary-shipment-title">
                        Modalitate de livrare
                    </p>
                    <hr />
                    <p className="summary-text">Livrare prin curier</p>
                    <p className="summary-text">
                        {username} - <span>{phone}</span>
                    </p>
                    <p className="summary-text summary-text-address">
                        Adresa: {address + ", " + city + ", " + county}
                    </p>
                    <p className="summary-text summary-text-address">
                        Cod Postal: {postalCode}
                    </p>
                </div>
                <div className="summary-payment-method">
                    <p className="summary-payment-title">Modalitate de plata</p>
                    <hr className="summary-line" />
                    <div className="summary-payment-method-container">
                        {order.payment_method === "cash" ? (
                            <p className="summary-text">Plata cu Ramburs</p>
                        ) : order.payment_method === "card" ? (
                            <p className="summary-text">Plata cu Cardul</p>
                        ) : (
                            <p className="summary-text">Plata cu Paypal</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="summary-cart-cont">
                <div className="summary-cart-container">
                    {orderItems.map((item, index) => (
                        <div>
                            <ItemCartSummary
                                key={index}
                                name={item.product.title}
                                price={`${item.product.price} RON`}
                                size={item.size}
                                image={"/storage/" + item.product.img_src}
                                quantity={item.quantity}
                            />
                            {index !== orderItems.length - 1 && <hr />}
                        </div>
                    ))}
                </div>
            </div>
            <div className="summary-send-container">
                <p className="summary-total-text">
                    Total Comanda:{" "}
                    {order.total_discounted_price >= 450
                        ? order.total_discounted_price + " RON"
                        : order.total_discounted_price + 20 + " RON"}
                </p>
                <p className="summary-side-text">
                    Prin plasarea comenzii, ești de acord cu &nbsp;
                    <Link href="/links/terms">Termenii și Condițiile</Link>, și
                    cu &nbsp;
                    <Link href="/links/policy">
                        Politica de Confidențialitate
                    </Link>
                    .
                </p>
                <button
                    className="btn btn-dark summary-send-button"
                    onClick={handleSubmit}
                >
                    <p className="summary-button-text">Trimite Comanda</p>
                </button>
            </div>
            <Footer></Footer>
        </div>
    );
}
