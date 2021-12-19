import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { colors } from "../constants/colors";

import auctionBanner from "../assets/images/auction-banner.svg";
import { Image } from "react-bootstrap";
import { CategoryCarousel } from "../components/doran-carousel/category-carousel";
import { ScrollTopButton } from "../components/scroll-top-button/scroll-top-button";

export const DoranPage = () => {
    return (
        <div style={{ background: colors.background }}>
            <Header />
            <Image
                src={auctionBanner}
                style={{ width: "100%", zIndex: -1, borderBottomRightRadius: "25%", borderBottomLeftRadius: "25%" }}
            />
            <CategoryCarousel className="container" style={{ marginTop: "-6rem" }} />
            <ScrollTopButton />
            <Outlet />
            <Footer />
        </div>
    );
};
