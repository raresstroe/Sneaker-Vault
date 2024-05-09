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

export default function Home({
    banners,
    mystery,
    brands,
    bestseller,
    sales,
    orderItems,
    total,
}) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    // console.log(bestseller);
    // console.log(orderItems);
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
                        href={card.href}
                        category={card.category}
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
            <h1 className="sports">Sporturi</h1>
            <div className="d-flex flex-wrap justify-content-center categories-div">
                <Link href="/sports?type=football" className="category-link">
                    <img src="../images/football.png" className="sport-img" />
                    <span className="button-categories">Fotbal</span>
                </Link>
                <Link href="/sports?type=running" className="category-link">
                    <img src="../images/running.jpg" className="sport-img" />
                    <span className="button-categories">Alergare</span>
                </Link>
                <Link href="/sports?type=basket" className="category-link">
                    <img src="../images/basketball.png" className="sport-img" />
                    <span className="button-categories">Basket</span>
                </Link>
            </div>
            <h1 className="sales">Reduceri</h1>
            <ProductSlider>
                {sales.map((card, index) => (
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
