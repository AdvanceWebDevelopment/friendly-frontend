import React from "react";
import { Image } from "react-bootstrap";
import { Outlet, useLocation } from "react-router";
import auctionBanner from "../assets/images/auction-banner.svg";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { apiRoute } from "../constants";
import { colors } from "../constants/colors";

export const DoranPage = () => {
    const location = useLocation();

    return (
        <div style={{ background: colors.background, zIndex: -999 }}>
            <Header />
            <Image
                src={auctionBanner}
                style={{ width: "100%", zIndex: -1, borderBottomRightRadius: "25%", borderBottomLeftRadius: "25%" }}
                hidden={
                    location.pathname.includes(apiRoute.LOGIN) ||
                    location.pathname.includes(apiRoute.REGISTER) ||
                    location.pathname.includes(apiRoute.FORGOT) ||
                    location.pathname.includes(apiRoute.CHANGE)
                }
            />
            <Outlet />
            <Footer />
        </div>
    );
};
