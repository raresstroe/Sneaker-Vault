import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import EditProduct from "./EditProduct";
import { Inertia } from "@inertiajs/inertia";

export default function AdminProductCard(props) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDelete = () => {
        Inertia.delete(`products/${props.id}`);
        setShowModal(false);
    };
    const productToEdit = props.products.find(
        (product) => product.id === props.id
    );
    
    return (
        <>
            <Card style={{ width: "18rem" }} className="admin-card-container">
                <Card.Img variant="top" src={`/storage/${props.img}`} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>ID: {props.id}</Card.Text>
                    <hr />

                    <Card.Text>
                        Categorie:{" "}
                        {props.category == 1
                            ? "Barbati"
                            : props.category == 2
                            ? "Femei"
                            : props.category == 3
                            ? "Copii"
                            : props.category == 4
                            ? "Mystery Vault"
                            : props.category == 5
                            ? "Fotbal"
                            : props.category == 6
                            ? "Alergare"
                            : "Basket"}
                    </Card.Text>
                    <Card.Text>Bestseller: {props.is_bestseller}</Card.Text>
                    <Card.Text>Reducere: {props.is_sale}</Card.Text>
                    <Card.Text>In stoc: {props.is_active}</Card.Text>
                    <hr />
                    <div className="admin-product-card-buttons">
                        <Button
                            variant="danger"
                            onClick={() => setShowModal(true)}
                        >
                            Sterge
                        </Button>

                        <Button variant="dark" onClick={handleModal}>
                            Editeaza
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            {isEditModalOpen && (
                <Modal
                    show={isEditModalOpen}
                    onHide={handleModal}
                    centered
                    size="lg"
                    className="admin-modal-edit-product"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editeaza Produs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProduct
                            product={productToEdit}
                            brands={props.brands}
                            categories={props.categories}
                        />
                    </Modal.Body>
                </Modal>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Esti sigur ca vrei sa stergi produsul?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="admin-delete-modal">
                    <span>Produsul:</span>
                    <ul>
                        <li>ID: {props.id}</li>
                        <li>Nume: {props.title}</li>
                    </ul>
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
        </>
    );
}
