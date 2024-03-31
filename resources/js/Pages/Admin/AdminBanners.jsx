import React from "react";
import AdminHeader from "@/Components/Admin/AdminHeader";
import { Modal } from "react-bootstrap";
import EditBanner from "@/Components/Admin/EditBanner";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";
import BannerCard from "@/Components/Admin/BannerCard";

export default function AdminBanners({ filter_text, banners }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(banners);
    return (
        <AdminHeader title="Slider">
            <div className="banner-buttin-filter-wrapper">
                <Button
                    variant="dark"
                    onClick={handleShow}
                    className="checkout-button"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Adauga Banner
                </Button>
                <select
                    name="select-admin-product"
                    id="select-admin-product"
                    defaultValue=""
                    onChange={(e) => {
                        const selectedOption = e.target.value;
                        Inertia.visit(
                            `/admin/banners?filter=${selectedOption}`
                        );
                    }}
                >
                    <option value="" disabled>
                        Alege filtru
                    </option>
                    <option value="all">Toate banerele</option>
                    <option value="active">Bannere active</option>
                    <option value="not-active">Bannere inactive</option>
                </select>
            </div>

            <h3 className="admin-products-filter-title ">{filter_text}</h3>
            <BannerCard banners={banners}></BannerCard>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Adauga Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditBanner />
                </Modal.Body>
            </Modal>
        </AdminHeader>
    );
}
