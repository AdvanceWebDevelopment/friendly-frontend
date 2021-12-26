import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { colors } from "../constants/colors";
import auctionBanner from "../assets/images/auction-banner.svg";
import { Image, Spinner } from "react-bootstrap";

export const DoranPage = () => {
    return (
        <div style={{ background: colors.background, zIndex: -999 }}>
            <Header />
            <Image
                src={auctionBanner}
                style={{ width: "100%", zIndex: -1, borderBottomRightRadius: "25%", borderBottomLeftRadius: "25%" }}
            />
            <Outlet />
            <Footer />
        </div>
    );
};
