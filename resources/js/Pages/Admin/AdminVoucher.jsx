import React from "react";
import AdminHeader from "@/Components/Admin/AdminHeader";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import EditVoucher from "@/Components/Admin/EditVoucher";
import VoucherCard from "@/Components/Admin/VoucherCard";

export default function AdminVoucher({ vouchers }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredVouchers = vouchers.filter((voucher) => {
        const searchTermLower = searchTerm.toLowerCase();
        const voucherIdStr = voucher.id.toString();
        const voucherCodeLower = voucher.code.toLowerCase();
    
        return voucherIdStr.includes(searchTermLower) || voucherCodeLower.includes(searchTermLower);
    });
    
    return (
        <AdminHeader title="Voucher">
            <input
                type="text"
                placeholder="Caută voucher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-2"
            />
            <div>
                <Button
                    variant="dark"
                    onClick={handleShow}
                    className="checkout-button"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Adauga Voucher
                </Button>
                <VoucherCard vouchers={filteredVouchers}></VoucherCard>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
                className="voucher-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adauga Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-scrollable-content">
                        <EditVoucher />
                    </div>
                </Modal.Body>
            </Modal>
        </AdminHeader>
    );
}
