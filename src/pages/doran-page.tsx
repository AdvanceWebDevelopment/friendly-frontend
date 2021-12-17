import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { colors } from "../constants/colors";

export const DoranPage = () => {
    return (
        <div style={{ background: colors.background }}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
