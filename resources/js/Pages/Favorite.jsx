import React from "react";
import { usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import FavoriteComponent from "@/Components/FavoriteComponent";
import Footer from "@/Components/Footer";
import ProductSlider from "@/Components/ProductSlider";
import Card from "@/Components/Card";
import { useAuth } from "@/Components/includes/useAuth";
const cardsData = [
    {
        index: 1,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Nou",
        price: "Pret: 300 RON",
    },
    {
        index: 2,
        imgSrc: "https://static.ftshp.digital/img/p/1/0/7/8/7/8/0/1078780.jpg",
        title: "Nike Air Force 1",
        label: "Reducere",
        price: "Pret: 600 RON",
    },
    {
        index: 3,
        imgSrc: "https://static.ftshp.digital/img/p/7/8/1/6/3/3/781633.jpg",
        title: "NIKE AIR PRESTO MID UTILITY",
        label: "Nou",
        price: "Pret: 800 RON",
    },
];

export default function Favorite() {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
            />
            <h3 className="favorite-title">Favorite</h3>
            <FavoriteComponent
                name="Adidas Superstar"
                price="300"
                size="42"
                image="../images/shoe1.png"
                avalibility="In stoc"
            ></FavoriteComponent>
            <FavoriteComponent
                name="Adidas Superstar"
                price="300"
                size="42"
                image="../images/shoe1.png"
                avalibility="In stoc"
            ></FavoriteComponent>
            <FavoriteComponent
                name="Adidas Superstar"
                price="300"
                size="42"
                image="../images/shoe1.png"
                avalibility="In stoc"
            ></FavoriteComponent>
            <h3 className="cart-title-recomandation">Produse Recomandate</h3>
            <ProductSlider>
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        className="card"
                        imgSrc={card.imgSrc}
                        title={card.title}
                        label={card.label}
                        price={card.price}
                    />
                ))}
            </ProductSlider>
            <Footer></Footer>
        </div>
    );
}
