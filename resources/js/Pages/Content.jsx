import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";

const Content = ({ title, content, orderItems, total }) => {
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
            <h1 className="categories-title">{title}</h1>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="container-content"
            />
            <Footer></Footer>
        </div>
    );
};

export default Content;
