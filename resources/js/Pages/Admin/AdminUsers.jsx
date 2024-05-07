import React, { useState } from "react";
import AdminHeader from "@/Components/Admin/AdminHeader";
import Content from "@/Components/Admin/Content";
import { Inertia } from "@inertiajs/inertia";

export default function AdminUsers({ users }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (userId) => {
        if (confirm("Sunteți sigur că doriți să ștergeți utilizatorul?")) {
            Inertia.delete(`/admin/users/${userId}`);
        }
    };

    const handleAdminChange = (userId) => {
        Inertia.put("/admin/users/toggle-admin", { userId });
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminHeader title="Utilizatori">
            <input
                type="text"
                placeholder="Caută utilizator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-2"
            />
            {filteredUsers.map((user) => (
                <Content key={user.id}>
                    <div>
                        <p>ID: {user.id}</p>
                        <p>Nume: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>
                            Admin:{" "}
                            <input
                                type="checkbox"
                                checked={user.admin === 1}
                                onChange={() => handleAdminChange(user.id)}
                            />
                        </p>
                        <p>Verificat: {user.email_verified_at ? "Da" : "Nu"}</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(user.id)}
                        >
                            Șterge
                        </button>
                    </div>
                </Content>
            ))}
        </AdminHeader>
    );
}
