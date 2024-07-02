import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import CardCategories from "../Components/CardCategories";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { Offcanvas } from "react-bootstrap";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "react-bootstrap/Pagination";

const Categories = ({
    title,
    category,
    array,
    brands,
    orderItems,
    total,
    pagination,
}) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    const arrayAsArray = Object.values(array);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filters = queryParams.get("filter") || "";
        setSelectedFilters(filters.split(","));
        setSelectedSort(queryParams.get("sort") || "");
        setSelectedType(queryParams.get("type") || "");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = selectedFilters.join(",");
        const query = selectedSort
            ? `?filter=${filters}&sort=${selectedSort}&type=${selectedType}`
            : `?filter=${filters}&type=${selectedType}`;

        Inertia.visit(`/categories/${category}${query}`, {
            only: ["array"],
            replace: true,
            preserveState: true,
        });
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        if (selectedFilters.includes(value)) {
            setSelectedFilters(
                selectedFilters.filter((filter) => filter !== value)
            );
        } else {
            setSelectedFilters([...selectedFilters, value]);
        }
    };

    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedSort(selectedOption);
        const filters = selectedFilters.join(",");
        const query = `?filter=${filters}&sort=${selectedOption}&type=${selectedType}`;

        Inertia.visit(`/categories/${category}${query}`);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePageChange = (page) => {
        const filters = selectedFilters.join(",");
        const query = `?filter=${filters}&sort=${selectedSort}&type=${selectedType}&page=${page}`;

        Inertia.visit(`/categories/${category}${query}`);
    };

    const renderPagination = () => {
        const { current_page, last_page } = pagination;

        let items = [];
        for (let number = 1; number <= last_page; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === current_page}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        return <Pagination>{items}</Pagination>;
    };

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
            <div className="container-filters">
                <div className="container-sort-by">
                    <p className="sort-by">Sorteaza dupa</p>
                    <select
                        name="sort-by"
                        id="sort-by-select"
                        value={selectedSort}
                        onChange={handleSortChange}
                    >
                        <option value="" disabled>
                            Alege Filtru
                        </option>
                        <option value="all">Toate produsele</option>
                        <option value="new">Noutati</option>
                        <option value="desc">Pret descrescator</option>
                        <option value="asc">Pret crescator</option>
                    </select>
                </div>
                <p className="filters-text" onClick={handleShow}>
                    Filtre &nbsp; <FontAwesomeIcon icon={faSliders} />
                </p>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filtre</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="filter-submit-button">
                            <button type="submit" className="btn btn-dark">
                                Aplica Filtre
                            </button>
                        </div>
                        <h4 className="filter-title">Marime</h4>
                        <div className="checkbox-filter-wrapper">
                            {[
                                "30",
                                "31",
                                "32",
                                "33",
                                "40",
                                "41",
                                "42",
                                "43",
                                "44",
                                "45",
                                "46",
                                "47",
                                "48",
                                "49",
                            ].map((size) => (
                                <div key={size}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={size}
                                            onChange={handleFilterChange}
                                            checked={selectedFilters.includes(
                                                size
                                            )}
                                        />
                                        &nbsp; {size}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h4 className="filter-title">Branduri</h4>
                        <div className="checkbox-filter-wrapper">
                            {brands.map((brand, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={brand.value}
                                            onChange={handleFilterChange}
                                            checked={selectedFilters.includes(
                                                brand.value
                                            )}
                                        />
                                        &nbsp; {brand.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h4 className="filter-title">Altele</h4>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    value="sale"
                                    onChange={handleFilterChange}
                                    checked={selectedFilters.includes("sale")}
                                />
                                &nbsp; Reducere
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    value="bestseller"
                                    onChange={handleFilterChange}
                                    checked={selectedFilters.includes(
                                        "bestseller"
                                    )}
                                />
                                &nbsp; Popular
                            </label>
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="categories-div">
                <div className="categories-container">
                    {arrayAsArray.map((card, index) => (
                        <CardCategories
                            key={index}
                            className="card"
                            imgSrc={`/storage/${card.imgSrc}`}
                            title={card.title}
                            label={card.label}
                            price={card.price}
                            href={card.href}
                        />
                    ))}
                </div>
            </div>
            <div className="pagination-container">{renderPagination()}</div>
            <Footer />
        </div>
    );
};

export default Categories;
