import OrderComponent from "@/Components/OrderComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, orders, orderItems }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("ro-RO", options);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Comenzile mele
                </h2>
            }
        >
            <Head title="Comenzi" />

            <div className={orderItems.length > 0 ? "py-6" : "py-12"}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {orders.length === 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-4">
                            <div className="p-6 text-gray-900">
                                Deocamdata nu aveti nicio comanda.
                            </div>
                        </div>
                    )}
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-4"
                        >
                            <div className="p-6 text-gray-900">
                                {orderItems[order.id].map((item) => (
                                    <OrderComponent
                                        key={item.id}
                                        name={item.product.name}
                                        image={
                                            "/storage/" + item.product.img_src
                                        }
                                        size={item.size}
                                        quantity={item.quantity}
                                        price={item.product.price}
                                    />
                                ))}
                            </div>

                            <div className="p-6 text-gray-900 flex justify-between">
                                <div className="orders-item-container">
                                    <h4 className="text-2xl font-semibold">
                                        Data: {formatDate(order.created_at)}
                                    </h4>
                                    <h4 className="text-2xl font-semibold">
                                        Numar de referinta: #{order.id}
                                    </h4>
                                </div>
                                <div className="orders-item-container">
                                    <h4 className="text-2xl font-semibold">
                                        Total:{" "}
                                        {order.total_discounted_price
                                            ? order.total_discounted_price
                                            : order.total_price}{" "}
                                        RON
                                    </h4>
                                    <h4 className="text-2xl font-semibold">
                                        Status:{" "}
                                        {order.order_status == "pending"
                                            ? "In asteptare"
                                            : order.order_status == "arrived"
                                            ? "Livrat"
                                            : "In curs de livrare"}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
