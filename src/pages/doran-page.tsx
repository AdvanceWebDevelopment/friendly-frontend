import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { colors } from "../constants/colors";

export const DoranPage = () => {
    return (
        <div style={{ background: colors.background, zIndex: -999 }}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
