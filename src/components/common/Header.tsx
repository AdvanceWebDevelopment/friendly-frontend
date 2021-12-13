import { Icon } from "@iconify/react";
import * as React from "react";
import CategoryButton from "../category/CategoryButton";
import NotificationButton from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import SearchBar from "../search-bar/SearchBar";
import classes from "./Header.module.css";

export default function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <a href="#">
                    <div className={classes.logo}></div>
                </a>
                <div className={classes.home}>Trang chủ</div>
                <CategoryButton />
                <SearchBar />
                <ProfileButton />
                <NotificationButton />
            </div>
        </header>
    );
}
