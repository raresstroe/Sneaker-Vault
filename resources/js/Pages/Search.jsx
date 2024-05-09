import React from "react";
import Header from "../Components/Header";
import CardCategories from "../Components/CardCategories";
import Footer from "../Components/Footer";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";

const Categories = ({ orderItems, total, bestseller, products }) => {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    console.log(products);
    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
                orderItems={orderItems}
                total={total}
            />
            <h1 className="categories-title">Cautare</h1>
            {products.length == 0 ? (
                <h3 className="search-no-product">
                    Nu am putut gasi niciun produs asemanator
                </h3>
            ) : (
                ""
            )}
            <div className="categories-div">
                <div className="categories-container">
                    {products.map((card, index) => (
                        <CardCategories
                            key={index}
                            className="card"
                            imgSrc={`/storage/${card.img_src}`}
                            title={card.title}
                            label={card.label}
                            price={card.price + " RON"}
                            href={card.href}
                            category={card.category}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Categories;
