import React from "react";
import AdminHeader from "../../Components/Admin/AdminHeader";
import Content from "../../Components/Admin/Content";

export default function AdminDashboard({
    orders,
    monthly_revenue,
    total_revenue,
    total_orders,
    monthly_orders,
    total_customers,
    monthly_customers,
    most_popular_city,
    most_popular_county,
}) {
    return (
        <div>
            <AdminHeader title="Acasa">
                <Content>
                    <h3>Incasari Lunare</h3>
                    <p className="text-dashboard-admin">
                        {monthly_revenue} RON
                    </p>
                </Content>
                <Content>
                    <h3>Incasari Totale</h3>
                    <p className="text-dashboard-admin">{total_revenue} RON</p>
                </Content>
                <Content>
                    <h3>Cel mai popular oras si Judet</h3>
                    <p className="text-dashboard-admin">
                        Oras: {most_popular_city}
                    </p>
                    <p className="text-dashboard-admin">
                        Judet: {most_popular_county}
                    </p>
                </Content>
                <Content>
                    <h3>Numar comenzi lunare</h3>
                    <p className="text-dashboard-admin">{total_orders}</p>
                </Content>
                <Content>
                    <h3>Numar comenzi totale</h3>
                    <p className="text-dashboard-admin">{monthly_orders}</p>
                </Content>
                <Content>
                    <h3>Numar clienti lunari</h3>
                    <p className="text-dashboard-admin">{monthly_customers}</p>
                </Content>
                <Content>
                    <h3>Numar clienti</h3>
                    <p className="text-dashboard-admin">{total_customers}</p>
                </Content>
            </AdminHeader>
        </div>
    );
}
