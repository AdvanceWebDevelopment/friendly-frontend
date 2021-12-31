import { Icon } from "@iconify/react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { selectUserAvatar, selectUserName } from "../../../app/reducers/user-slice";
import { authConstants } from "../../../constants";
import { apiRoute } from "../../../constants/api-routes";
import CategoryButton from "../../category/CategoryButton";
import NotificationButton from "../../notification/NotificationButton";
import ProfileButton from "../../profile/ProfileButton";
import SearchBar from "../../search-bar/SearchBar";
import LoginButton from "../btn-log-in/LoginButton";
import RegisterButton from "../btn-register/RegisterButton";
import classes from "./Header.module.css";

export default function Header() {
    const navigate = useNavigate();
    const refreshTokens = localStorage.getItem(authConstants.REFRESH_TOKEN);
    const userName = useAppSelector(selectUserName);
    const userAvatar = useAppSelector(selectUserAvatar);

    console.log("Header");

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <a href="#" onClick={() => navigate(apiRoute.HOME)}>
                    <div className={classes.logo}></div>
                </a>
                <div className={classes.home} onClick={() => navigate("/")}>
                    Trang chủ
                </div>
                <CategoryButton />
                <SearchBar />
                {refreshTokens && (
                    <ProfileButton name={userName ? userName : ""} avatar={userAvatar ? userAvatar : ""} />
                )}
                {!refreshTokens && (
                    <div className={classes.redirect}>
                        <LoginButton />
                        <RegisterButton />
                    </div>
                )}
                <NotificationButton />
            </div>
        </header>
    );
}
