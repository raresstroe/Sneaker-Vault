import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import EditVoucher from "./EditVoucher";

export default function VoucherCard(props) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    console.log(props.vouchers);

    let vouchers = props.vouchers;

    const handleModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDelete = () => {
        if (selectedVoucher) {
            Inertia.delete(`voucher/${selectedVoucher.id}`);
            setShowModal(false);
        }
    };

    return (
        <>
            <div className="admin-voucher-grid">
                {vouchers.map((voucher) => {
                    return (
                        <div className="admin-voucher-card" key={voucher.id}>
                            <div className="voucher-card-info">
                                <h3>Informatii</h3>

                                {voucher && (
                                    <div>
                                        <p>
                                            <span>ID: </span>
                                            {voucher.id}
                                        </p>
                                        <p>
                                            <span>Cod: </span>
                                            {voucher.code}
                                        </p>
                                        <p>
                                            <span>Valoare: </span>
                                            {voucher.discount_value}
                                            {voucher.discount_type ==
                                            "percentage"
                                                ? "%"
                                                : " RON"}
                                        </p>
                                        <p>
                                            <span>Tipul Discountului: </span>
                                            {voucher.discount_type ==
                                            "percentage"
                                                ? "Procent"
                                                : "Suma fixa"}
                                        </p>
                                        <p>
                                            <span>Data Expirarii: </span>
                                            {voucher &&
                                                new Date(
                                                    voucher.valid_until
                                                ).toLocaleDateString("ro-RO", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "2-digit",
                                                })}
                                        </p>

                                        <p>
                                            <span>Activ: </span>
                                            {voucher.is_active ? "Da" : "Nu"}
                                        </p>
                                    </div>
                                )}
                                <div className="voucher-card-buttons">
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSelectedVoucher(voucher);
                                        }}
                                    >
                                        Sterge
                                    </Button>
                                    <Button
                                        variant="dark"
                                        onClick={() => {
                                            handleModal();
                                            setSelectedVoucher(voucher);
                                        }}
                                    >
                                        Editeaza
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Esti sigur ca vrei sa stergi voucherul?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="admin-delete-modal">
                    <div>
                        <span>Voucherul:</span>
                        <ul>
                            {selectedVoucher && (
                                <>
                                    <li>ID: {selectedVoucher.id}</li>
                                    <li>Cod: {selectedVoucher.code}</li>
                                    <li>
                                        Valoare:{" "}
                                        {selectedVoucher.discount_value}
                                    </li>
                                    <li>
                                        Tipul Discountului:{" "}
                                        {selectedVoucher.discount_type ==
                                        "percentage"
                                            ? "Procent"
                                            : "Suma fixa"}
                                    </li>
                                    <li>
                                        Data de expirare:{" "}
                                        {selectedVoucher.valid_until}
                                    </li>
                                    <li>
                                        Activ:{" "}
                                        {selectedVoucher.is_active
                                            ? "Da"
                                            : "Nu"}
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Nu
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Da
                    </Button>
                </Modal.Footer>
            </Modal>
            {isEditModalOpen && (
                <Modal
                    show={isEditModalOpen}
                    onHide={handleModal}
                    centered
                    size="lg"
                    className="admin-modal-edit-product"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editeaza Voucher</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditVoucher voucher={selectedVoucher} />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}
