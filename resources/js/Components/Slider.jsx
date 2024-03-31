import React from "react";
import { Carousel } from "react-responsive-carousel";

const Slider = ({ banners }) => {
    const bannersArray = Object.values(banners);
    return bannersArray.length === 0 ? (
        ""
    ) : bannersArray.length === 1 ? (
        <div>
            <img
                src={"/storage/" + bannersArray[0].image_path}
                alt={bannersArray[0].alt}
            />
        </div>
    ) : (
        <Carousel
            showThumbs={false}
            showStatus={false}
            transitionTime={1000}
            infiniteLoop={true}
            autoPlay={true}
        >
            {bannersArray.map((banner) => (
                <div key={banner.id}>
                    <img
                        src={"/storage/" + banner.image_path}
                        alt={banner.alt}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default Slider;
