import AdminHeader from "@/Components/Admin/AdminHeader";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EditProduct from "@/Components/Admin/EditProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminProductCard from "@/Components/Admin/AdminProductCard";
import { Inertia } from "@inertiajs/inertia";

export default function AdminProducts({
    products,
    filter_text,
    brands,
    categories,
}) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <AdminHeader title="Produse" isProductsPage="true">
            <div className="head-admin-wrapper">
                <button
                    className="btn btn-dark checkout-button"
                    onClick={handleOpenAddModal}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Adauga Produs
                </button>
                <select
                    name="select-admin-product"
                    id="select-admin-product"
                    defaultValue=""
                    onChange={(e) => {
                        const selectedOption = e.target.value;
                        Inertia.visit(
                            `/admin/products?filter=${selectedOption}`
                        );
                    }}
                >
                    <option value="" disabled>
                        Alege filtru
                    </option>
                    <option value="all">Toate produsele</option>
                    <option value="mystery">Mystery Vaults</option>
                    <option value="active">Produse pe stoc</option>
                    <option value="not-active">
                        Produse care nu sunt pe stoc
                    </option>
                    <option value="sale">Produse la reducere</option>
                    <option value="bestseller">Produse bestseller</option>
                </select>
            </div>
            <h3 className="admin-products-filter-title ">{filter_text}</h3>
            <Modal
                show={isAddModalOpen}
                onHide={handleCloseAddModal}
                centered
                size="lg"
                className="admin-modal-edit-product"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adauga Produs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProduct brands={brands} categories={categories} />
                </Modal.Body>
            </Modal>
            <div className="admin-products-wrapper">
                {products.map((product, index) => (
                    <AdminProductCard
                        key={index}
                        title={product.title}
                        id={product.id}
                        img={product.img_src}
                        category={product.category}
                        is_bestseller={
                            product.is_bestseller === 0 ? "Nu" : "Da"
                        }
                        is_sale={product.is_sale === 0 ? "Nu" : "Da"}
                        is_active={product.is_active === 0 ? "Nu" : "Da"}
                        products={products}
                        brands={brands}
                        categories={categories}
                    />
                ))}
            </div>
        </AdminHeader>
    );
}
