import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./CategoryFilterButton.module.css";
import CategoryFilterDropdown from "./dropdown/CategoryFilterDropdown";
export default function CategoryFilterButton() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    return (
        <div className={classes["category-filter-container"]}>
            <button role="button" className={classes["btn-filter"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <Icon icon="bx:bx-category-alt" className={classes["icon-filter"]} />
                <span>Tất cả</span>
            </button>
            {isDropdownOpen && <CategoryFilterDropdown />}
        </div>
    );
}
