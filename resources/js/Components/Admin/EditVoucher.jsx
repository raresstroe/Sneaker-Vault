import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

const EditVoucher = ({ voucher }) => {
    const { data, setData, post } = useForm({
        code: voucher ? voucher.code : "",
        discount_value: voucher ? voucher.discount_value : "",
        discount_type: voucher ? voucher.discount_type : "",
        valid_until: voucher ? new Date(voucher.valid_until) : new Date(),
        is_active: voucher ? voucher.is_active : false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = format(data.valid_until, "yyyy-MM-dd HH:mm:ss");
        const formData = { ...data, valid_until: formattedDate };
        if (voucher) {
            post(`/admin/voucher/${voucher.id}`, formData);
        } else {
            post("/admin/voucher", formData);
            // console.log(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="voucher-edit-wrapper">
                <label>Cod:</label>
                <input
                    type="text"
                    value={data.code}
                    onChange={(e) => setData("code", e.target.value)}
                    placeholder="Cod"
                    className="form-control form-voucher"
                />
            </div>
            <div className="voucher-edit-wrapper">
                <label>Valoare:</label>
                <input
                    type="text"
                    value={data.discount_value}
                    onChange={(e) => setData("discount_value", e.target.value)}
                    placeholder="Valoare"
                    className="form-control form-voucher"
                />
            </div>
            <div className="voucher-edit-wrapper">
                <label>Tipul Discountului:</label>
                <select
                    value={data.discount_type}
                    onChange={(e) => setData("discount_type", e.target.value)}
                    className="form-control form-voucher"
                >
                    <option value="" disabled defaultValue>
                        Alege Tipul
                    </option>
                    <option value="percentage">Procent</option>
                    <option value="fixed">Suma fixa</option>
                </select>
            </div>

            <div className="voucher-edit-wrapper">
                <label>Data de expirare:</label>
                <Calendar
                    onChange={(date) => setData("valid_until", date)}
                    value={data.valid_until}
                />
            </div>
            <div className="voucher-checkbox-container">
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

export default EditVoucher;
