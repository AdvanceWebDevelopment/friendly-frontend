import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./SearchBar.module.css";
import SearchBarDropdown from "./SearchBarDropdown";

export default function SearchBar() {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const [currentCategory, setCurrentCategory] = React.useState("");

    const changeFilterHandler = (category: string) => {
        setCurrentCategory(category);
    };
    return (
        <div className={classes["input-group"]}>
            <div className={classes["input-form"]}>
                <button
                    className={classes["btn-dropdown"]}
                    onMouseEnter={() => setIsDropdownVisible(true)}
                    onMouseLeave={() => setIsDropdownVisible(false)}
                >
                    {currentCategory}
                    <SearchBarDropdown visibility={isDropdownVisible} changeFilterHandler={changeFilterHandler} />
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
