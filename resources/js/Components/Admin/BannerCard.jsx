import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import EditBanner from "./EditBanner";

export default function BannerCard(props, banners) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);

    banners = props.banners;

    const handleModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDelete = () => {
        if (selectedBanner) {
            Inertia.delete(`banners/${selectedBanner.id}`);
            setShowModal(false);
        }
    };

    return (
        <>
            <div className="admin-banner-card">
                {banners.map((banner) => {
                    return (
                        <div
                            className="admin-banner-card-inner"
                            key={banner.id}
                        >
                            <img
                                src={"/storage/" + banner.image_path}
                                alt={banner.alt}
                            />
                            <div className="banner-card-buttons">
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setShowModal(true);
                                        setSelectedBanner(banner);
                                    }}
                                >
                                    Sterge
                                </Button>
                                <Button
                                    variant="dark"
                                    onClick={() => {
                                        handleModal();
                                        setSelectedBanner(banner);
                                    }}
                                >
                                    Editeaza
                                </Button>
                            </div>
                            <div className="banner-card-info">
                                <h3>Informatii</h3>

                                <p>
                                    <span>ID: </span>
                                    {banner.id}
                                </p>
                                {banner.alt ? (
                                    <p>
                                        <span>Alt: </span>
                                        {banner.alt}
                                    </p>
                                ) : null}
                                {banner.link ? (
                                    <p>
                                        <span>Link: </span>
                                        {banner.link}
                                    </p>
                                ) : null}
                                <p>
                                    Activ:{" "}
                                    {banner.is_active === 0 ? "Nu" : "Da"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Esti sigur ca vrei sa stergi bannerul?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="admin-delete-modal">
                    <span>Bannerul:</span>
                    <ul>
                        {selectedBanner && (
                            <>
                                <li>ID: {selectedBanner.id}</li>
                                <li>
                                    Activ:
                                    {selectedBanner.is_active === 0
                                        ? "Nu"
                                        : "Da"}
                                </li>
                            </>
                        )}
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
            {isEditModalOpen && (
                <Modal
                    show={isEditModalOpen}
                    onHide={handleModal}
                    centered
                    size="lg"
                    className="admin-modal-edit-product"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editeaza Banner</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditBanner banner={selectedBanner} />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}
