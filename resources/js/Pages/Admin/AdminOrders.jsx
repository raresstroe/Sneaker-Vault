import React, { useState } from "react";
import AdminHeader from "@/Components/Admin/AdminHeader";
import Content from "@/Components/Admin/Content";
import { Inertia } from "@inertiajs/inertia";

export default function AdminOrders({ orders }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (orderID) => {
        if (confirm("Sunteți sigur că doriți să ștergeți comanda?")) {
            Inertia.delete(`/admin/orders/${orderID}`);
        }
    };

    const handleStatusChange = (event, orderID) => {
        const newStatus = event.target.value;

        Inertia.put(`/admin/orders/status/${orderID}`, {
            order_status: newStatus,
        });
    };

    const filteredOrders = orders.filter((order) => {
        const searchTermLower = searchTerm.toLowerCase();
        const orderIdStr = order.id.toString();

        return orderIdStr.includes(searchTermLower);
    });

    return (
        <AdminHeader title="Comenzi">
            <input
                type="text"
                placeholder="Caută numar de referinta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-2"
            />
            {filteredOrders.map((order) => (
                <Content key={order.id}>
                    <div>
                        <p>Numar referinta: {order.id}</p>
                        <p>ID Utilizator: {order.user_id}</p>
                        <p>
                            Adresa:{" "}
                            {order.shipping_address.split(";").join(", ")}
                        </p>
                        <p>Suma: {order.total_price} RON</p>
                        <p>
                            Modalitate de plata:{" "}
                            {order.payment_method == "cash" ? "Numerar" : ""}
                        </p>
                        <p>
                            {" "}
                            Status:{" "}
                            <select
                                value={order.order_status}
                                onChange={(e) =>
                                    handleStatusChange(e, order.id)
                                }
                            >
                                <option value="pending">In Asteptare</option>
                                <option value="shipped">Livrat</option>
                                <option value="arrived">
                                    Ajuns la destinatie
                                </option>
                            </select>
                        </p>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(order.id)}
                        >
                            Șterge
                        </button>
                    </div>
                </Content>
            ))}
        </AdminHeader>
    );
}
