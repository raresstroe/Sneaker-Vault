import React from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faXTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Footer = () => {
    const handleSubscribe = (event) => {
        event.preventDefault();

        const email = document.getElementById("newsletter-email").value;

        Inertia.post("/subscribe", {
            email: email,
        });
        // console.log(email);
    };
    return (
        <footer className="bg-body-tertiary text-center">
            <Container className="p-4">
                <section className="mb-4">
                    <Button
                        variant="outline"
                        className="btn-floating m-1"
                        href="#!"
                    >
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button
                        variant="outline"
                        className="btn-floating m-1"
                        href="#!"
                    >
                        <FontAwesomeIcon icon={faXTwitter} />
                    </Button>
                    <Button
                        variant="outline"
                        className="btn-floating m-1"
                        href="#!"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </Button>
                </section>
                <section>
                    <Form action="">
                        <Row className="d-flex justify-content-center">
                            <Col>
                                <p className="pt-2">
                                    <strong>Aboneaza-te la newsletter:</strong>
                                </p>
                            </Col>
                            <Col md={5} xs={12}>
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="email"
                                        id="newsletter-email"
                                        placeholder="Adresa de email"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button
                                    variant="outline-dark"
                                    type="button"
                                    className="btn"
                                    onClick={handleSubscribe}
                                >
                                    Aboneaza-te
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </section>
                <section className="mb-4 description">
                    <p>
                        La Skneaker Vault descoperi o selecție vastă de sneakeri
                        originali, de la branduri populare. Te bucuri de
                        garanția autenticității fiecărei perechi, de plăți
                        sigure și o politică de returnare facilă. Mai mult,
                        echipa noastră dedicată îți oferă consultanță
                        personalizată pentru a te ajuta să găsești perechea
                        perfectă.
                    </p>
                </section>
                <section>
                    <Row>
                        <Col
                            lg={3}
                            md={6}
                            className="mb-4 mb-md-0 text-center d-md-block"
                        >
                            <h5 className="text-uppercase  footer-link">
                                Cont
                            </h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/dashboard"
                                    >
                                        <p className="footer-link">
                                            Contul meu
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/register"
                                    >
                                        <p className="footer-link">
                                            Inregistreaza-te
                                        </p>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link className="text-body" href="#!">
                                        <p className="footer-link">
                                            Formular Retur
                                        </p>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/links/shipment"
                                    >
                                        <p className="footer-link">Livrare</p>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col
                            lg={3}
                            md={6}
                            className="mb-4 mb-md-0 text-center d-md-block"
                        >
                            <h5 className="text-uppercase  footer-link">
                                Linkuri utile
                            </h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/links/faq"
                                    >
                                        <p className="footer-link">FAQ</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/categories/men"
                                    >
                                        <p className="footer-link">
                                            Incaltaminte barbati
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/categories/woman"
                                    >
                                        <p className="footer-link">
                                            Incaltaminte Femei
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/categories/kids"
                                    >
                                        <p className="footer-link">
                                            Incaltaminte copii
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3} md={6} className="mb-4 mb-md-0">
                            <h5 className="text-uppercase  footer-link">
                                Legal
                            </h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/links/terms"
                                    >
                                        <p className="footer-link">
                                            Termeni si conditii
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/links/policy"
                                    >
                                        <p className="footer-link">
                                            Politica de confidentialitate
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="/links/return"
                                    >
                                        <p className="footer-link">
                                            Politica de returnare
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3} md={6} className="mb-4 mb-md-0">
                            <h5 className="text-uppercase  footer-link">
                                Contact
                            </h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <p className="text-body footer-link">
                                        Brasov, Romania
                                    </p>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="mailto:stroerares0@gmail.com"
                                    >
                                        <p className="footer-link">
                                            stroerares0@gmail.com
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-body"
                                        href="tel: +40722222222"
                                    >
                                        <p className="footer-link">
                                            +40722222222
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </section>
            </Container>
            {/* <Container
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
                © 2024 Copyright:
                <Link className="text-reset fw-bold" href="#">
                    &nbsp;Stroe
                </Link>
            </Container> */}
        </footer>
    );
};

export default Footer;
