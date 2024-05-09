import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FAQItem from "../Components/ToggleContent";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/Components/includes/useAuth";

const shipment = [
    {
        index: 1,
        question: "+ Care sunt costurile de livrare?",
        answear:
            "Livrarea este gratuită pentru comenzile de peste 450 lei. Pentru comenzile sub 450 lei, costul livrării este de 19,90 lei.",
        maxHeight: "30px",
        maxHeightMobile: "70px",
        maxHeightTablet: "50px",
    },
    {
        index: 2,
        question: "+ Cât durează livrarea?",
        answear:
            "Livrarea durează, în mod normal, între 1 și 2 zile lucrătoare.",
        maxHeight: "25px",
        maxHeightMobile: "50px",
        maxHeightTablet: "30px",
    },
    {
        index: 3,
        question: "+ Pot să returnez produsele?",
        answear:
            "Da, puteți returna produsele în termen de 14 zile de la primirea comenzii. Produsele trebuie să fie returnate în starea lor originală, cu etichetele intacte.",
        maxHeight: "50px",
        maxHeightMobile: "90px",
        maxHeightTablet: "70px",
    },
    {
        index: 4,
        question: "+ Cum pot să returnez produsele?",
        answear:
            "Pentru a returna produsele, trebuie să ne contactați la adresa de e-mail.",
        maxHeight: "30px",
        maxHeightMobile: "50px",
        maxHeightTablet: "40px",
    },
];

const pay = [
    {
        index: 1,
        question: "+ Cum pot plasa o comandă?",
        answear: "Puteți plasa o comandă online pe website-ul nostru.",
        maxHeight: "30px",
        maxHeightMobile: "25px",
        maxHeightTablet: "30px",
    },
    {
        index: 2,
        question: "+ Ce metode de plată acceptați?",
        answear:
            "Acceptăm plata cu cardul de credit, debit, PayPal și ramburs la primirea coletului.",
        maxHeight: "30px",
        maxHeightMobile: "50px",
        maxHeightTablet: "40px",
    },
    {
        index: 3,
        question: "+ Este sigur să cumpăr online de la Sneaker Vault?",
        answear:
            "Da, website-ul nostru este 100% sigur. Utilizăm o tehnologie de criptare SSL pentru a proteja informațiile dvs. personale.",
        maxHeight: "30px",
        maxHeightMobile: "70px",
        maxHeightTablet: "50px",
    },
];
const product = [
    {
        index: 1,
        question: "+ Cum pot afla mărimea potrivită pentru mine?",
        answear:
            "Pe pagina fiecărui produs, veți găsi un ghid de mărimi care vă va ajuta să alegeți mărimea potrivită. De asemenea, ne puteți contacta dacă aveți nevoie de ajutor.",
        maxHeight: "50px",
        maxHeightMobile: "100px",
        maxHeightTablet: "70px",
    },
    {
        index: 2,
        question: "+ Vin produsele în cutie originală?",
        answear:
            "Da, toate produsele noastre vin în cutia originală a producătorului.",
        maxHeight: "30px",
        maxHeightMobile: "50px",
        maxHeightTablet: "40px",
    },
    {
        index: 3,
        question: "+ Au produsele dvs. garanție?",
        answear:
            "Da, toate produsele noastre beneficiază de o garanție de 2 ani împotriva defectelor de fabricație.",
        maxHeight: "30px",
        maxHeightMobile: "50px",
        maxHeightTablet: "40px",
    },
];
const other = [
    {
        index: 1,
        question: "+ Oferiți reduceri sau coduri promoționale?",
        answear:
            "Da, oferim ocazional reduceri și coduri promoționale. Vă puteți abona la newsletter-ul nostru pentru a fi la curent cu cele mai recente promoții.",
        maxHeight: "50px",
        maxHeightMobile: "90px",
        maxHeightTablet: "70px",
    },
    {
        index: 2,
        question: "+ Cum vă pot contacta?",
        answear:
            "Ne puteți contacta prin email la stroerares0@gmail.com sau telefonic la numărul 0722222222.",
        maxHeight: "30px",
        maxHeightMobile: "70px",
        maxHeightTablet: "50px",
    },
    {
        index: 3,
        question: "+ Aveți magazine fizice?",
        answear:
            "Nu, momentan nu avem magazine fizice. Ne puteți găsi doar online.",
        maxHeight: "30px",
        maxHeightMobile: "50px",
        maxHeightTablet: "40px",
    },
    {
        index: 4,
        question: "+ Nu am gasit intrebarea",
        answear:
            "Dacă nu ați găsit răspunsul la întrebarea dvs., nu ezitați să ne contactați!",
        maxHeight: "30px",
        maxHeightMobile: "50px",
        maxHeightTablet: "40px",
    },
];
export default function FAQ({ orderItems, total }) {
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [isTablet, setIsTablet] = useState(
        window.innerWidth > 600 && window.innerWidth <= 1000
    );
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
            setIsTablet(window.innerWidth > 600 && window.innerWidth <= 1200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className="container-faq">
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
                orderItems={orderItems}
                total={total}
            />
            <h1 className="categories-title">FAQ</h1>
            <h3 className="faq-subtitle">Livrări și returnarea produselor</h3>
            <ul>
                {shipment.map((faq, index) => (
                    <FAQItem
                        key={index}
                        title={faq.question}
                        content={faq.answear}
                        maxHeight={
                            isMobile
                                ? faq.maxHeightMobile
                                : isTablet
                                ? faq.maxHeightTablet
                                : faq.maxHeight
                        }
                        otherClass={index != 0 ? "toggle-content-second" : ""}
                    ></FAQItem>
                ))}
            </ul>
            <h3 className="faq-subtitle">Comanda și plata</h3>
            <ul>
                {pay.map((faq, index) => (
                    <FAQItem
                        key={index}
                        title={faq.question}
                        content={faq.answear}
                        maxHeight={
                            isMobile
                                ? faq.maxHeightMobile
                                : isTablet
                                ? faq.maxHeightTablet
                                : faq.maxHeight
                        }
                        otherClass={index != 0 ? "toggle-content-second" : ""}
                    ></FAQItem>
                ))}
            </ul>
            <h3 className="faq-subtitle">Produse și mărimi</h3>
            <ul>
                {product.map((faq, index) => (
                    <FAQItem
                        key={index}
                        title={faq.question}
                        content={faq.answear}
                        maxHeight={
                            isMobile
                                ? faq.maxHeightMobile
                                : isTablet
                                ? faq.maxHeightTablet
                                : faq.maxHeight
                        }
                        otherClass={index != 0 ? "toggle-content-second" : ""}
                    ></FAQItem>
                ))}
            </ul>
            <h3 className="faq-subtitle">Altele</h3>
            <ul style={{ marginBottom: "5%" }}>
                {other.map((faq, index) => (
                    <FAQItem
                        key={index}
                        title={faq.question}
                        content={faq.answear}
                        maxHeight={
                            isMobile
                                ? faq.maxHeightMobile
                                : isTablet
                                ? faq.maxHeightTablet
                                : faq.maxHeight
                        }
                        otherClass={index != 0 ? "toggle-content-second" : ""}
                    ></FAQItem>
                ))}
            </ul>
            <Footer></Footer>
        </div>
    );
}
