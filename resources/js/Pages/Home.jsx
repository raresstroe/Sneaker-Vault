import React from "react";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import ProductSlider from "../Components/ProductSlider";
import Brands from "../Components/BrandsSlider.jsx";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";

const cardsDataSale = [
    {
        index: 1,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Reducere",
        price: "Pret: 100 RON",
    },
    {
        index: 2,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Reducere",
        price: "Pret: 200 RON",
    },
    {
        index: 3,
        imgSrc: "https://sneakerindustry.ro/112881-product_zoomed/superstar-millencon-w.jpg",
        title: "Adidas Superstar",
        label: "Reducere",
        price: "Pret: 300 RON",
    },
];
const cardsData = [
    {
        index: 1,
        imgSrc: "../images/shoe1.png",
        title: "Adidas Superstar",
        label: "Nou",
        price: "Pret: 300 RON",
    },
    {
        index: 2,
        imgSrc: "../images/shoe1.png",
        title: "Nike Air Force 1",
        label: "Reducere",
        price: "Pret: 600 RON",
    },
    {
        index: 3,
        imgSrc: "../images/shoe1.png",
        title: "NIKE AIR PRESTO MID UTILITY",
        label: "Nou",
        price: "Pret: 800 RON",
    },
];

export default function Home({ banners, mystery, brands }) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    // console.log(brands);
    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
            />
            <Slider banners={banners} />
            <h1 className="mystery">Mystery Vaults</h1>
            <ProductSlider>
                {mystery.map((card, index) => (
                    <Card
                        key={index}
                        className="card"
                        imgSrc={"/storage/" + card.img_src}
                        title={card.title}
                        label={card.label}
                        price={card.price + " RON"}
                    />
                ))}
            </ProductSlider>

            <h1 className="categories-name">Categorii</h1>
            <div className="d-flex flex-wrap justify-content-center categories-div">
                <Link href="/categories/men" className="category-link">
                    <img src="../images/men.png" className="categories" />
                    <span className="button-categories">Barbati</span>
                </Link>
                <Link href="/categories/woman" className="category-link">
                    <img src="../images/woman.png" className="categories" />
                    <span className="button-categories">Femei</span>
                </Link>
                <Link href="/categories/kids" className="category-link">
                    <img src="../images/kids.png" className="categories" />
                    <span className="button-categories">Copii</span>
                </Link>
            </div>
            <h1 className="trending">Tendinte</h1>
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
            <h1 className="sports">Sporturi</h1>
            <div className="d-flex flex-wrap justify-content-center categories-div">
                <Link href="/categories/football" className="category-link">
                    <img src="../images/football.png" className="sport-img" />
                    <span className="button-categories">Fotbal</span>
                </Link>
                <Link href="/categories/running" className="category-link">
                    <img src="../images/running.jpg" className="sport-img" />
                    <span className="button-categories">Alergare</span>
                </Link>
                <Link href="/categories/basketball" className="category-link">
                    <img src="../images/basketball.png" className="sport-img" />
                    <span className="button-categories">Basket</span>
                </Link>
            </div>
            <h1 className="sales">Cele mai vandute produse</h1>
            <ProductSlider>
                {cardsDataSale.map((card, index) => (
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
            <h1 className="brands-title">Brand-uri Populare</h1>
            <Brands>
                {brands.map((card, index) => (
                    <Link
                        href={card.href}
                        key={index}
                        className="logo-container"
                        target="_blank"
                    >
                        <img src={card.picture} className="brands" />
                    </Link>
                ))}
            </Brands>
            <Footer></Footer>
        </div>
    );
}
