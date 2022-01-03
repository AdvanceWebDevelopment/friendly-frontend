import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { colors } from "../constants/colors";
import auctionBanner from "../assets/images/auction-banner.svg";
import { Image, Spinner } from "react-bootstrap";
import { apiRoute } from "../constants";
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
