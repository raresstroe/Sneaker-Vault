import React from "react";
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

    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
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
                                            <label htmlFor="postal-code">
                                                Cod Postal
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="postal-code"
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
                                    onClick={handleCloseModal}
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
                            value="paypal"
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
                                <p>300 RON</p>
                                <p>20 RON</p>
                                <p>0 RON</p>
                            </div>
                        </div>

                        <div className="checkout-summary-right">
                            <p className="checkout-total-text">
                                Total: 320 RON
                            </p>
                            <button
                                className="btn btn-dark cart-button"
                                onClick={() =>
                                    (window.location.href = "/cart/summary")
                                }
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
