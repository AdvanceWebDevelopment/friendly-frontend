import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./CategoryFilterButton.module.css";
import CategoryFilterDropdown from "./dropdown/CategoryFilterDropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { getCategories, selectCategories } from "../../../app/reducers/category-slice";

export default function CategoryFilterButton() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [filteredCategories, setFilteredCategories] = React.useState([] as number[]);

    const getFilterCategories = (categories: number[]) => {
        setFilteredCategories(categories);
    };

    return (
        <div className={classes["category-filter-container"]}>
            <button role="button" className={classes["btn-filter"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <Icon icon="bx:bx-category-alt" className={classes["icon-filter"]} />
                <span>Chọn</span>
            </button>
            {isDropdownOpen && <CategoryFilterDropdown getFilterCategories={getFilterCategories} />}
        </div>
    );
}
