import React from "react";
import { usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import FavoriteComponent from "@/Components/FavoriteComponent";
import Footer from "@/Components/Footer";
import ProductSlider from "@/Components/ProductSlider";
import Card from "@/Components/Card";
import { useAuth } from "@/Components/includes/useAuth";

export default function Favorite({ orderItems, total, favorites, bestseller }) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
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
            <h3 className="favorite-title">Favorite</h3>
            {favorites.map((favorite, index) => (
                <FavoriteComponent
                    key={index}
                    id={favorite.id}
                    productId={favorite.product.id}
                    name={favorite.product.name}
                    price={favorite.product.price}
                    size={favorite.size}
                    image={"/storage/" + favorite.product.img_src}
                    avalability={favorite.product.is_active}
                    category={favorite.product.category}
                />
            ))}
            <h3 className="cart-title-recomandation">Produse Recomandate</h3>
            <ProductSlider>
                {bestseller.map((card, index) => (
                    <Card
                        key={index}
                        className="card"
                        imgSrc={"/storage/" + card.img_src}
                        title={card.title}
                        label={card.label}
                        price={card.price + " RON"}
                        href={card.href}
                        category={card.category}
                    />
                ))}
            </ProductSlider>
            <Footer></Footer>
        </div>
    );
}
