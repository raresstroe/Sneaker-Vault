import React, { useState } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    Button,
    Offcanvas,
    Row,
    Col,
    Form,
    FormControl,
    Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import ResponsiveNavLink from "@/Components/Breeze/ResponsiveNavLink";
import ToggleContent from "./ToggleContent";
import OrderDropdown from "./OrderDropdown";

const categories = [
    {
        index: 1,
        title: "Categorii",
        content:
            '<a href="/categories/men">Barbati</a><br/><a href="/categories/woman">Femei</a><br/><a href="/categories/kids">Copii</a>',
        maxHeight: "70px",
    },
    {
        index: 2,
        title: "Sport",
        content:
            '<a href="/sports?type=football">Fotbal</a><br/><a href="/sports?type=basket">Basket</a><br/><a href="/sports?type=running">Alergare</a>',
        maxHeight: "70px",
    },
];

const Header = (props) => {
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            const encodedSearchTerm = encodeURIComponent(
                searchTerm.trim()
            ).replace(/%20/g, "+");
            window.location.href = `/search?search=${encodedSearchTerm}`;
        }
    };

    const orderItems = props.orderItems;

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid className="top-container">
                    <Nav className="mr-auto d-none d-lg-flex">
                        <Nav.Link disabled className="top-nav-text">
                            <FontAwesomeIcon icon={faTruck} />
                            &nbsp; LIVRARE GRATUITĂ PESTE 450 RON
                        </Nav.Link>
                        <Nav.Link disabled className="top-nav-text">
                            <FontAwesomeIcon icon={faClock} />
                            &nbsp; LIVRARE ÎN 24H - 48H
                        </Nav.Link>
                        <Nav.Link disabled className="top-nav-text">
                            <FontAwesomeIcon icon={faRightLeft} /> &nbsp;RETUR
                            ÎN 14 ZILE
                        </Nav.Link>
                    </Nav>
                    <a href="/">
                        <Image
                            className="d-lg-none store-logo-png"
                            src="../images/logo-png.png"
                            alt="Store Logo"
                        />
                    </a>
                    <Nav className="d-flex align-items-center flex-row">
                        {props.loggedIn ? (
                            <>
                                <Nav.Item>
                                    <div className="profile-pic-container">
                                        <Image
                                            className="profile-pic"
                                            src={props.profile_photo}
                                        />
                                    </div>
                                </Nav.Item>
                                <NavDropdown
                                    title={props.name}
                                    style={{ paddingRight: "4% !important" }}
                                >
                                    {props.admin && (
                                        <ResponsiveNavLink
                                            href="/admin"
                                            as="button"
                                        >
                                            Panou Admin
                                        </ResponsiveNavLink>
                                    )}
                                    <ResponsiveNavLink
                                        href="/profile"
                                        as="button"
                                    >
                                        Contul meu
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href="/orders"
                                        as="button"
                                    >
                                        Comenzile mele
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href="/favorites"
                                        as="button"
                                    >
                                        Favorite
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </NavDropdown>
                            </>
                        ) : (
                            <div className="container-register">
                                <Nav.Link className="log-in" href="/login">
                                    Log-in
                                </Nav.Link>
                                <Nav.Link href="/register" className="register">
                                    Inregisteaza-te
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <section className="header-main border-bottom bg-white">
                <Container fluid>
                    <Row className="p-2 pt-3 pb-3 d-flex align-items-center flex-wrap">
                        <Col
                            xs={4}
                            md={2}
                            className="d-flex justify-content-start categories-padding"
                        >
                            <Navbar expand="lg">
                                <Container fluid className="categories-padding">
                                    <Button variant="" onClick={handleShow}>
                                        <FontAwesomeIcon
                                            className="categoriesButton"
                                            icon={faBars}
                                        />
                                    </Button>
                                </Container>
                            </Navbar>
                        </Col>
                        <Col xs={4} md={8}>
                            <a href="/">
                                <Image
                                    className="d-none d-lg-flex store-logo"
                                    src="../images/logo.png"
                                    style={{ margin: "0 auto" }}
                                />
                            </a>
                        </Col>
                        <Col
                            xs={4}
                            md={2}
                            className="d-flex justify-content-end"
                        >
                            <NavDropdown
                                title={
                                    <div
                                        className="d-flex d-md-flex flex-row align-items-center"
                                        onClick={() =>
                                            (window.location.href = "/cart")
                                        }
                                    >
                                        <span className="shop-bag">
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                            />
                                        </span>
                                        <div className="d-flex flex-column ms-2 text-nowrap">
                                            <span className="qty">
                                                {orderItems
                                                    ? orderItems.length
                                                    : "0"}{" "}
                                                {orderItems
                                                    ? orderItems.length === 1
                                                        ? " Produs"
                                                        : " Produse"
                                                    : " Produse"}
                                            </span>
                                            <span className="fw-bold">
                                                {props.total
                                                    ? props.total
                                                    : "0"}{" "}
                                                RON
                                            </span>
                                        </div>
                                    </div>
                                }
                                id="nav-dropdown"
                                className="no-arrow"
                                show={isOpen}
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                {orderItems && orderItems.length === 0 && (
                                    <NavDropdown.Item eventKey="1">
                                        Nu ai produse in cos.
                                    </NavDropdown.Item>
                                )}

                                {orderItems &&
                                    orderItems
                                        .slice(0, 3)
                                        .map((item, index) => (
                                            <NavDropdown.Item
                                                key={index}
                                                eventKey={index}
                                                href={item.product.href}
                                            >
                                                <OrderDropdown
                                                    imgSrc={
                                                        "/storage/" +
                                                        item.product.img_src
                                                    }
                                                    price={item.product.price}
                                                    quantity={item.quantity}
                                                    name={item.product.title}
                                                />
                                            </NavDropdown.Item>
                                        ))}

                                {orderItems && (
                                    <div>
                                        {orderItems.length > 3 && (
                                            <NavDropdown.Item disabled>
                                                <span className="more-dropdown">
                                                    plus altele...
                                                </span>
                                            </NavDropdown.Item>
                                        )}
                                        <NavDropdown.Item className="disabled">
                                            <hr />
                                            <div>
                                                <h6 className="total-dropdown">
                                                    Total: {props.total} RON
                                                </h6>
                                            </div>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/cart">
                                            <p className="btn btn-dark">
                                                Mergi la cosul de cumparaturi
                                            </p>
                                        </NavDropdown.Item>
                                    </div>
                                )}
                            </NavDropdown>
                        </Col>
                    </Row>
                </Container>
            </section>

            <>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <p className="heading-header">Sneaker Vault</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Form
                            className="d-flex form-inputs"
                            style={{ width: "80%" }}
                            onSubmit={handleSearch}
                        >
                            <FormControl
                                type="text"
                                placeholder="Cauta orice produs..."
                                className="mr-sm-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button type="submit" variant="">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </Form>
                    </div>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            <ToggleContent
                                title={categories[0].title}
                                content={categories[0].content}
                                maxHeight={categories[0].maxHeight}
                            />
                            <ToggleContent
                                title={categories[1].title}
                                content={categories[1].content}
                                maxHeight={categories[1].maxHeight}
                                otherClass={"toggle-content-second"}
                            />
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        </header>
    );
};

export default Header;
