import { Icon } from "@iconify/react";
import * as React from "react";
import NotificationButton from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import SearchBar from "../search-bar/SearchBar";
import classes from "./Header.module.css";

export default function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div>Logo</div>
                <div className={classes.home}>Trang chủ</div>
                <div className={classes.category}>
                    <span>Danh mục</span>
                    <Icon icon="ant-design:caret-down-filled" className={classes["category-icon"]} />
                </div>
                <SearchBar />
                <ProfileButton />
                <NotificationButton />
            </div>
        </header>
    );
}
