import React from "react";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function ThankYou({ orderItems, total }) {
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
            <div className="thank-you-container">
                <h1>Multumim pentru comanda!</h1>
                <p>Comanda ta a fost trimisa cu succes.</p>
                <p>Vei primi un email in momentele ce urmeaza.</p>
                <img src="images/check.png" alt="check" />
                <p className="not-recieved">
                    Daca nu ai primit un email, ne poti contacta la:{" "}
                    <a href="mailto:stroerares0@gmail.com">
                        stroerares0@gmail.com
                    </a>
                </p>
            </div>

            <Footer></Footer>
        </div>
    );
}
