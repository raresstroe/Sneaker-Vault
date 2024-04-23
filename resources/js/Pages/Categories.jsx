import React from "react";
import Header from "../Components/Header";
import CardCategories from "../Components/CardCategories";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/Components/includes/useAuth";
import { Inertia } from "@inertiajs/inertia";

const Categories = ({ title, category, array, brands }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const { auth } = usePage().props;
    const { loggedIn, name, profile, admin } = useAuth(auth);
    console.log(array);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filters = queryParams.get("filter") || "";
        setSelectedFilters(filters.split(","));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = selectedFilters.join(",");
        const query = selectedSort
            ? `?filter=${filters}&sort=${selectedSort}`
            : `?filter=${filters}`;

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
        const query = `?filter=${filters}&sort=${selectedOption}`;

        Inertia.visit(`/categories/${category}${query}`);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Header
                loggedIn={loggedIn}
                name={name}
                profile_photo={profile}
                admin={admin}
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
                    Filters &nbsp; <FontAwesomeIcon icon={faSliders} />
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
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="40"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("40")}
                                    />
                                    &nbsp; 40
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="41"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("41")}
                                    />
                                    &nbsp; 41
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="42"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("42")}
                                    />
                                    &nbsp; 42
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="43"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("43")}
                                    />
                                    &nbsp; 43
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="44"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("44")}
                                    />
                                    &nbsp; 44
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="45"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("45")}
                                    />
                                    &nbsp; 45
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="46"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("46")}
                                    />
                                    &nbsp; 46
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="47"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("47")}
                                    />
                                    &nbsp; 47
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="48"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("48")}
                                    />
                                    &nbsp; 48
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="49"
                                        onChange={handleFilterChange}
                                        checked={selectedFilters.includes("49")}
                                    />
                                    &nbsp; 49
                                </label>
                            </div>
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
                    {array.map((card, index) => (
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

            <Footer />
        </div>
    );
};

export default Categories;
