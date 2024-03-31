import OrderComponent from "@/Components/OrderComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, delivered_products }) {
    // if (delivered_products == null) {
    //     delivered_products.forEach((product) => {
    //         console.log(product);
    //     });
    // } else {
    //     console.log("No products");
    // }
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

            <div
                className={
                    delivered_products && delivered_products.length > 0
                        ? "py-6"
                        : "py-12"
                }
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {delivered_products && delivered_products.length > 0
                                ? delivered_products.map((product) => (
                                      <OrderComponent
                                          key={product.id}
                                          product={product}
                                      />
                                  ))
                                : "Deocamdata nu aveti nicio comanda."}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
