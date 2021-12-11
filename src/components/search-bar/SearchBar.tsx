import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./SearchBar.module.css";

export default function SearchBar() {
    return (
        <div className={classes["input-group"]}>
            <div className={classes["input-form"]}>
                <button className={classes["btn-dropdown"]}>
                    <span>Tất cả</span>
                    <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
                </button>
                <input
                    aria-label="Product input field"
                    placeholder="Tìm kiếm mọi thứ ..."
                    className={classes["input-field"]}
                />
            </div>
            <button className={classes["btn-search"]}>
                <Icon icon="akar-icons:search" width={20} height={20} className={classes["btn-icon-search"]} />
            </button>
        </div>
    );
}
