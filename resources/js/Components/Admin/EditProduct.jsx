import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import TinyEditor from "@/Components/includes/TinyEditor";
import Dropzone from "@/Components/includes/Dropzone";

const EditProduct = ({ product, brands, categories }) => {
    const { data, setData, post } = useForm({
        title: product ? product.title : "",
        brand: product ? product.brand : "",
        size: product ? product.size : "",
        label: product ? product.label : "",
        price: product ? product.price : "",
        img_src: product ? product.img_src : "",
        category: product ? product.category : "",
        type: product ? product.type : "",
        short_description: product ? product.short_description : "",
        long_description: product ? product.long_description : "",
        is_sale: product ? product.is_sale === 1 : false,
        is_bestseller: product ? product.is_bestseller === 1 : false,
        is_active: product ? product.is_active === 1 : false,
    });
    const [showShortDescriptionEditor, setShowShortDescriptionEditor] =
        useState(false);
    const [showLongDescriptionEditor, setShowLongDescriptionEditor] =
        useState(false);

    const [images, setImages] = useState([]);
    const handleDelete = (index) => {
        const productId = product ? product.id : null;
        const fileName = images[index].options.file.name;
        fetch(`/remove/${productId}/${fileName}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.head.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const newImages = [...images];
                newImages.splice(index, 1);
                setImages(newImages);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            post(`/admin/products/${product.id}`, data);
        } else {
            post("/admin/products", data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="admin-title-brand-container">
                <div className="input-admin-container">
                    <span>Nume:</span>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        placeholder="Nume Produs"
                        className="form-control"
                    />
                </div>
                <span className="text-danger">*</span>
                <div className="input-admin-container">
                    <span>Brand:</span>
                    <select
                        value={data.brand}
                        onChange={(e) => setData("brand", e.target.value)}
                        className="form-control"
                    >
                        <option value="">Alege Brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <span className="text-danger">*</span>
            </div>
            <div className="admin-size-label-price">
                <div className="input-admin-container">
                    <span>Marimi:</span>
                    <input
                        type="text"
                        value={data.size}
                        onChange={(e) => setData("size", e.target.value)}
                        placeholder="despartite prin virgula"
                        className="form-control"
                    />
                </div>
                <span className="text-danger">*</span>

                <div className="input-admin-container">
                    <span>Eticheta:</span>
                    <input
                        type="text"
                        value={data.label}
                        onChange={(e) => setData("label", e.target.value)}
                        placeholder="Label"
                        className="form-control"
                    />
                </div>
                <span className="text-danger">*</span>

                <div className="input-admin-container">
                    <span>Pret:</span>
                    <input
                        type="text"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        placeholder="Pret"
                        className="form-control"
                    />
                </div>
                <span className="text-danger">*</span>
            </div>
            <div className="admin-img-category">
                <label htmlFor="img-src-admin" className="label-img-src-admin">
                    Imagine
                </label>

                <input
                    type="file"
                    onChange={(e) => {
                        setData("img_src", e.target.files[0]);
                    }}
                    id="img-src-admin"
                    placeholder="Image Source"
                    className="form-control"
                />
                <span className="text-danger">*</span>
            </div>
            <div className="admin-type-category">
                <div className="input-admin-container">
                    <span>Categorie:</span>
                    <select
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className="form-control"
                    >
                        <option value="" disabled>
                            Alege Categorie
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <span className="text-danger">*</span>

                <div className="input-admin-container">
                    <span>Tipul:</span>
                    <input
                        type="text"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        placeholder="Tipul produsului"
                        className="form-control"
                    />
                </div>
                <span className="text-danger">*</span>
            </div>
            <button
                type="button"
                onClick={() =>
                    setShowShortDescriptionEditor(!showShortDescriptionEditor)
                }
                className="btn btn-dark btn-admin-editor"
            >
                Descriere scurta
            </button>
            <div
                className={`editor-container ${
                    showShortDescriptionEditor ? "open" : ""
                }`}
            >
                <TinyEditor
                    value={data.short_description}
                    onChange={(value) => setData("short_description", value)}
                />
            </div>
            <button
                type="button"
                onClick={() =>
                    setShowLongDescriptionEditor(!showLongDescriptionEditor)
                }
                className="btn btn-dark btn-admin-editor"
            >
                Descriere lunga
            </button>
            <div
                className={`editor-container ${
                    showLongDescriptionEditor ? "open" : ""
                }`}
            >
                <TinyEditor
                    value={data.long_description}
                    onChange={(value) => setData("long_description", value)}
                />
            </div>
            {images.length === 3 ? (
                <div className="dropzone-admin-wrapper">
                    <p className="text-danger">
                        Ai atins numarul maxim de imagini, maxim 3 imagini.
                    </p>
                </div>
            ) : (
                <div className="dropzone">
                    <Dropzone
                        maxFiles={3 - images.length}
                        name="image"
                        labelIdle={
                            "Trage maxim " +
                            (3 - images.length) +
                            " fisiere aici sau <span class='filepond--label-action'>Incarca</span>"
                        }
                    />
                </div>
            )}
            <div className="admin-dropzone-image">
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.source.url} alt="product" />
                        <span
                            onClick={() => handleDelete(index)}
                            className="btn btn-danger"
                        >
                            Sterge
                        </span>
                    </div>
                ))}
            </div>
            <div className="admin-brand-checkboxes">
                <div className="admin-checkboxes">
                    <div className="admin-checkbox-container">
                        <input
                            type="checkbox"
                            checked={data.is_bestseller}
                            onChange={(e) =>
                                setData("is_bestseller", e.target.checked)
                            }
                        />
                        <span className="checkbox-text-admin">
                            Este foarte vandut?
                        </span>
                    </div>
                    <div className="admin-checkbox-container">
                        <input
                            type="checkbox"
                            checked={data.is_sale}
                            onChange={(e) =>
                                setData("is_sale", e.target.checked)
                            }
                        />
                        <span className="checkbox-text-admin">
                            Este la reducere?{" "}
                        </span>
                    </div>
                    <div className="admin-checkbox-container">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                        />
                        <span className="checkbox-text-admin">
                            Este in stoc?{" "}
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="save-admin-banner">
                <button type="submit" className="btn btn-dark">
                    Salveaza
                </button>
            </div>
        </form>
    );
};

export default EditProduct;
