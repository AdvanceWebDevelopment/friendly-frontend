import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./CategoryButton.module.css";
import CategoryDropdown from "./CategoryDropdown";

export default function CategoryButton() {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

    return (
        <div
            className={classes.category}
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
        >
            <span>Danh mục</span>
            <Icon icon="ant-design:caret-down-filled" className={classes["category-icon"]} />
            <CategoryDropdown visibility={isDropdownVisible} />
        </div>
    );
}
