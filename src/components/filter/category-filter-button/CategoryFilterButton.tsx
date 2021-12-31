import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./CategoryFilterButton.module.css";
import CategoryFilterDropdown from "./dropdown/CategoryFilterDropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { getCategories, selectCategories } from "../../../app/reducers/category-slice";

export interface FilteredCategory {
    id: number;
    name: string;
}

export default function CategoryFilterButton() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [filteredCategory, setFilteredCategory] = React.useState({ id: 1, name: "Tất cả" } as FilteredCategory);

    const getFilterCategory = (category: FilteredCategory) => {
        console.log(category);
        setFilteredCategory(category);
    };

    return (
        <div className={classes["category-filter-container"]}>
            <button role="button" className={classes["btn-filter"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <Icon icon="bx:bx-category-alt" className={classes["icon-filter"]} />
                <span>Chọn</span>
            </button>
            {isDropdownOpen && <CategoryFilterDropdown getFilterCategory={getFilterCategory} />}
        </div>
    );
}
