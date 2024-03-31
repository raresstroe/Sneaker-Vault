import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const EditBanner = (banner) => {
    banner = banner.banner;
    const { data, setData, post, progress } = useForm({
        image_path: banner ? banner.image_path : "",
        alt: banner ? banner.alt : "",
        href: banner ? banner.href : "",
        is_active: banner ? banner.is_active : false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (banner) {
            post(`/admin/banners/${banner.id}`, data);
            // console.log("update" + data);
        } else {
            post("/admin/banners", data);
            // console.log("add" + data);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="banner-image-container">
                <input
                    type="file"
                    onChange={(e) => {
                        setData("image_path", e.target.files[0]);
                    }}
                    placeholder="Image Source"
                    className="form-control form-banner"
                />
                <span className="text-danger">*</span>
            </div>
            <div className="banner-edit-wrapper">
                <label>Alt Text:</label>
                <input
                    type="text"
                    value={data.alt}
                    onChange={(e) => setData("alt", e.target.value)}
                    placeholder="Alt Text"
                    className="form-control form-banner"
                />
            </div>
            <div className="banner-edit-wrapper">
                <label>Link:</label>
                <input
                    type="text"
                    value={data.href}
                    onChange={(e) => setData("href", e.target.value)}
                    placeholder="Link"
                    className="form-control form-banner"
                />
            </div>

            <div className="banner-checkbox-container">
                <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData("is_active", e.target.checked)}
                />
                <label>Activ</label>
            </div>

            <hr />
            <div className="save-admin-product">
                <button type="submit" className="btn btn-dark">
                    Salveaza
                </button>
            </div>
        </form>
    );
};

export default EditBanner;
