import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./SearchBar.module.css";
export default function FilterSearchBar() {
    return (
        <div className={classes["search-bar"]}>
            <Icon icon="akar-icons:search" className={classes["icon-search"]} />
            <input type="text" placeholder="Tên, mô tả, người bán,..." className={classes["search-field"]} />
        </div>
    );
}
