import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/Components/includes/useAuth";

export default function Checkout(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [county, setCounty] = useState("");
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    const [paymentMethod, setPaymentMethod] = useState(
        props.order.payment_method
    );

    // console.log(props.order);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (county && props.counties[county]) {
            setCities([]);
            setCities(props.counties[county]);
        } else {
            setCities([]);
        }
    }, [county, props.counties]);

    const handleSaveAddress = () => {
        const name = document.getElementById("name").value;
        const phoneNumber = document.getElementById("phone_number").value;
        const county = document.getElementById("county").value;
        const city = document.getElementById("city").value;
        const postalCode = document.getElementById("postal_code").value;
        const address = document.getElementById("address").value;

        Inertia.post("/cart/checkout/addAddress", {
            name: name,
            phone_number: phoneNumber,
            county: county,
            city: city,
            postal_code: postalCode,
            address: address,
        });
    };

    const handleSubmit = () => {
        const payment = document.querySelector('input[name="payment"]:checked');

        if (!payment) {
            alert("Alege o metoda de plata!");
            return;
        }

        const paymentMethod = payment.value;

        Inertia.post("/cart/checkout/addPayment", {
            payment_method: paymentMethod,
        });
    };
    let username = "";
    let cityName = "";
    let countyName = "";
    let address = "";
    let postalCode = "";
    let phone = "";

    if (props.order && props.order.shipping_address) {
        const shippingAddress = props.order.shipping_address
            .split(";")
            .map((item) => item.trim());
        username = shippingAddress[0];
        cityName = shippingAddress[1];
        countyName = shippingAddress[2];
        address = shippingAddress[3];
        postalCode = shippingAddress[4];
        phone = shippingAddress[5];
    }

    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
                orderItems={props.orderItems}
                total={props.total}
            />
            <p className="checkout-title">Detalii Comanda</p>
            <div className="checkout-container">
                <div className="checkout-shipment-container">
                    <p className="checkout-shipment-title">
                        1. Metoda de Livrare
                    </p>
                    <button className="btn btn-dark cart-button checkout-button">
                        Livrare prin Curier
                    </button>
                    <div className="checkout-shipment-address">
                        <p className="checkout-shipment-address-title">
                            Adaugati o adresa de livrare
                        </p>
                        {props.order.shipping_address ? (
                            <p>
                                Adresa de livrare salvata este:{" "}
                                {username +
                                    ", " +
                                    address +
                                    ", " +
                                    cityName +
                                    ", " +
                                    countyName +
                                    ", " +
                                    postalCode +
                                    ", " +
                                    phone}
                            </p>
                        ) : (
                            ""
                        )}
                        <button
                            className="btn btn-dark cart-button checkout-button"
                            onClick={handleOpenModal}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            &nbsp; Adauga Adresa
                        </button>

                        <Modal
                            show={isModalOpen}
                            onHide={handleCloseModal}
                            centered
                            size="md"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Adauga o noua adresa de livrare
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <p className="checkout-modal-title">
                                        Persona de contact
                                    </p>
                                    <div className="checkout-modal-name-container">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Nume Prenume
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone_number">
                                                Numar de telefon
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone_number"
                                            />
                                        </div>
                                    </div>

                                    <p className="checkout-modal-title">
                                        Adresa de livrare
                                    </p>
                                    <div className="checkout-county-container">
                                        <div className="form-group">
                                            <label htmlFor="county">
                                                Judet
                                            </label>
                                            <select
                                                className="form-control checkout-select"
                                                id="county"
                                                value={county}
                                                onChange={(e) =>
                                                    setCounty(e.target.value)
                                                }
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    defaultValue
                                                >
                                                    Selecteaza
                                                </option>
                                                {Object.keys(
                                                    props.counties
                                                ).map((county) => (
                                                    <option
                                                        key={county}
                                                        value={county}
                                                    >
                                                        {county}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">Oras</label>
                                            <select
                                                className="form-control checkout-select"
                                                id="city"
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                            >
                                                {cities.map((city, index) => (
                                                    <option
                                                        key={index}
                                                        value={city}
                                                    >
                                                        {city}&nbsp;
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="postal_code">
                                                Cod Postal
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="postal_code"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Adresa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="ex: Strada, numar, bloc, scara, apartament"
                                        />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Anuleaza
                                </button>
                                <button
                                    className="btn btn-dark"
                                    onClick={handleSaveAddress}
                                >
                                    Salveaza
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="checkout-payment-container">
                    <p className="checkout-payment-title">2. Metoda de Plata</p>
                    <div className="checkout_payment_radio">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="payment1"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                        />
                        <label htmlFor="payment1" className="form-check-label">
                            Card online
                        </label>
                        <div className="debit-card-types">
                            <FontAwesomeIcon
                                icon={faCcVisa}
                                className="debit-card-icon"
                            />
                            &nbsp; &nbsp;
                            <FontAwesomeIcon
                                icon={faCcMastercard}
                                className="debit-card-icon"
                            />
                        </div>
                    </div>
                    <div className="checkout_payment_radio">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="payment2"
                            name="payment"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                        />
                        <label htmlFor="payment2" className="form-check-label">
                            Paypal
                        </label>
                        <div className="debit-card-types">
                            <FontAwesomeIcon
                                icon={faPaypal}
                                className="debit-card-icon"
                            />
                        </div>
                    </div>
                    <div className="checkout_payment_radio ">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="payment3"
                            name="payment"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => setPaymentMethod("cash")}
                        />
                        <label htmlFor="payment3" className="form-check-label">
                            Ramburs la curier
                        </label>
                        <div className="debit-card-types">
                            <FontAwesomeIcon
                                icon={faWallet}
                                className="debit-card-icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="checkout-summary-container">
                    <p className="checkout-summary-title">Sumar Comanda</p>
                    <hr />
                    <div className="checkout-summary-row-container">
                        <div className="checkout-summary-left">
                            <div className="checkout-summary-left-text">
                                <p className="checkout-summary-text">Cost</p>
                                <p className="checkout-summary-text">
                                    Cost Livrare
                                </p>
                                <p className="checkout-summary-text">Voucher</p>
                            </div>
                            <div className="checkout-summary-left-text-right">
                                <p>{props.order.total_price + " RON"}</p>
                                <p>
                                    {props.total >= 450
                                        ? "GRATUIT"
                                        : props.orderItems.length == 0
                                        ? "0 RON"
                                        : "20 RON"}
                                </p>
                                {props.order.voucher_id ? (
                                    <p>
                                        -
                                        {props.order.total_price -
                                            props.order
                                                .total_discounted_price}{" "}
                                        RON
                                    </p>
                                ) : (
                                    "0 RON"
                                )}

                                {/* {console.log(props.order)} */}
                            </div>
                        </div>

                        <div className="checkout-summary-right">
                            <p className="checkout-total-text">
                                Total:{" "}
                                {props.orderItems.length == 0
                                    ? "0 RON"
                                    : props.total >= 450
                                    ? props.order.total
                                    : props.total + 20}{" "}
                                RON
                            </p>
                            <button
                                className="btn btn-dark cart-button"
                                onClick={() => handleSubmit()}
                            >
                                Pasul urmator
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
