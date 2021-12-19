import React from "react";
import Banner from "../components/common/Banner";
import { DoranCarousel } from "../components/doran-carousel/doran-carousel";
import ProductCard from "../components/product/ProductCard";

export const HomePage = () => {
    return (
        <div className="container">
            <Banner />
            <DoranCarousel>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </DoranCarousel>
        </div>
    );
};
