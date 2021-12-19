import React from "react";
import Banner from "../components/common/banner/Banner";
import { SectionTitle } from "../components/common/section-title/section-title";
import { DoranCarousel } from "../components/doran-carousel/doran-carousel";
import ProductCard from "../components/product/ProductCard";

export const HomePage = () => {
    return (
        <div className="container">
            <Banner />
            <SectionTitle text="NHIỀU NGƯỜI YÊU THÍCH" className="mx-5 my-3" />
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
