import React, { useState } from "react";

export default function GridPictures({ pictures_array }) {
    const [pickedItem, setPickedItem] = useState(0);
    const [pictures, setPictures] = useState(pictures_array);

    const handlePick = (index) => {
        if (index === pictures.length - 1) return;

        const newPictures = [...pictures];
        [newPictures[index], newPictures[newPictures.length - 1]] = [
            newPictures[newPictures.length - 1],
            newPictures[index],
        ];

        setPictures(newPictures);
        setPickedItem(newPictures.length - 1);
    };

    return (
        <div className="pictures-container">
            {pictures.map((pic, index) => (
                <img
                    key={index}
                    src={"/storage/" + pic}
                    alt="product"
                    onClick={() => handlePick(index)}
                    className={`product-picture product-picture${index + 1} ${
                        pickedItem === index ? "picked" : ""
                    }`}
                />
            ))}
        </div>
    );
}
