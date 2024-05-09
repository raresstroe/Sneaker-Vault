import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";

export default function Sports({ orderItems, total, type }) {
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
            <div className="d-flex flex-wrap justify-content-center categories-div">
                <Link
                    href={"/categories/men?type=" + type}
                    className="category-link"
                >
                    <img src="../images/men.png" className="categories" />
                    <span className="button-categories">Barbati</span>
                </Link>
                <Link
                    h
                    href={"/categories/woman?type=" + type}
                    className="category-link"
                >
                    <img src="../images/woman.png" className="categories" />
                    <span className="button-categories">Femei</span>
                </Link>
                <Link
                    href={"/categories/kids?type=" + type}
                    className="category-link"
                >
                    <img src="../images/kids.png" className="categories" />
                    <span className="button-categories">Copii</span>
                </Link>
            </div>
            <Footer></Footer>
        </div>
    );
}
