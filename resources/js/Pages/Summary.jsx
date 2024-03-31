import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import ItemCartSummary from "@/Components/ItemCartSummary";
import Footer from "@/Components/Footer";
import { useAuth } from "@/Components/includes/useAuth";

export default function Summary() {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);

    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
            />
            <div className="summary-container">
                <div className="summary-shipping-method">
                    <p className="summary-shipment-title">
                        Modalitate de livrare
                    </p>
                    <hr />
                    <p className="summary-text">Livrare prin curier</p>
                    <p className="summary-text">
                        Nume- <span>nr tel</span>
                    </p>
                    <p className="summary-text summary-text-address">Adresa</p>
                </div>
                <div className="summary-payment-method">
                    <p className="summary-payment-title">Modalitate de plata</p>
                    <hr />
                    <p className="summary-text">Plata ramburs</p>
                </div>
            </div>
            <div className="summary-cart-cont">
                <div className="summary-cart-container">
                    <ItemCartSummary
                        name="Adidas Superstar"
                        price="300 RON"
                        size="42"
                        image="../images/shoe1.png"
                        quantity="1"
                    ></ItemCartSummary>
                </div>
            </div>
            <div className="summary-send-container">
                <p className="summary-total-text">Total Comanda: 300 RON</p>
                <p className="summary-side-text">
                    Prin plasarea comenzii, ești de acord cu &nbsp;
                    <Link href="/links/terms">Termenii și Condițiile</Link>, și cu
                    &nbsp;
                    <Link href="/links/policy">Politica de Confidențialitate</Link>.
                </p>
                <button className="btn btn-dark summary-send-button">
                    <p className="summary-button-text">Trimite Comanda</p>
                </button>
            </div>
            <Footer></Footer>
        </div>
    );
}
